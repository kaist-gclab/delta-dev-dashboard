export interface DashboardModel {
    currentInstant: Date,
    projectTitle: string,
    projectStartDate: Date,
    projectDueDate: Date,
    repositories: string[],
    gitHubStatistics: GitHubStatistics,
    gitHubTargetsBegin: GitHubTargets,
    gitHubTargetsEnd: GitHubTargets,
}

interface GitHubStatistics {
    repositories: number,
    details: GitHubStatisticsDetail[],
    updated: Date,
    isComplete: boolean,
    contributors: number,
}

interface GitHubStatisticsDetail {
    name: string,
    commits: number,
    stargazers: number,
    contributors: number,
}

interface GitHubTargets {
    repositories: number,
    commits: number,
    stargazers: number,
    contributors: number,
}
