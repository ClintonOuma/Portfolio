'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import type { Project } from '@/data/projects';

interface ProjectCardProps {
    project: Project;
    onClick: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    // 3D Tilt Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXFromCenter = e.clientX - rect.left - width / 2;
        const mouseYFromCenter = e.clientY - rect.top - height / 2;

        x.set(mouseXFromCenter / width);
        y.set(mouseYFromCenter / height);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            style={{
                perspective: 1000,
            }}
            className="h-full"
            onClick={onClick}
        >
            <motion.div
                ref={ref}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={cn(
                    "group relative h-full w-full rounded-2xl bg-white/5 p-6 backdrop-blur-md border border-white/10 cursor-pointer",
                    "hover:shadow-2xl hover:shadow-violet-500/10 transition-shadow duration-500"
                )}
            >
                {/* RGB Rotating Border Effect */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                    <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(167,139,250,0.5)_360deg)] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Inner Content Layer to sit above border */}
                <div className="relative h-full flex flex-col justify-between bg-[#0d0d1a]/80 rounded-xl p-6 backdrop-blur-xl border border-white/5">
                    <div>
                        {/* Status Badge */}
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-xl shadow-inner border border-white/5">
                                {project.id === 'devtrace' ? '🧠' : project.id === 'pulsechat' ? '💬' : '🌿'}
                            </div>
                            <span className={cn(
                                "px-2.5 py-1 rounded-full text-[10px] font-medium border uppercase tracking-wider",
                                project.status === 'Architecting'
                                    ? "bg-amber-500/10 border-amber-500/20 text-amber-300"
                                    : project.status === 'Building'
                                        ? "bg-blue-500/10 border-blue-500/20 text-blue-300"
                                        : "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
                            )}>
                                {project.status.toUpperCase()}
                            </span>
                        </div>

                        <h3 className="text-xl font-bold text-foreground/90 group-hover:text-violet-300 transition-colors">
                            {project.title}
                        </h3>
                        <p className="text-sm font-medium text-muted-foreground mt-1">
                            {project.subtitle}
                        </p>
                        <p className="text-xs text-muted-foreground/80 mt-4 line-clamp-3 leading-relaxed">
                            {project.description}
                        </p>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="text-[10px] font-medium px-2 py-1 rounded-md bg-white/5 border border-white/5 text-muted-foreground"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
