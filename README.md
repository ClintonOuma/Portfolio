# Clinton Ouma - Full-Stack Portfolio

<div align="center">
  
  ![Portfolio Banner](https://img.shields.io/badge/Portfolio-2026-violet?style=for-the-badge)
  
  **A premium, production-ready portfolio showcasing modern web development excellence**
  
  [Live Demo](#) • [Report Bug](https://github.com/ClintonOuma/portfolio/issues) • [Request Feature](https://github.com/ClintonOuma/portfolio/issues)

</div>

---

## 🚀 Tech Stack

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.34-0055FF?style=for-the-badge&logo=framer&logoColor=white)

</div>

**Core Technologies:**
- **Framework:** Next.js 16 (App Router) with React 19
- **Language:** TypeScript with strict mode
- **Styling:** Tailwind CSS v4 with custom glassmorphism utilities
- **UI Components:** Shadcn UI + Radix UI primitives
- **Animations:** Framer Motion for smooth, premium interactions
- **Database:** Supabase (PostgreSQL) for real-time guestbook
- **Data Visualization:** Recharts for interactive skill radar
- **Command Palette:** cmdk for ⌘K quick navigation
- **Fonts:** Geist Sans & Geist Mono from Vercel

---

## 🏗️ Architecture

### Next.js 15+ Server Actions

This portfolio leverages **Next.js Server Actions** to handle server-side mutations seamlessly. The guestbook feature uses Server Actions for:

- **Form submissions** without client-side API routes
- **Optimistic UI updates** with instant feedback
- **Type-safe** mutations with full TypeScript support
- **Automatic revalidation** of server components

Example from `src/app/actions/guestbook.ts`:
```typescript
'use server'

export async function addGuestbookEntry(formData: FormData) {
  const { data, error } = await supabase
    .from('guestbook')
    .insert({ name, message })
  
  revalidatePath('/')
  return { data, error }
}
```

### PostgreSQL Integration with Supabase

**Supabase** provides a fully-managed PostgreSQL database with:

- **Real-time subscriptions** for live guestbook updates
- **Row-level security** for data protection
- **Built-in authentication** ready for future expansion
- **REST and GraphQL APIs** auto-generated from schema

The guestbook table schema:
```sql
CREATE TABLE guestbook (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

Server Components fetch data directly:
```typescript
const { data: entries } = await supabase
  .from('guestbook')
  .select('*')
  .order('created_at', { ascending: false })
  .limit(5);
```

---

## ✨ Project Highlights

### 🔍 Command Palette Search

A global command menu accessible via **⌘K** (Cmd+K on Mac, Ctrl+K on Windows) that provides:

- **Instant navigation** to any section of the portfolio
- **Fuzzy search** across skills, projects, and navigation links
- **Quick actions** like copying email or opening social profiles
- **Keyboard-first UX** with arrow key navigation
- **Responsive design** with bottom sheet on mobile, centered modal on desktop
- **Beautiful glassmorphism styling** matching the portfolio's design language

Built with the `cmdk` library for a premium command palette experience.

### 📅 Interactive Experience Timeline

A stunning, scroll-based timeline featuring:

- **Animated scroll progress** with a glowing vertical line that fills as you scroll
- **3D tilt effects** on timeline cards with spotlight hover interactions
- **Alternating layout** on desktop (zigzag pattern) for visual interest
- **Badge system** distinguishing education, work, and project milestones
- **Tech stack tags** with hover glow effects
- **Framer Motion animations** for smooth entrance and parallax effects
- **Responsive design** adapting from center-aligned (desktop) to left-aligned (mobile)

Each experience card includes radial spotlight effects that follow your cursor, creating a premium, interactive feel.

---

## 🎨 Design Features

- **Glassmorphism aesthetic** with custom `glass` and `neo-glass` utilities
- **Deep violet & cyan color palette** using oklch color space for vivid, perceptually uniform colors
- **Magnetic buttons** with physics-based spring animations
- **3D card tilts** using Framer Motion's perspective transforms
- **Rotating RGB borders** on project cards for a luxury tech feel
- **Mesh gradients** and radial blurs for ambient background lighting
- **Custom animations** including pulse effects and smooth transitions
- **Accessible design** with proper ARIA labels and keyboard navigation

---

## 📦 Installation

### Prerequisites

- **Node.js** 18.17 or later
- **npm**, **yarn**, **pnpm**, or **bun** package manager
- **Supabase account** (free tier works perfectly)

### 1. Clone the Repository

```bash
git clone https://github.com/ClintonOuma/portfolio.git
cd portfolio
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Environment Variables Setup

Create a `.env.local` file in the root directory:

```bash
touch .env.local
```

Add the following environment variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
DATABASE_URL=postgresql://postgres:your_password@your_supabase_host:5432/postgres
```

**How to get these values:**

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create a new project or select existing one
3. Navigate to **Settings → API**
4. Copy the **Project URL** → use as `NEXT_PUBLIC_SUPABASE_URL`
5. Copy the **anon public** key → use as `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Navigate to **Settings → Database**
7. Copy the **Connection String (URI)** → use as `DATABASE_URL`

### 4. Resume (optional)

Place your resume PDF in the `public` folder as `resume.pdf`. The "Download CV" / "CV" links in the navbar and hero will then work. If the file is missing, the link will 404 until you add it.

### 5. Database Setup

Run the following SQL in your Supabase SQL Editor to create the guestbook table:

```sql
-- Create guestbook table
CREATE TABLE guestbook (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE guestbook ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public reads
CREATE POLICY "Allow public read access"
  ON guestbook FOR SELECT
  USING (true);

-- Create policy to allow public inserts
CREATE POLICY "Allow public insert access"
  ON guestbook FOR INSERT
  WITH CHECK (true);
```

### 6. Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### 7. Build for Production

```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── (home)/
│   │   │   └── sections/
│   │   │       └── BentoGrid.tsx    # Dashboard-style grid section
│   │   ├── actions/
│   │   │   └── guestbook.ts         # Server Actions
│   │   ├── api/
│   │   │   └── github/              # GitHub stats API route
│   │   ├── layout.tsx               # Root layout
│   │   ├── page.tsx                 # Home page (Server Component)
│   │   └── globals.css              # Global styles + Tailwind
│   ├── components/
│   │   ├── layout/
│   │   │   └── Navbar.tsx           # Fixed glassmorphism navbar
│   │   ├── shared/                  # Reusable components
│   │   ├── ui/                      # Shadcn UI components
│   │   ├── CommandMenu.tsx          # ⌘K command palette
│   │   ├── Experience.tsx           # Interactive timeline
│   │   ├── Hero.tsx                 # Hero section with magnetic buttons
│   │   ├── ProjectGrid.tsx          # Project incubator grid
│   │   ├── SkillsRadar.tsx          # Recharts skill visualization
│   │   ├── Contact.tsx              # Contact section
│   │   └── Guestbook.tsx            # Guestbook UI
│   ├── data/
│   │   ├── experience.ts            # Timeline data
│   │   ├── projects.ts              # Project showcase data
│   │   └── skills.ts                # Skills radar data
│   ├── hooks/
│   │   └── useMediaQuery.ts         # Responsive breakpoint hook
│   ├── lib/
│   │   ├── constants.ts             # Site metadata & nav links
│   │   ├── github.ts                # GitHub API integration
│   │   ├── supabase.ts              # Supabase client
│   │   └── utils.ts                 # Utility functions (cn, etc.)
│   └── types/
│       └── guestbook.ts             # TypeScript interfaces
├── public/                          # Static assets
├── .env.local                       # Environment variables (not committed)
├── package.json
├── tailwind.config.ts               # Tailwind configuration
└── tsconfig.json                    # TypeScript configuration
```

---

## 🎯 Key Sections

1. **Hero** - Eye-catching introduction with magnetic call-to-action buttons
2. **Dashboard** - Bento grid layout with GitHub stats, education, location, and featured project
3. **Skills Radar** - Interactive radar chart with "Currently Mastering" toggle
4. **Project Incubator** - 3-column grid of projects with modal dialogs showing problem/solution details
5. **Experience Timeline** - Scroll-animated timeline with work, education, and project milestones
6. **Contact & Guestbook** - Social links and interactive guestbook powered by Supabase

---

## 🛠️ Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/ClintonOuma/portfolio/issues).

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Clinton Ouma**

- GitHub: [@ClintonOuma](https://github.com/ClintonOuma)
- X: [@abclichy](https://x.com/abclichy)
- Email: clichyb80@gmail.com

---

## 🌟 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Shadcn UI](https://ui.shadcn.com/) - Re-usable components
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Supabase](https://supabase.com/) - Open source Firebase alternative
- [Vercel](https://vercel.com/) - Deployment platform
- [Recharts](https://recharts.org/) - Charting library

---

<div align="center">

**Built with 💜 by Clinton Ouma**

If you found this project helpful, please consider giving it a ⭐!

</div>
