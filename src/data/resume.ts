/**
 * Resume/CV content for the resume page and ATS-friendly export.
 */

export const RESUME = {
  name: "Clinton Ouma",
  title: "Full-Stack Engineer",
  location: "Kenya",
  email: "clichyb80@gmail.com",
  github: "https://github.com/ClintonOuma",
  x: "https://x.com/abclichy",

  summary:
    "Full-Stack Engineer and CS graduate who builds fluid, database-driven web applications with the modern React ecosystem. I ship production-ready UIs with Next.js and TypeScript, integrate real-time backends with Supabase (PostgreSQL), and deliver smooth, accessible experiences using Tailwind CSS and Framer Motion. I focus on clean architecture, performance, and maintainable code.",

  skills: {
    frontend: [
      "Next.js 15",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Responsive & A11y",
    ],
    backend: [
      "Supabase (PostgreSQL)",
      "Server Actions",
      "RESTful APIs",
      "Node.js",
    ],
    tools: ["Git", "SSH", "Linux / Parrot OS"],
  },

  keyProject: {
    title: "Full-Stack Portfolio",
    bullets: [
      "Stack: Next.js 15, TypeScript, Tailwind CSS, Supabase (PostgreSQL), Framer Motion.",
      "Supabase Guestbook: Server Actions and real-time guestbook with PostgreSQL; form validation and rate limiting.",
      "CMD+K Command Palette: Global search and navigation (⌘K) for sections, projects, and quick actions; built with cmdk.",
      "Interactive Motion System: Framer Motion for smooth page transitions, scroll-linked progress, and timeline animations; respects prefers-reduced-motion.",
    ],
  },
} as const;
