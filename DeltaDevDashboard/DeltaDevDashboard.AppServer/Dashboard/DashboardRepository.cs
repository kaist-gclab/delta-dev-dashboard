using System.Collections.Generic;
using System.Threading.Tasks;
using Newtonsoft.Json;
using NodaTime;
using StackExchange.Redis.Extensions.Core.Abstractions;

namespace DeltaDevDashboard.AppServer.Dashboard
{
    public class DashboardRepository
    {
        private readonly IRedisDefaultCacheClient _client;
        private readonly IClock _clock;
        private readonly JsonSerializerSettings _jsonSerializerSettings;

        public DashboardRepository(IRedisDefaultCacheClient client, IClock clock,
            JsonSerializerSettings jsonSerializerSettings)
        {
            _client = client;
            _clock = clock;
            _jsonSerializerSettings = jsonSerializerSettings;
        }

        public async Task<string> GetApiKey()
        {
            return await _client.GetAsync<string>("api-key");
        }

        public async Task<List<string>> GetRepositories()
        {
            return await _client.GetAsync<List<string>>("repositories") ?? new List<string>();
        }

        public async Task<string> GetProjectTitle()
        {
            return await _client.GetAsync<string>("project:title");
        }

        public async Task<Instant> GetProjectDueDate()
        {
            return await _client.GetAsync<Instant>("project:due-date");
        }

        public async Task<string> GetGitHubToken()
        {
            return await _client.GetAsync<string>("github-token");
        }

        public async Task<GitHubStatistics> GetGitHubStatistics()
        {
            try
            {
                var result = await _client.GetAsync<GitHubStatistics>("github-statistics");
                if (result != null)
                {
                    return result;
                }
            }
            catch
            {
                // ignored
            }

            return new GitHubStatistics
            {
                Repositories = 0,
                Details = new List<GitHubStatistics.GitHubStatisticsDetail>(),
                Updated = _clock.GetCurrentInstant(),
                IsComplete = false
            };
        }

        public async Task SetGitHubStatistics(GitHubStatistics gitHubStatistics)
        {
            var value = JsonConvert.SerializeObject(gitHubStatistics, _jsonSerializerSettings);
            await _client.Database.StringSetAsync("github-statistics", value);
        }

        public async Task<GitHubTargets> GetGitHubTargets()
        {
            return await _client.GetAsync<GitHubTargets>("github-targets");
        }

        public async Task<Instant> GetProjectStartDate()
        {
            return await _client.GetAsync<Instant>("project:start-date");
        }
    }
}