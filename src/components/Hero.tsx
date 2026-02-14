'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Github } from 'lucide-react';
import Link from 'next/link';
import { useRef, MouseEvent } from 'react';
import { LiveBadge } from '@/components/shared/LiveBadge';
import { cn } from '@/lib/utils';

function MagneticButton({ children, className, href }: { children: React.ReactNode; className?: string; href: string }) {
    const ref = useRef<HTMLAnchorElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mass = 0.5; // lighter handling
    const stiffness = 150;
    const damping = 15;

    const xSpring = useSpring(x, { mass, stiffness, damping });
    const ySpring = useSpring(y, { mass, stiffness, damping });

    const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
        if (!ref.current) return;

        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        x.set(mouseX * 0.2); // subtle movement
        y.set(mouseY * 0.2);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div style={{ x: xSpring, y: ySpring }}>
            <Link
                ref={ref}
                href={href}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={cn(
                    "group relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-transform active:scale-95",
                    className
                )}
            >
                {children}
            </Link>
        </motion.div>
    );
}

export function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden px-4">

            {/* Background Elements */}
            <div className="absolute inset-0 -z-10 bg-background">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-background to-background opacity-70" />
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}
                />
                {/* Mesh Gradient Blob */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
            </div>

            <div className="relative z-10 flex flex-col items-center gap-6 max-w-4xl">

                {/* Availability Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <LiveBadge />
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-5xl sm:text-7xl font-bold tracking-tight"
                >
                    <span className="block text-foreground">Building the future</span>
                    <span className="block bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                        with JavaScript
                    </span>
                </motion.h1>

                {/* Subtext */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg sm:text-xl text-muted-foreground max-w-2xl text-balance"
                >
                    Full-Stack Developer & CS Student. Crafting premium digital experiences with Next.js, TypeScript, and modern design principles.
                </motion.p>

                {/* Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center gap-4 mt-4"
                >
                    <MagneticButton href="#projects" className="bg-primary hover:bg-primary/90">
                        View Work <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </MagneticButton>

                    <Link
                        href="https://github.com/litt"
                        target="_blank"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                        <Github className="w-5 h-5" />
                        <span>GitHub</span>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
