export interface GitHubRepo {
    name: string;
    description: string | null;
    html_url: string;
    stargazers_count: number;
    language: string | null;
    fork: boolean;
    updated_at: string;
}

export interface GitHubProfile {
    public_repos: number;
    followers: number;
    following: number;
    public_gists: number;
}

export interface GitHubData {
    repos: GitHubRepo[];
    profile: GitHubProfile;
}
