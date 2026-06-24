<div align="center">

<!-- ════════════════════════════════════════════════════════════ -->
<!--                     🏯  ARCH VISION  🏯                     -->
<!-- ════════════════════════════════════════════════════════════ -->

<br>

```
⛩️
```

<img src="https://readme-typing-svg.demolab.com?font=Playfair+Display&weight=700&size=42&pause=1000&color=C4785B&center=true&vCenter=true&random=false&width=550&height=70&lines=Arch+Vision" alt="ArchVision" />

<img src="https://readme-typing-svg.demolab.com?font=Inter&weight=300&size=16&pause=2000&color=6B6B6B&center=true&vCenter=true&random=false&width=500&height=30&lines=%E5%BB%BA%E7%AF%89%E3%81%AE%E3%83%93%E3%82%B8%E3%83%A7%E3%83%B3+%E2%80%94+AI+Architectural+Concept+Generator" alt="Tagline" />

<br>

<p>
  <img src="https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Gemini_AI-886FBF?style=for-the-badge&logo=googlegemini&logoColor=white" alt="Gemini" />
</p>

<br>

<p>
  <em>Describe a building, space, or structural vision — and watch AI render it into stunning architectural concept art.</em>
</p>

<p>
  <a href="YOUR_LIVE_URL_HERE"><strong>🌸 View Live Demo →</strong></a>
</p>

<br>

</div>

<!-- ════════════════════════════════════════════════════════════ -->

---

<br>

<div align="center">

## 🏯 `一目見て` — At First Glance

</div>

<br>

<div align="center">

### ✍️ The Generator — *Create Your Vision*

<br>

<img src="./docs/screenshots/generator-page.png" alt="ArchVision Generator Page — Describe an architectural concept and generate AI-powered concept art" width="85%" style="border-radius: 12px; box-shadow: 0 20px 60px rgba(0,0,0,0.15);" />

<br>
<br>

### 🖼️ The Gallery — *Your Personal Museum*

<br>

<img src="./docs/screenshots/gallery-page.png" alt="ArchVision Gallery Page — Browse, refine, and manage your generated architectural concepts" width="85%" style="border-radius: 12px; box-shadow: 0 20px 60px rgba(0,0,0,0.15);" />

</div>

<br>

---

<br>

<div align="center">

## 🎋 `特徴` — Features

</div>

<br>

```
 ┌─────────────────────────────────────────────────────────────────┐
 │                                                                 │
 │   🎨  Text-to-Image Generation    Describe → AI renders it     │
 │   🏛️  6 Style Presets             Brutalist, Japanese, Deco…   │
 │   🖼️  Personal Gallery            Auto-saved, session-based    │
 │   🔄  Refine & Regenerate          Tweak prompts seamlessly     │
 │   🛡️  Dual AI Fallback            Gemini → Pollinations.ai     │
 │   🍪  Zero-Auth Sessions          No signup, just create       │
 │   🗑️  Gallery Management          Delete concepts you don't    │
 │                                    need anymore                 │
 │                                                                 │
 └─────────────────────────────────────────────────────────────────┘
```

<br>

<div align="center">

| Style Preset | Aesthetic |
|:---:|:---|
| 🏗️ **Brutalist** | Raw concrete, monolithic forms, dramatic shadows |
| 🏯 **Minimalist Japanese** | Wabi-sabi, clean lines, zen spatial composition |
| 🔲 **Bauhaus** | Functional modernism, primary colors, flat roofs |
| 🚀 **Futuristic** | Parametric design, fluid curves, sci-fi aesthetic |
| ✨ **Art Deco** | Geometric patterns, gold accents, 1920s opulence |
| 🌿 **Organic** | Biomorphic forms, living walls, landscape blending |

</div>

<br>

---

<br>

<div align="center">

## 🔧 `仕組み` — How It Works

</div>

<br>

The journey of a single prompt — from your mind to a rendered concept:

```
                    ┌─────────────────────┐
                    │   👤 User Types a   │
                    │   Prompt + Styles    │
                    └────────┬────────────┘
                             │
                             ▼
                    ┌─────────────────────┐
                    │  🌐 POST Request    │
                    │  /api/generate       │
                    │  { prompt, styles }  │
                    └────────┬────────────┘
                             │
                             ▼
                    ┌─────────────────────┐
                    │  🔧 Server-Side     │
                    │  Prompt Enrichment   │
                    │  + Style Descriptors │
                    └────────┬────────────┘
                             │
                    ┌────────┴────────────┐
                    │                     │
                    ▼                     ▼
          ┌─────────────────┐   ┌─────────────────┐
          │  🤖 Gemini 2.0  │   │  🎨 Pollinations │
          │  Flash (Primary) │──▶│  .ai (Fallback)  │
          │                  │   │                   │
          └────────┬─────────┘   └────────┬──────────┘
                   │                      │
                   └──────────┬───────────┘
                              │
                              ▼
                    ┌─────────────────────┐
                    │  💾 Save to Disk    │
                    │  /public/generated/  │
                    │  {uuid}.png          │
                    └────────┬────────────┘
                             │
                             ▼
                    ┌─────────────────────┐
                    │  🗃️ Prisma ORM      │
                    │  → PostgreSQL        │
                    │  Record Created      │
                    └────────┬────────────┘
                             │
                             ▼
                    ┌─────────────────────┐
                    │  ✅ Response Sent   │
                    │  Image Rendered     │
                    │  in the Browser      │
                    └─────────────────────┘
```

> **🛡️ Key Design Decision:** The browser *never* talks to AI APIs directly. All requests are proxied through secure Next.js API routes, keeping API keys hidden and preventing abuse.

<br>

---

<br>

<div align="center">

## 🏗️ `構造` — Project Architecture

</div>

<br>

```
archvision/
├── 📁 prisma/
│   └── schema.prisma          # Generation model + PostgreSQL config
├── 📁 public/
│   └── 📁 generated/          # AI-generated images stored here
├── 📁 src/
│   ├── 📁 app/
│   │   ├── 📁 api/
│   │   │   ├── 📁 generate/   # POST — AI image generation endpoint
│   │   │   └── 📁 gallery/    # GET/DELETE — Gallery CRUD operations
│   │   ├── 📁 gallery/        # Gallery page (browse saved concepts)
│   │   ├── layout.tsx          # Root layout with fonts + metadata
│   │   ├── page.tsx            # Generator page (main interface)
│   │   └── globals.css         # Global styles + design tokens
│   ├── 📁 components/
│   │   ├── Nav.tsx             # Navigation bar (Generate / Gallery)
│   │   ├── StyleSelector.tsx   # Style preset toggle buttons
│   │   ├── ImageResult.tsx     # Generated image display + save
│   │   ├── GalleryGrid.tsx     # Responsive grid of saved concepts
│   │   ├── GalleryModal.tsx    # Full-screen image viewer + actions
│   │   ├── LoadingSkeleton.tsx # Shimmer loading animation
│   │   └── ErrorMessage.tsx    # Error state display
│   ├── 📁 lib/
│   │   ├── imageApi.ts         # AI providers + prompt construction
│   │   └── prisma.ts           # Prisma client singleton
│   └── 📁 types/
│       └── index.ts            # TypeScript interfaces
├── .env.example                # Environment variable template
├── tailwind.config.ts          # Tailwind + custom design tokens
├── package.json
└── tsconfig.json
```

<br>

---

<br>

<div align="center">

## ⚡ `始めよう` — Quick Start

</div>

<br>

### 📋 Prerequisites

Before you begin, make sure you have:

| Requirement | Version | Note |
|:---|:---|:---|
| **Node.js** | `18+` | [Download](https://nodejs.org/) |
| **PostgreSQL** | Any | Local install, [Neon](https://neon.tech) (free), or [Supabase](https://supabase.com) (free) |
| **Git** | Any | [Download](https://git-scm.com/) |

<br>

### 🪜 Step-by-Step Setup

<br>

**`ステップ 1`** — Clone the Repository

```bash
git clone https://github.com/ABHAY627/ArchVision_Technical_Assessment.git
cd ArchVision_Technical_Assessment
```

<br>

**`ステップ 2`** — Install Dependencies

```bash
npm install
```

<br>

**`ステップ 3`** — Configure Environment Variables

```bash
cp .env.example .env.local
```

Now open `.env.local` and fill in your values:

```env
# ──────────────────────────────────────────────
# 🗄️ Database — Your PostgreSQL connection string
# ──────────────────────────────────────────────
# 💡 Get a free hosted DB from https://neon.tech or https://supabase.com
# Format: postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require
DATABASE_URL=postgresql://username:password@host:5432/archvision?sslmode=require

# ──────────────────────────────────────────────
# 🤖 AI Provider — Choose your image generation engine
# ──────────────────────────────────────────────
# Options: "pollinations" (free, no key needed) or "gemini" (needs API key)
AI_PROVIDER=pollinations

# ──────────────────────────────────────────────
# 🔑 Gemini API Key — Only required if AI_PROVIDER=gemini
# ──────────────────────────────────────────────
# Get yours free at https://aistudio.google.com/apikey
GEMINI_API_KEY=
```

<br>

**`ステップ 4`** — Initialize the Database

```bash
npx prisma migrate dev --name init
```

> This creates the `Generation` table in your PostgreSQL database and generates the Prisma client.

<br>

**`ステップ 5`** — Start the Development Server

```bash
npm run dev
```

<br>

**`ステップ 6`** — Open and Create! 🎉

```
🌐 Open http://localhost:3000 in your browser
```

You're all set. Type a prompt, pick a style, and hit **Generate Concept**!

<br>

---

<br>

<div align="center">

## 🎮 `使い方` — How to Use

</div>

<br>

### 🖊️ Generating a Concept

1. **Navigate** to the **Generate** page (homepage)
2. **Describe** your architectural vision in the text area
   - *Example:* `"A modern glass skyscraper surrounded by zen gardens with flowing water"`
3. **Select style presets** (optional) — click one or more style chips:
   - `Brutalist` · `Minimalist Japanese` · `Bauhaus` · `Futuristic` · `Art Deco` · `Organic`
4. **Click** `Generate Concept` and wait 10–30 seconds
5. **View** your AI-rendered concept art!

<br>

### 🖼️ Using the Gallery

1. After generating an image, it's **automatically saved** to your gallery
2. Navigate to the **Gallery** page via the top nav bar
3. **Click any image** to open the full-screen modal view, where you can:
   - **📋 View the original prompt** and style tags used
   - **🔄 Refine & Regenerate** — sends the prompt back to the generator for tweaking
   - **🗑️ Delete** — permanently removes the concept from your gallery

<br>

### 🔄 Switching AI Providers

ArchVision supports **two AI providers** that you can switch between:

| Provider | API Key? | Speed | Quality |
|:---|:---:|:---:|:---|
| **Pollinations.ai** (default) | ❌ Not needed | 10–30s | High quality, free public API |
| **Gemini 2.0 Flash** | ✅ Required | 5–15s | Excellent quality, Google AI |

To switch providers, update `.env.local`:

```env
AI_PROVIDER=gemini
GEMINI_API_KEY=your_api_key_here
```

Then restart the dev server (`Ctrl+C` → `npm run dev`).

> **💡 Pro Tip:** ArchVision has a built-in **fallback mechanism**. If your primary provider (Gemini) fails due to rate limits, it automatically falls back to Pollinations.ai — ensuring your generation always succeeds.

<br>

---

<br>

<div align="center">

## 🗃️ `データベース` — Database Schema

</div>

<br>

```prisma
model Generation {
  id        String   @id @default(cuid())    // Unique ID (collision-safe)
  sessionId String                            // Anonymous user session
  prompt    String                            // Original user prompt
  styles    String[]                          // Selected style presets
  imagePath String                            // Path to saved image
  createdAt DateTime @default(now())          // Timestamp

  @@index([sessionId])                        // Fast session-scoped queries
}
```

**Session Model:**
- On first visit, a **UUID** is generated and stored as an HTTP-only cookie (`archvision_session`)
- All database queries are scoped to this session ID — your gallery is **private** to your browser
- **No login required** — zero-friction anonymous sessions with a 1-year cookie TTL

<br>

---

<br>

<div align="center">

## 🚀 `展開` — Deployment (Vercel)

</div>

<br>

```
1.  Push your code to GitHub
2.  Import the project on Vercel (vercel.com/import)
3.  Add environment variables in the Vercel dashboard:
      → DATABASE_URL
      → AI_PROVIDER
      → GEMINI_API_KEY (if using Gemini)
4.  Deploy 🚀
```

> ⚠️ **Important Note on Image Persistence:**
> 
> Vercel uses an **ephemeral filesystem** — images saved to `/public/generated/` are lost on every new deployment. The database records will still exist, but image URLs will break.
> 
> **For production**, replace the `saveImageToDisk` function in `src/lib/imageApi.ts` with a cloud storage solution like **AWS S3**, **Cloudinary**, or **Vercel Blob**.

<br>

---

<br>

<div align="center">

## 🧩 `技術スタック` — Tech Stack Deep Dive

</div>

<br>

| Layer | Technology | Why? |
|:---|:---|:---|
| **Framework** | Next.js 14 (App Router) | Full-stack React — frontend + API routes in one repo |
| **Language** | TypeScript | Strict type safety across frontend/backend contract |
| **Styling** | Tailwind CSS | Rapid iteration with a curated, warm design system |
| **Database** | PostgreSQL (Neon) | Reliable, scalable, free hosted options available |
| **ORM** | Prisma | Type-safe queries, auto-generated client, migrations |
| **AI (Primary)** | Gemini 2.0 Flash | Google's fast image generation with high fidelity |
| **AI (Fallback)** | Pollinations.ai | Free, no-key-needed public API for resilience |
| **Session** | HTTP-only Cookie | Secure, anonymous session management (no auth needed) |

<br>

---

<br>

<div align="center">

## ⚠️ `制限事項` — Known Limitations

</div>

<br>

| Limitation | Details | Production Fix |
|:---|:---|:---|
| 🗂️ **Image Storage** | Local filesystem only — ephemeral on serverless | Use S3 / Cloudinary / Vercel Blob |
| 🔒 **No Authentication** | Gallery is cookie-scoped — clearing cookies loses gallery | Add OAuth / NextAuth.js |
| 🚦 **No Rate Limiting** | `/api/generate` is unprotected | Add middleware (e.g., `next-rate-limit`) |
| ⏱️ **Pollinations SLA** | Free public API — generation time varies (10–30s) | Use Gemini as primary provider |

<br>

---

<br>

<div align="center">

<br>

```
    ⛩️
   /   \
  /     \
 /  🌸  \
/─────────\
```

<br>

<img src="https://readme-typing-svg.demolab.com?font=Inter&weight=300&size=14&pause=3000&color=C4785B&center=true&vCenter=true&random=false&width=400&height=25&lines=Made+with+%E2%9D%A4%EF%B8%8F+by+Abhay+Gautam" alt="Made with love" />

<br>

**Made with ❤️ by Abhay Gautam**

<br>

<sub>🏯 *「建築のビジョン」* — Where imagination meets architecture</sub>

<br>
<br>

</div>
