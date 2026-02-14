export interface Skill {
    name: string;
    level: number; // 0–100
    description: string;
    mastering: boolean; // "Currently Mastering" flag
}

export const SKILLS: Skill[] = [
    {
        name: "JavaScript",
        level: 92,
        description: "ES2024+, async patterns, closures, and the event loop.",
        mastering: false,
    },
    {
        name: "TypeScript",
        level: 88,
        description: "Generics, utility types, and strict-mode everything.",
        mastering: true,
    },
    {
        name: "React",
        level: 90,
        description: "Proficient in Hooks, Server Components & Suspense.",
        mastering: false,
    },
    {
        name: "Next.js",
        level: 85,
        description: "App Router, ISR, Middleware, and Edge Runtime.",
        mastering: true,
    },
    {
        name: "CSS",
        level: 82,
        description: "Tailwind CSS, animations, responsive design & Grid/Flexbox.",
        mastering: false,
    },
    {
        name: "UI Design",
        level: 75,
        description: "Figma, design systems, accessibility & micro-interactions.",
        mastering: true,
    },
];
