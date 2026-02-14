export interface ExperienceItem {
    id: string;
    title: string;
    organization: string;
    date: string;
    description: string;
    type: 'education' | 'work' | 'project';
    techStack?: string[];
}

export const EXPERIENCE: ExperienceItem[] = [
    {
        id: 'portfolio',
        title: 'Building Portfolio',
        organization: 'Independent Project',
        date: '2025 - Present',
        description: 'Architecting a high-performance portfolio with Next.js 15, Supabase, and Framer Motion. Focusing on elite UI/UX, accessibility, and server-side optimization.',
        type: 'project',
        techStack: ['Next.js 15', 'Supabase', 'Framer Motion', 'TypeScript'],
    },
    {
        id: 'self-taught',
        title: 'Full-Stack Mastery',
        organization: 'Self-Taught',
        date: '2023 - 2025',
        description: 'Mastered the modern React ecosystem including Next.js App Router, Server Actions, TypeScript, and Tailwind CSS. Built multiple full-stack applications to refine skills.',
        type: 'work',
        techStack: ['React', 'Next.js', 'Tailwind CSS', 'Node.js'],
    },
    {
        id: 'degree',
        title: 'Computer Science Degree',
        organization: 'Maasai Mara University',
        date: '2021 - 2025',
        description: 'Pursuing a Bachelor of Science in Computer Science. Focusing on algorithms, data structures, and software engineering principles.',
        type: 'education',
        techStack: ['Algorithms', 'Data Structures', 'Java', 'C++'],
    },
];
