'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';
import { EXPERIENCE, type ExperienceItem } from '@/data/experience';
import { Briefcase, GraduationCap, Code2, Calendar } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Experience Card (Staggered)                                        */
/* ------------------------------------------------------------------ */

function ExperienceCard({ item, index }: { item: ExperienceItem; index: number }) {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;
        const div = divRef.current;
        const rect = div.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseEnter = () => setOpacity(1);
    const handleMouseLeave = () => setOpacity(0);

    const Icon = item.type === 'education' ? GraduationCap : item.type === 'project' ? Code2 : Briefcase;

    // Layout logic:
    // Mobile: Timeline left-aligned.
    // Desktop: Timeline center.
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
                "relative flex items-center justify-between md:justify-center w-full mb-12",
                "md:even:flex-row-reverse"
            )}
        >
            {/* Timeline Connector & Badge (Center for Desktop, Left for Mobile) */}
            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
                {/* Glowing Dot */}
                <div className="w-4 h-4 rounded-full bg-black border-2 border-violet-400 shadow-[0_0_12px_rgba(167,139,250,0.6)]" />

                {/* Date Badge - Connecting line label */}
                <div className="mt-2 md:mt-0 md:absolute md:top-0 md:left-6 md:group-even:left-auto md:group-even:right-6 md:-translate-y-1/2">
                    {/* Mobile Date handles naturally in flow below, Desktop handles absolutely */}
                </div>
            </div>

            {/* Desktop Spacer (half width) */}
            <div className="hidden md:block w-1/2" />

            {/* Content Card */}
            <div
                className={cn(
                    "relative w-[calc(100%-3rem)] ml-12 md:ml-0 md:w-[calc(50%-2.5rem)]",
                    // Desktop Alternating Alignment
                    isEven ? "md:mr-auto md:pr-0" : "md:ml-auto md:pl-0"
                )}
            >
                <div
                    ref={divRef}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="relative overflow-hidden rounded-2xl bg-[#0d0d1a]/80 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_-5px_rgba(124,58,237,0.3)] hover:shadow-[0_0_50px_-10px_rgba(124,58,237,0.5)] transition-shadow duration-500 group"
                >
                    {/* Spotlight Effect */}
                    <div
                        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                        style={{
                            opacity,
                            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(167,139,250,0.1), transparent 40%)`,
                        }}
                    />

                    {/* Card Body */}
                    <div className="p-6 md:p-8 relative z-10">
                        {/* Header: Date Badge (Mobile Visible, Desktop handled differently or inside) */}
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/10 text-violet-300 border border-violet-500/20 shadow-[0_0_10px_rgba(167,139,250,0.15)]">
                                <Calendar className="w-3 h-3" />
                                {item.date}
                            </span>
                            <div className="p-2 rounded-lg bg-white/5 border border-white/5 text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                                <Icon className="w-4 h-4" />
                            </div>
                        </div>

                        <h3 className="text-xl md:text-2xl font-bold text-foreground/95 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                            {item.title}
                        </h3>
                        <p className="text-sm font-semibold text-primary/90 mt-1 mb-4 flex items-center gap-2">
                            {item.organization}
                        </p>

                        <p className="text-sm text-muted-foreground/90 leading-relaxed mb-6">
                            {item.description}
                        </p>

                        {/* Tech Stack - Glow on Hover */}
                        {item.techStack && (
                            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                                {item.techStack.map((tech) => (
                                    <span
                                        key={tech}
                                        className="text-[10px] sm:text-xs font-medium px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-muted-foreground transition-all duration-300 group-hover:border-primary/20 group-hover:bg-primary/5 group-hover:text-primary/90"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Connection Horizontal Line (Desktop Only) */}
                <div className={cn(
                    "hidden md:block absolute top-6 h-px w-10 bg-gradient-to-r from-violet-500/50 to-transparent",
                    isEven ? "right-[-2.5rem] rotate-180" : "left-[-2.5rem]"
                )} />
            </div>
        </motion.div>
    );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export function Experience() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"], // Trigger earlier/smoother
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <section id="experience" className="relative py-28 px-4 overflow-hidden" aria-label="Experience">
            {/* Background Decoration */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[128px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[128px] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative" ref={containerRef}>
                {/* Header */}
                <div className="text-center mb-20">
                    <span className="text-sm font-semibold text-primary uppercase tracking-[0.2em]">Career Path</span>
                    <h2 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                        Experience & <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-cyan-300">Education</span>
                    </h2>
                </div>

                <div className="relative">
                    {/* Vertical Line - Background */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2 h-full rounded-full" />

                    {/* Vertical Line - Glowing Fill */}
                    <motion.div
                        className="absolute left-4 md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-violet-500 via-cyan-400 to-violet-500 origin-top -translate-x-1/2 shadow-[0_0_20px_rgba(124,58,237,0.5)] rounded-full"
                        style={{ scaleY, height: "100%" }}
                    />

                    {/* Timeline Items */}
                    <div className="space-y-4 relative z-10 pt-4">
                        {EXPERIENCE.map((item, index) => (
                            <ExperienceCard key={item.id} item={item} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
