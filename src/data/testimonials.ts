export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  quote: string;
  /** Optional: image URL (e.g. LinkedIn avatar). Use placeholder if not set. */
  avatar?: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Placeholder One",
    role: "Senior Developer",
    company: "Tech Co",
    quote: "Clinton delivers clean, maintainable code and communicates clearly. A reliable partner for full-stack projects.",
    avatar: undefined,
  },
  {
    id: "2",
    name: "Placeholder Two",
    role: "Mentor",
    company: "CS Program",
    quote: "Strong problem-solving skills and eagerness to learn. Clinton picks up new tools quickly and applies them well.",
    avatar: undefined,
  },
  {
    id: "3",
    name: "Placeholder Three",
    role: "Project Lead",
    company: "Startup",
    quote: "Brought our product from idea to a working prototype with Next.js and Supabase. Would work with again.",
    avatar: undefined,
  },
];
