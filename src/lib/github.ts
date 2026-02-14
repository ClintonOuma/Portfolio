import type { GitHubRepo, GitHubProfile, GitHubData } from "@/types/github";

const GITHUB_USERNAME = "ClintonOuma";
const GITHUB_API = "https://api.github.com";

export async function getGitHubData(): Promise<GitHubData> {
    const headers: HeadersInit = {
        Accept: "application/vnd.github.v3+json",
        ...(process.env.GITHUB_TOKEN && {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        }),
    };

    const [reposRes, profileRes] = await Promise.all([
        fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=3`, {
            headers,
            next: { revalidate: 3600 }, // ISR: revalidate every 60 minutes
        }),
        fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}`, {
            headers,
            next: { revalidate: 3600 },
        }),
    ]);

    if (!reposRes.ok || !profileRes.ok) {
        console.error("GitHub API error:", reposRes.status, profileRes.status);
        return {
            repos: [],
            profile: {
                public_repos: 0,
                followers: 0,
                following: 0,
                public_gists: 0,
            },
        };
    }

    const allRepos: GitHubRepo[] = await reposRes.json();
    const profile: GitHubProfile = await profileRes.json();

    // Filter out forks, take top 3 by last updated
    const repos = allRepos.filter((repo) => !repo.fork).slice(0, 3);

    return { repos, profile };
}
