# WOKCOP — Official Site

A high-fidelity Next.js 14+ (App Router) website for WOKCOP, built with Tailwind CSS v4, Sanity CMS, and Framer Motion.

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Sanity

1. Create a project at [sanity.io/manage](https://sanity.io/manage)
2. Copy `.env.local` and fill in your `NEXT_PUBLIC_SANITY_PROJECT_ID`
3. Visit `/studio` in your browser to access the embedded Sanity Studio

### 3. Add custom fonts

Place the following font files in `/public/fonts/`:
- `Abuget.woff2` / `Abuget.woff` / `Abuget.ttf` (script font)
- `BiggerDisplay.woff2` / `BiggerDisplay.woff` / `BiggerDisplay.ttf` (heavy condensed display)

The app falls back to system fonts (`Brush Script MT`, `Impact`) if the files are missing.

### 4. Add the logo

Place `LOGO WOKCOP.png` in `/public/`. The navbar falls back to text if the file is absent.

### 5. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
WOKCOP/
├── app/
│   ├── globals.css          # Tailwind v4 @theme tokens + global styles
│   ├── layout.tsx           # Root layout with Inter font + SEO metadata
│   ├── page.tsx             # Homepage (Server Component)
│   ├── news/page.tsx        # News page stub
│   ├── press-release/page.tsx
│   └── studio/[[...index]]/page.tsx   # Embedded Sanity Studio
├── components/
│   ├── Navbar.tsx           # Sticky glassmorphism nav
│   ├── Hero.tsx             # Server Component (fetches Sanity data)
│   └── HeroClient.tsx       # Client Component (parallax + Framer Motion)
├── sanity/
│   ├── env.ts               # Sanity env variable exports
│   ├── sanity.config.ts     # Sanity Studio configuration
│   ├── lib/
│   │   ├── client.ts        # Sanity client + homepage fetch helper
│   │   └── image.ts         # Image URL builder
│   └── schemas/
│       └── homepage.ts      # Hero background images singleton schema
└── public/
    ├── LOGO WOKCOP.png      # (add your logo here)
    └── fonts/               # (add Abuget + BiggerDisplay fonts here)
```

## Tech Stack

- **Next.js 16** (App Router, Server + Client Components)
- **Tailwind CSS v4** (`@theme` tokens, utility-first)
- **Sanity CMS** (`next-sanity`, embedded Studio at `/studio`)
- **Framer Motion** (entrance animations + parallax)
- **TypeScript** (strict mode)
