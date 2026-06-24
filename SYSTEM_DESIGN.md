# ArchVision — System Design

## Architecture Overview

ArchVision is a Next.js 14 full-stack application using the App Router pattern. All AI API calls
are made exclusively from server-side API routes — never from the browser. The frontend communicates
with internal API routes, which call external services and write to the database.

```
Browser (React Client)
        │
        ▼
Next.js App Router (Server)
        │
   ┌────┴──────────────┐
   │                   │
API Routes          Static Files
/api/generate       /public/generated/
/api/gallery        (served by Next.js)
/api/gallery/[id]
   │
   ├──► AI Provider (Pollinations.ai or Gemini Flash)
   └──► PostgreSQL (via Prisma ORM)
```

## Data Flow

1. User enters prompt + selects style presets → clicks "Generate Concept"
2. Browser POSTs to `/api/generate` with `{ prompt, styles }`
3. Server constructs enriched `finalPrompt` using style descriptors map
4. Server calls AI API (35s timeout) → receives image buffer
5. Server saves image to `/public/generated/{uuid}.png`
6. Server writes record to `Generation` table (sessionId, prompt, styles, imagePath, createdAt)
7. Server returns `{ id, imagePath, prompt }` to browser
8. Browser renders image + "Save to Gallery" button

## Session Model

- On first visit, a UUID is generated server-side and set as an HTTP-only cookie (`archvision_session`)
- All DB queries are scoped to this sessionId
- No login required — anonymous, persistent per-browser session
- Cookie TTL: 1 year

## Database Schema

```prisma
model Generation {
  id        String   @id @default(cuid())
  sessionId String
  prompt    String
  styles    String[]
  imagePath String
  createdAt DateTime @default(now())

  @@index([sessionId])
}
```

## Concurrency Strategy

- Each image is saved with a UUID filename — no collision possible between concurrent users
- Prisma connection pool handles concurrent DB writes
- No in-memory shared state — every request is fully isolated

## AI Provider Abstraction

Two providers are supported, switchable via `AI_PROVIDER` env var:
- `pollinations` (default): Free, no API key. `https://image.pollinations.ai/prompt/{encoded}`
- `gemini`: Gemini 2.0 Flash image generation. Requires `GEMINI_API_KEY`.

Both providers are wrapped in a 35-second AbortController timeout and return a `Buffer`.
Error types are normalized: `timeout` | `invalid_prompt` | `api_error`

## Internal Prompt Construction

Raw user input is never sent to the AI directly. It is always enriched:

```
Architectural concept art: {userPrompt}. Style: {styleDescriptors}. 
High quality architectural visualization, professional render, dramatic lighting, 
photorealistic detail, 8K resolution.
```

Style descriptors are mapped from preset names to detailed descriptive strings.

## Known Limitations

- Image storage uses the local filesystem (`/public/generated/`). On Vercel, this directory
  is ephemeral — images are lost on redeploy. Production deployment should use Cloudinary or S3.
- Gallery is session-based only. There is no user account system.
- Pollinations.ai is a free public API with no SLA — generation times vary (10–30s typical).
- No rate limiting on `/api/generate` — a production deployment would need this.
