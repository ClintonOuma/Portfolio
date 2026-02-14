import { getGitHubData } from '@/lib/github';
import { PROJECTS } from '@/data/projects';
import { GithubPulse } from '@/components/shared/GithubPulse';
import { TechStackCard } from '@/components/shared/TechStackCard';
import { LocationCard } from '@/components/shared/LocationCard';
import { EducationCard } from '@/components/shared/EducationCard';
import { FeaturedProjectCard } from '@/components/shared/FeaturedProjectCard';

/** Pick the hot project for the dashboard: prefer Live, else first. */
function getHotProject() {
    const live = PROJECTS.find((p) => p.status === 'Live');
    return live ?? PROJECTS[0] ?? null;
}

export async function BentoGrid() {
    const githubData = await getGitHubData();
    const hotProject = getHotProject();

    return (
        <section id="dashboard" className="relative py-28 px-4" aria-label="Dashboard">
                <div className="max-w-5xl mx-auto">
                {/* Section Title */}
                <div className="text-center mb-12">
                    <span className="text-xs font-medium text-primary uppercase tracking-wider">At a Glance</span>
                    <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-foreground/90 tracking-tight">
                        The Dashboard
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground max-w-xl mx-auto">
                        Hot project &amp; overview — full lab in Projects.
                    </p>
                </div>

                {/* Grid — dense auto-flow prevents gaps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto" style={{ gridAutoFlow: 'dense' }}>
                    {/* Slot 1: Hot project — Large (2×2) */}
                    <div className="md:col-span-2 md:row-span-2">
                        <FeaturedProjectCard project={hotProject} />
                    </div>

                    {/* Slot 2: GitHub Pulse — Medium (1×2) */}
                    <div className="md:row-span-2">
                        <GithubPulse data={githubData} />
                    </div>

                    {/* Slot 3: Tech Stack — Small */}
                    <TechStackCard />

                    {/* Slot 4: Location/Timezone — Small */}
                    <LocationCard />

                    {/* Slot 5: Education — Wide (2×1) */}
                    <EducationCard />
                </div>
            </div>
        </section>
    );
}
