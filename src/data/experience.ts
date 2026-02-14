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
        id: 'fullstack-portfolio',
        title: 'Full-Stack Developer',
        organization: 'Independent',
        date: '2025 - Present',
        description: 'Building production-ready web applications and a high-performance portfolio. Delivering server-rendered apps with Next.js 16, TypeScript, Supabase, and modern tooling. Emphasizing performance, accessibility, and clean architecture.',
        type: 'work',
        techStack: ['Next.js 16', 'React 19', 'TypeScript', 'Supabase', 'Tailwind CSS'],
    },
    {
        id: 'fullstack-projects',
        title: 'Full-Stack Development & Real-World Projects',
        organization: 'Self-Directed',
        date: '2023 - 2025',
        description: 'Shipped multiple full-stack applications end-to-end. Gained proficiency in the modern React ecosystem: App Router, Server Actions, RESTful APIs, and responsive UI. Built projects spanning authentication, real-time features, and data visualization.',
        type: 'work',
        techStack: ['React', 'Next.js', 'Node.js', 'Tailwind CSS', 'PostgreSQL'],
    },
    {
        id: 'degree',
        title: 'B.Sc. Computer Science',
        organization: 'Maasai Mara University',
        date: '2022 - 2025',
        description: 'Completed Bachelor of Science in Computer Science. Core focus on algorithms, data structures, software engineering principles, and object-oriented design. Graduated with strong foundations in problem-solving and systems thinking.',
        type: 'education',
        techStack: ['Algorithms', 'Data Structures', 'Java', 'C++', 'Software Engineering'],
    },
];
