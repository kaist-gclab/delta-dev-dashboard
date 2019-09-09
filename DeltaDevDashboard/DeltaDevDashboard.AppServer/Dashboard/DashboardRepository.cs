using System.Collections.Generic;
using System.Threading.Tasks;
using NodaTime;
using StackExchange.Redis.Extensions.Core.Abstractions;

namespace DeltaDevDashboard.AppServer.Dashboard
{
    public class DashboardRepository
    {
        private readonly IRedisDefaultCacheClient _client;

        public DashboardRepository(IRedisDefaultCacheClient client)
        {
            _client = client;
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
    }
}