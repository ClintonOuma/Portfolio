import { GraduationCap } from 'lucide-react';
import { BentoCard } from '@/components/shared/BentoCard';

export function EducationCard() {
    return (
        <BentoCard colSpan={2} className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground/90 tracking-tight">Education</h3>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                    <p className="text-lg font-medium text-foreground/90">B.Sc. Computer Science</p>
                    <p className="text-sm text-muted-foreground">Specializing in Software Engineering & Web Technologies</p>
                </div>
                <div className="shrink-0 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">
                    <span className="text-xs font-medium text-primary">2022 — 2026</span>
                </div>
            </div>
        </BentoCard>
    );
}
