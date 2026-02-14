import { ArrowUpRight, Folder } from 'lucide-react';
import Link from 'next/link';
import { BentoCard } from '@/components/shared/BentoCard';

export function FeaturedProjectCard() {
    return (
        <BentoCard colSpan={2} rowSpan={2} className="flex flex-col justify-between gap-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Folder className="w-4 h-4 text-primary" />
                    <span className="text-xs font-medium text-primary uppercase tracking-wider">Featured Project</span>
                </div>
                <Link
                    href="#projects"
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                >
                    View all <ArrowUpRight className="w-3 h-3" />
                </Link>
            </div>

            {/* Project Visual Placeholder */}
            <div className="flex-1 flex items-center justify-center rounded-xl bg-gradient-to-br from-violet-600/20 via-indigo-600/10 to-transparent border border-white/5 min-h-[120px]">
                <div className="text-center space-y-2 p-4">
                    <div className="mx-auto w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                        <span className="text-2xl">🚀</span>
                    </div>
                    <p className="text-sm font-medium text-foreground/70">Coming Soon</p>
                    <p className="text-xs text-muted-foreground">A full-stack application built with Next.js & Supabase</p>
                </div>
            </div>

            {/* Project Meta */}
            <div>
                <h3 className="text-lg font-semibold text-foreground/90">Project Name</h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    A modern full-stack web application showcasing real-time data, authentication, and premium UI design.
                </p>
                <div className="flex gap-2 mt-3">
                    {['Next.js', 'TypeScript', 'Supabase'].map((tag) => (
                        <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-muted-foreground">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </BentoCard>
    );
}
