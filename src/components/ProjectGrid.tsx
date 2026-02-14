'use client';

import { useState } from 'react';
import { PROJECTS, type Project } from '@/data/projects';
import { ProjectCard } from '@/components/shared/ProjectCard';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { Cpu, HelpCircle, Lightbulb, BookOpen, ExternalLink, GitFork, FileText } from 'lucide-react';

export function ProjectGrid() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    return (
        <section id="incubator" className="relative py-24 px-4 bg-black/20">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-xs font-medium text-primary uppercase tracking-wider">Lab</span>
                    <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-foreground/90 tracking-tight">
                        Project Incubator
                    </h2>
                    <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                        Experimental ideas and active developments.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {PROJECTS.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            onClick={() => setSelectedProject(project)}
                        />
                    ))}
                </div>

                {/* Standout Features — Coming Soon */}
                <div className="mt-12 p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-wrap items-center justify-center gap-6 md:gap-10">
                    {[
                        { icon: BookOpen, label: 'Case Studies', desc: 'Deep dives coming soon' },
                        { icon: ExternalLink, label: 'Live Demos', desc: 'Try projects yourself' },
                        { icon: FileText, label: 'Technical Blog', desc: 'Architecture & insights' },
                        { icon: GitFork, label: 'Open Source', desc: 'Contributions & repos' },
                    ].map((item) => (
                        <div
                            key={item.label}
                            className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
                        >
                            <item.icon className="w-4 h-4 text-primary/70" />
                            <div>
                                <p className="text-sm font-medium text-foreground/90">{item.label}</p>
                                <p className="text-xs text-muted-foreground">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal Details */}
                <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
                    <DialogContent className="max-w-2xl bg-[#0d0d1a]/95 border-white/10 backdrop-blur-xl p-0 overflow-hidden">
                        {selectedProject && (
                            <>
                                <div className="p-6 border-b border-white/10">
                                    <DialogHeader>
                                        <div className="flex items-center justify-between">
                                            <DialogTitle className="text-2xl font-bold text-foreground">
                                                {selectedProject.title}
                                            </DialogTitle>
                                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-muted-foreground">
                                                {selectedProject.status}
                                            </span>
                                        </div>
                                        <DialogDescription className="text-base text-violet-300 mt-1">
                                            {selectedProject.subtitle}
                                        </DialogDescription>
                                    </DialogHeader>

                                    {/* Tech Stack Row */}
                                    <div className="flex gap-2 mt-6 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10">
                                        {selectedProject.tags.map(tag => (
                                            <span key={tag} className="shrink-0 text-xs font-medium px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-muted-foreground flex items-center gap-1.5">
                                                <Cpu className="w-3 h-3" />
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-6 grid gap-6 md:grid-cols-2">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-amber-300">
                                            <HelpCircle className="w-4 h-4" />
                                            <h4 className="text-sm font-semibold uppercase tracking-wide">The Problem</h4>
                                        </div>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {selectedProject.problem}
                                        </p>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-emerald-300">
                                            <Lightbulb className="w-4 h-4" />
                                            <h4 className="text-sm font-semibold uppercase tracking-wide">My Solution</h4>
                                        </div>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {selectedProject.solution}
                                        </p>
                                    </div>
                                </div>

                                <div className="p-6 bg-white/5 border-t border-white/10 text-center">
                                    <p className="text-xs text-muted-foreground">
                                        This project is currently in the <strong>{selectedProject.status}</strong> phase.
                                        {selectedProject.status === 'Live' ? ' Check it out below!' : ' Updates coming soon.'}
                                    </p>
                                </div>
                            </>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </section>
    );
}
