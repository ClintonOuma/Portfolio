import { Star, GitFork, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import type { GitHubData } from '@/types/github';
import { BentoCard } from '@/components/shared/BentoCard';

const LANGUAGE_COLORS: Record<string, string> = {
    TypeScript: 'bg-blue-400',
    JavaScript: 'bg-yellow-400',
    Python: 'bg-green-400',
    Rust: 'bg-orange-400',
    Go: 'bg-cyan-400',
    HTML: 'bg-red-400',
    CSS: 'bg-purple-400',
    Java: 'bg-red-500',
};

export function GithubPulse({ data }: { data: GitHubData }) {
    return (
        <BentoCard className="flex flex-col gap-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <h3 className="text-sm font-semibold text-foreground/90 tracking-tight">GitHub Pulse</h3>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{data.profile.public_repos} repos</span>
                    <span>{data.profile.followers} followers</span>
                </div>
            </div>

            {/* Repo List */}
            <div className="flex flex-col gap-3">
                {data.repos.map((repo) => (
                    <Link
                        key={repo.name}
                        href={repo.html_url}
                        target="_blank"
                        className="group flex items-start justify-between gap-3 p-3 -mx-1 rounded-xl hover:bg-white/5 transition-colors"
                    >
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-foreground/90 truncate group-hover:text-primary transition-colors">
                                    {repo.name}
                                </span>
                                <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            {repo.description && (
                                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{repo.description}</p>
                            )}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground shrink-0">
                            {repo.language && (
                                <span className="flex items-center gap-1">
                                    <span className={`w-2 h-2 rounded-full ${LANGUAGE_COLORS[repo.language] ?? 'bg-gray-400'}`} />
                                    {repo.language}
                                </span>
                            )}
                            <span className="flex items-center gap-0.5">
                                <Star className="w-3 h-3" />
                                {repo.stargazers_count}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </BentoCard>
    );
}
