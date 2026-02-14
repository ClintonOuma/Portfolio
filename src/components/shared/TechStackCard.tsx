'use client';

import { motion } from 'framer-motion';
import { BentoCard } from '@/components/shared/BentoCard';

const TECH_STACK = [
    { name: 'TypeScript', icon: '🔷' },
    { name: 'React', icon: '⚛️' },
    { name: 'Next.js', icon: '▲' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'Tailwind', icon: '🎨' },
    { name: 'PostgreSQL', icon: '🐘' },
    { name: 'Git', icon: '🔀' },
    { name: 'Docker', icon: '🐳' },
];

export function TechStackCard() {
    return (
        <BentoCard className="flex flex-col gap-4 overflow-hidden">
            <h3 className="text-sm font-semibold text-foreground/90 tracking-tight">Tech Stack</h3>

            {/* Marquee - double the items for a seamless loop */}
            <div className="relative overflow-hidden">
                <motion.div
                    className="flex gap-4 w-max"
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{
                        x: { repeat: Infinity, repeatType: 'loop', duration: 20, ease: 'linear' },
                    }}
                >
                    {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
                        <div
                            key={`${tech.name}-${i}`}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/5 shrink-0"
                        >
                            <span className="text-lg">{tech.icon}</span>
                            <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">{tech.name}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </BentoCard>
    );
}
