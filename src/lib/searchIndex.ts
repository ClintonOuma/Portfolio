import { PROJECTS } from '@/data/projects';
import { EXPERIENCE } from '@/data/experience';
import { SKILLS } from '@/data/skills';
import { SITE_METADATA } from '@/lib/constants';

export type SearchResultType = 'nav' | 'project' | 'experience' | 'skill' | 'contact';

export interface SearchItem {
    id: string;
    type: SearchResultType;
    label: string;
    subtitle?: string;
    keywords: string; // Combined searchable text
    href?: string;
    action?: 'copy' | 'external';
    actionPayload?: string;
}

/* Flattened search index for portfolio-wide search */
export function getSearchIndex(): SearchItem[] {
    const items: SearchItem[] = [];

    /* Navigation */
    items.push({
        id: 'nav-home',
        type: 'nav',
        label: 'Home',
        keywords: 'home dashboard main',
        href: '/',
    });
    items.push({
        id: 'nav-projects',
        type: 'nav',
        label: 'Projects',
        keywords: 'projects work portfolio incubator devtrace pulsechat econode',
        href: '#projects',
    });
    items.push({
        id: 'nav-stack',
        type: 'nav',
        label: 'Tech Stack',
        keywords: 'stack skills technologies javascript typescript react nextjs css',
        href: '#stack',
    });
    items.push({
        id: 'nav-experience',
        type: 'nav',
        label: 'Experience',
        keywords: 'experience work education career timeline maasai mara university',
        href: '#experience',
    });
    items.push({
        id: 'nav-contact',
        type: 'nav',
        label: 'Contact',
        keywords: 'contact email get in touch clichyb80 gmail',
        href: '#contact',
    });

    /* Projects */
    PROJECTS.forEach((p) => {
        items.push({
            id: `project-${p.id}`,
            type: 'project',
            label: p.title,
            subtitle: p.subtitle,
            keywords: [p.title, p.subtitle, p.description, p.problem, p.solution, ...p.tags].join(' ').toLowerCase(),
            href: '#projects',
        });
    });

    /* Experience */
    EXPERIENCE.forEach((e) => {
        items.push({
            id: `exp-${e.id}`,
            type: 'experience',
            label: `${e.title} @ ${e.organization}`,
            subtitle: e.date,
            keywords: [e.title, e.organization, e.description, ...(e.techStack || [])].join(' ').toLowerCase(),
            href: '#experience',
        });
    });

    /* Skills */
    SKILLS.forEach((s) => {
        items.push({
            id: `skill-${s.name.toLowerCase().replace(/\s/g, '-')}`,
            type: 'skill',
            label: s.name,
            subtitle: s.description,
            keywords: [s.name, s.description, s.level.toString()].join(' ').toLowerCase(),
            href: '#stack',
        });
    });

    /* Contact / Socials */
    items.push({
        id: 'contact-email',
        type: 'contact',
        label: 'Copy Email',
        keywords: 'email clichyb80 gmail contact',
        action: 'copy',
        actionPayload: 'clichyb80@gmail.com',
    });
    items.push({
        id: 'contact-github',
        type: 'contact',
        label: 'GitHub',
        keywords: 'github clinton ouma code repos',
        action: 'external',
        actionPayload: SITE_METADATA.github,
    });
    items.push({
        id: 'contact-x',
        type: 'contact',
        label: 'X',
        keywords: 'x twitter abclichy social',
        action: 'external',
        actionPayload: SITE_METADATA.x,
    });

    return items;
}
