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
        public Duration Interval => Duration.FromMinutes(30);

        public GitHubUpdateScheduledTask(GitHubService gitHubService)
        {
            _gitHubService = gitHubService;
        }

        public async Task DoWorkAsync()
        {
            await _gitHubService.Update();
        }
    }
}