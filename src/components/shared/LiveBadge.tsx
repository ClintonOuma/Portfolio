import { cn } from "@/lib/utils";

export function LiveBadge({ className }: { className?: string }) {
    return (
        <div className={cn("inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20", className)}>
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-medium text-emerald-200 tracking-wide">
                Available for 2026 Internships
            </span>
        </div>
    );
}
