import { ArrowUpRight, Folder, Flame } from 'lucide-react';
import Link from 'next/link';
import { BentoCard } from '@/components/shared/BentoCard';
import type { Project } from '@/data/projects';

interface FeaturedProjectCardProps {
    /** Hot project to feature on the dashboard (e.g. Live or current focus) */
    project?: Project | null;
}

export function FeaturedProjectCard({ project }: FeaturedProjectCardProps) {
    return (
        <BentoCard colSpan={2} rowSpan={2} className="flex flex-col justify-between gap-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Folder className="w-4 h-4 text-primary" />
                    <span className="text-xs font-medium text-primary uppercase tracking-wider">
                        {project ? 'Hot project' : 'Featured project'}
                    </span>
                    {project?.status === 'Live' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            <Flame className="w-3 h-3" /> Live
                        </span>
                    )}
                </div>
                <Link
                    href="#projects"
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                >
                    View lab <ArrowUpRight className="w-3 h-3" />
                </Link>
            </div>

            {project ? (
                <>
                    {/* Project visual */}
                    <div className="flex-1 flex flex-col justify-center rounded-xl bg-gradient-to-br from-violet-600/20 via-indigo-600/10 to-transparent border border-white/5 min-h-[120px] p-4">
                        <p className="text-sm text-muted-foreground line-clamp-3">{project.description}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-foreground/90">{project.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{project.subtitle}</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                            {project.tags.slice(0, 4).map((tag) => (
                                <span
                                    key={tag}
                                    className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-muted-foreground"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="flex-1 flex items-center justify-center rounded-xl bg-gradient-to-br from-violet-600/20 via-indigo-600/10 to-transparent border border-white/5 min-h-[120px]">
                        <div className="text-center space-y-2 p-4">
                            <div className="mx-auto w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                                <span className="text-2xl">🚀</span>
                            </div>
                            <p className="text-sm font-medium text-foreground/70">Next up</p>
                            <p className="text-xs text-muted-foreground">New project in the lab soon.</p>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-foreground/90">—</h3>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">Check the Project Incubator below for current work.</p>
                    </div>
                </>
            )}
        </BentoCard>
    );
}
