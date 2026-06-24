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
   - The backend uploads the image Buffer to **Vercel Blob**, a persistent CDN-backed object store. The returned public URL is stored in the database rather than a local file path — this means images survive every redeploy and are served globally from the CDN edge.
   - A new record is created in the PostgreSQL database via Prisma, linking the `imagePath` (Blob URL), `prompt`, `styles`, and `sessionId`.
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
- **Persistent Image Storage via Vercel Blob**: Rather than saving images to the local filesystem (which is ephemeral on serverless platforms), all generated image buffers are uploaded to **Vercel Blob** immediately after generation. The database stores the returned public CDN URL as `imagePath`. This means images are permanent, globally distributed, and survive every redeploy. The `@vercel/blob` SDK's `put()` and `del()` calls are the only two touch points — kept in `src/lib/imageApi.ts` so the storage layer is easy to swap if needed.
- **UI/UX Refinement**: I chose a muted, sophisticated aesthetic with clear "Regenerate" flows. When viewing an image in the Gallery, clicking "Refine & Regenerate" pushes the exact prompt back into the generator URL, instantly populating the text area for tweaking.

---

## 3. The Honest Part (What Still Doesn't Work Well)

The app handles API failures, Vercel Blob storage, and concurrent users correctly. The honest limitation that remains is **session fragility**.

The gallery is tied to a browser cookie (`archvision_session`). If a user clears their cookies, switches browsers, or opens the app on a different device, their gallery is inaccessible — the database records exist but there's no way to retrieve them without the original session ID. There's no account system, no recovery flow, and no way to share a gallery.

This was a deliberate trade-off: no-login sessions meet the assignment's "usable without explanation" requirement perfectly, but they're not durable identity. A production version would layer in optional OAuth (e.g. Google sign-in) that retroactively claims the anonymous session's history.

A second honest limitation: **no rate limiting on `/api/generate`**. A single user could fire off concurrent requests and exhaust the Gemini free-tier quota rapidly. In production this would need middleware-level throttling per session or IP.
