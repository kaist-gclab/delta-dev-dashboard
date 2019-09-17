using System;
using System.Threading.Tasks;
using DeltaDevDashboard.AppServer.Schedule;
using JetBrains.Annotations;
using NodaTime;

namespace DeltaDevDashboard.AppServer.Dashboard
{
    [UsedImplicitly]
    public class GitHubUpdateScheduledTask : IScheduledTask
    {
        private readonly GitHubService _gitHubService;
        public Duration Interval => Duration.FromMinutes(10);

        public GitHubUpdateScheduledTask(GitHubService gitHubService)
        {
            _gitHubService = gitHubService;
        }

        public async Task DoWorkAsync()
        {
            await _gitHubService.Update();
            // GitHub API 문제
            await Task.Delay(TimeSpan.FromSeconds(10));
            await _gitHubService.Update();
        }
    }
}