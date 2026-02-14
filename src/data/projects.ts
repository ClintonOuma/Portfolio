export interface Project {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    problem: string;
    solution: string;
    tags: string[];
    status: 'Architecting' | 'Building' | 'Live';
    link?: string;
}

export const PROJECTS: Project[] = [
    {
        id: 'devtrace',
        title: 'DevTrace AI',
        subtitle: 'AI-Driven Documentation',
        description: 'An intelligent documentation platform that auto-generates technical specs from codebase analysis.',
        problem: 'Developers spend 20% of their time writing documentation that becomes outdated almost immediately.',
        solution: 'Built a pipeline using AST parsing and LLMs to generate living documentation that updates with every commit.',
        tags: ['Next.js', 'OpenAI API', 'Neo4j', 'framer-motion'],
        status: 'Architecting',
    },
    {
        id: 'pulsechat',
        title: 'PulseChat P2P',
        subtitle: 'Real-time Peer-to-Peer Networking',
        description: 'A decentralized chat application focusing on privacy and zero-latency communication.',
        problem: 'Centralized chat apps are vulnerable to data breaches and improved latency issues in poor network conditions.',
        solution: 'Leveraged WebRTC for direct P2P data channels, ensuring end-to-end encryption and offline-first capabilities.',
        tags: ['React', 'WebRTC', 'Socket.io', 'Redis'],
        status: 'Building',
    },
    {
        id: 'econode',
        title: 'EcoNode',
        subtitle: 'Sustainable Web Analytics',
        description: 'Privacy-focused analytics tool that measures the carbon footprint of web traffic.',
        problem: 'Existing analytics tools are bloated (increasing page weight) and invasive.',
        solution: 'Created a <1kb script that tracks essential metrics without cookies, calculating CO2 impact per session.',
        tags: ['TypeScript', 'Node.js', 'ClickHouse', 'Serverless'],
        status: 'Live',
    },
];
