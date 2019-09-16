export const FETCH_DASHBOARD = 'FETCH_DASHBOARD';
export const UPDATE_DASHBOARD = 'UPDATE_DASHBOARD';

interface FetchDashboardAction {
    type: typeof FETCH_DASHBOARD
}

interface UpdateDashboardAction {
    type: typeof UPDATE_DASHBOARD
    dashboard: DashboardModel
}

export type DashboardActionTypes = FetchDashboardAction | UpdateDashboardAction;

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
    updated: any,
    isComplete: boolean,
    contributors: number,
}

interface GitHubStatisticsDetail {
    name: string,
    commites: number,
    stargazers: number,
    contributors: number,
}

interface GitHubTargets {
    repositories: number,
    commits: number,
    stargazers: number,
    contributors: number,
}
