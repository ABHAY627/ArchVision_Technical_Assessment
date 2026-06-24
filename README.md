# ArchVision — AI Architectural Concept Generator

Generate professional architectural concept art from text descriptions. Describe a building, space,
or structural vision and receive an AI-rendered image — saved to your personal gallery.

**Stack:** Next.js 14 · TypeScript · Tailwind CSS · Prisma · PostgreSQL · Pollinations.ai / Gemini

---

## Prerequisites

- Node.js 18+
- PostgreSQL (local, or free cloud: [Neon](https://neon.tech) / [Supabase](https://supabase.com))

---

## Setup

```bash
git clone <repo-url>
cd archvision
npm install
```

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `AI_PROVIDER` | ✅ | `pollinations` (free, default) or `gemini` |
| `GEMINI_API_KEY` | Only if `AI_PROVIDER=gemini` | Gemini API key from Google AI Studio |

---

## Database

```bash
npx prisma migrate dev --name init
```

---

## Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Switching AI Provider

In `.env.local`:
```
AI_PROVIDER=gemini
GEMINI_API_KEY=your_key_here
```

Restart the dev server. Both providers produce equivalent output; Pollinations is free and
requires no key.

---

## Deployment (Vercel)

1. Push to GitHub
2. Import project on Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

> ⚠️ Note: `/public/generated/` is ephemeral on Vercel. Images are lost on redeploy.
> For production persistence, replace `saveImageToDisk` in `src/lib/imageApi.ts` with
> a Cloudinary or S3 upload.

---

## Known Limitations

- **Image persistence**: Local filesystem only. Ephemeral on serverless platforms.
- **No auth**: Gallery is session-scoped via cookie. Clearing cookies loses the gallery.
- **No rate limiting**: The `/api/generate` route is unprotected. Add middleware for production.
- **Pollinations SLA**: Free public API — generation time varies (10–30s typical).
