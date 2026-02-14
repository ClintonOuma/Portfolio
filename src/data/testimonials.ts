export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  quote: string;
  /** Optional: image URL. When someone gives a review, you can add their photo link here. */
  avatar?: string;
}

/**
 * Testimonials shown on the portfolio.
 * To add a real review: add a new object with name, role, company (optional), quote, and avatar (optional — e.g. LinkedIn profile image URL).
 * For dynamic updates later, this could be moved to Supabase and fetched like the guestbook.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Mwangi",
    role: "Senior Frontend Engineer",
    company: "Nairobi Tech Hub",
    quote: "Clinton delivers clean, maintainable code and communicates clearly. A reliable partner for full-stack projects—would recommend for any React or Next.js work.",
    avatar: "https://i.pravatar.cc/100?u=sarah",
  },
  {
    id: "2",
    name: "James Ochieng",
    role: "Mentor & CS Lecturer",
    company: "Maasai Mara University",
    quote: "Strong problem-solving skills and eagerness to learn. Clinton picks up new tools quickly and applies them well in projects. One of the standout students in the cohort.",
    avatar: "https://i.pravatar.cc/100?u=james",
  },
  {
    id: "3",
    name: "Grace Wambui",
    role: "Product Lead",
    company: "Startup Labs",
    quote: "Brought our product from idea to a working prototype with Next.js and Supabase. Professional, on time, and great at turning feedback into code. Would work with again.",
    avatar: "https://i.pravatar.cc/100?u=grace",
  },
];
