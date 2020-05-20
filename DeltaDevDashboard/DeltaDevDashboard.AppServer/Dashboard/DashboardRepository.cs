using System.Collections.Generic;
using System.Threading.Tasks;
using Newtonsoft.Json;
using NodaTime;
using StackExchange.Redis.Extensions.Core.Abstractions;

namespace DeltaDevDashboard.AppServer.Dashboard
{
    public class DashboardRepository
    {
        private readonly IRedisDatabase _database;
        private readonly IClock _clock;
        private readonly JsonSerializerSettings _jsonSerializerSettings;

        public DashboardRepository(IRedisDatabase database, IClock clock,
            JsonSerializerSettings jsonSerializerSettings)
        {
            _database = database;
            _clock = clock;
            _jsonSerializerSettings = jsonSerializerSettings;
        }

        public async Task<string> GetApiKey()
        {
            return await _database.GetAsync<string>("api-key");
        }

        public async Task<List<string>> GetRepositories()
        {
            return await _database.GetAsync<List<string>>("repositories") ?? new List<string>();
        }

        public async Task<string> GetProjectTitle()
        {
            return await _database.GetAsync<string>("project:title");
        }

        public async Task<Instant> GetProjectDueDate()
        {
            return await _database.GetAsync<Instant>("project:due-date");
        }

        public async Task<string> GetGitHubToken()
        {
            return await _database.GetAsync<string>("github-token");
        }

        public async Task<GitHubStatistics> GetGitHubStatistics()
        {
            try
            {
                var result = await _database.GetAsync<GitHubStatistics>("github-statistics");
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
            await _database.Database.StringSetAsync("github-statistics", value);
        }

        public async Task<GitHubTargets> GetGitHubTargetsBegin()
        {
            return await _database.GetAsync<GitHubTargets>("github-targets-begin");
        }
        
        public async Task<GitHubTargets> GetGitHubTargetsEnd()
        {
            return await _database.GetAsync<GitHubTargets>("github-targets-end");
        }

        public async Task<Instant> GetProjectStartDate()
        {
            return await _database.GetAsync<Instant>("project:start-date");
        }
    }
}