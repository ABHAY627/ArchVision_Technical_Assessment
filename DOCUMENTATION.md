# ArchVision — Software Engineer Assignment Submission
**Company**: Actual Inc.
**Role**: Software Engineer
**Candidate Niche Selected**: Architectural Visualization

---

## 1. The Thinking

### The Request Journey
How does a user’s prompt travel through the system?
1. **Input (Frontend)**: The user visits the homepage, enters an architectural prompt (e.g., "modern glass skyscraper"), selects style presets (e.g., "Futuristic", "Brutalist"), and clicks "Generate Concept".
2. **Transit**: The React frontend sends a `POST` request with the JSON payload (`{ prompt, styles }`) to the Next.js API route (`/api/generate`). A loading state is triggered, preventing duplicate submissions.
3. **Backend Processing**:
   - The backend validates the input (checking for length and empty values).
   - The user’s session is identified via a secure `archvision_session` cookie (or a new anonymous session is created).
   - A `finalPrompt` is constructed by combining the user's base prompt with the selected style tokens to guide the AI effectively.
4. **AI Generation (Server-to-Server)**:
   - The backend attempts to call the **Gemini 2.0 Flash API** first.
   - **Fallback Mechanism**: If Gemini fails (e.g., due to free-tier rate limits or quota exhaustion), the system catches the error and seamlessly falls back to the **Pollinations.ai API**.
   - The API generates the image and returns a Buffer to the backend.
5. **Storage & Database**:
   - The backend saves the image Buffer to the local disk (`public/generated/`).
   - A new record is created in the PostgreSQL database via Prisma, linking the `imagePath`, `prompt`, `styles`, and `sessionId`.
6. **Response**: The API returns the image path and database ID back to the frontend.
7. **Display**: The frontend displays the newly generated image. The user can save it to their gallery or tweak the prompt and regenerate.

### Tech Stack Choice
- **Framework**: Next.js 14 (App Router) with React. It allows building both the frontend and the secure backend API routes within the same repository, significantly speeding up development and simplifying deployment.
- **Language**: TypeScript. Chosen for strict type safety, making the API contract between frontend and backend rock-solid and preventing runtime errors with API responses.
- **Database / ORM**: PostgreSQL hosted on Neon + Prisma ORM. Prisma provides an incredibly developer-friendly schema definition, and Neon is ideal for serverless Postgres with an instant setup.
- **Styling**: Tailwind CSS. Chosen for rapid UI iteration, allowing me to build a clean, Claude-inspired interface with precise design tokens without writing massive CSS files.
- **AI APIs**: Gemini 2.0 Flash (Primary) + Pollinations.ai (Fallback). Both are free and capable of high-quality image generation.

### The Process
1. **Foundation & Data Model**: I started by setting up Next.js and Prisma. I designed the schema (`Generation` model) to ensure we could link images to specific user sessions via cookies.
2. **Backend API Construction**: Built the `/api/generate` route to securely handle the prompt construction, AI API calls, error handling, and image saving. I prioritized the fallback logic to ensure high reliability.
3. **Frontend UI/UX**: Built the Generator and Gallery pages. Focused on a clean, distraction-free "Claude-like" aesthetic (soft dim mode, rounded corners) so users immediately know what to do.
4. **Resilience & Constraints Validation**: Tested concurrent generations, added timeouts (35s), and implemented explicit error states (API timeout, invalid prompt) visible to the user.

---

## 2. Your Decisions

- **Server-Side Generation**: The browser *never* talks to the AI API directly. All requests proxy through `/api/generate`, hiding the API keys and preventing abuse.
- **Session-Based Gallery (No Login)**: To meet the requirement of the app being usable "without any explanation," I opted against a complex authentication flow. Instead, I assign a secure, long-lived HTTP-only cookie (`archvision_session`) to track anonymous users. This persists their gallery across page refreshes instantly.
- **Graceful Degradation (API Fallback)**: Free AI APIs are notorious for rate-limiting and timeouts. Instead of just showing an error, I implemented a `try/catch` fallback strategy. If Gemini fails, it silently switches to Pollinations, dramatically improving the success rate of user requests.
- **Local File System Storage**: For the scope of this assignment and a 15-minute setup time, images are saved directly to `public/generated/`. In a real-world production environment (e.g., deploying on Vercel), this would be swapped to an S3 bucket, as serverless platforms have ephemeral file systems.
- **UI/UX Refinement**: I chose a muted, sophisticated aesthetic with clear "Regenerate" flows. When viewing an image in the Gallery, clicking "Refine & Regenerate" pushes the exact prompt back into the generator URL, instantly populating the text area for tweaking.

---

## 3. The Honest Part (What Still Doesn't Work Well)

While the app handles API failures and concurrent users smoothly, **image persistence on serverless deployments (like Vercel) is fundamentally flawed with the current design.** 

Because the backend saves generated image buffers directly to the local disk (`public/generated`), these files are stored ephemerally. If the app is deployed to a serverless environment like Vercel, the filesystem is wiped on every new deployment or when the serverless function goes to sleep. This means the PostgreSQL database will successfully query the user's gallery records, but the image URLs will point to files that no longer exist, resulting in broken image links.

**The Fix**: In a true production scenario, I would rip out the `fs.writeFileSync` logic and replace it with an AWS S3 or Cloudinary SDK integration, ensuring images are stored permanently on an external blob storage provider.
