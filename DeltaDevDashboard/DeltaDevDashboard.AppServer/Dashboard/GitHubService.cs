using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace DeltaDevDashboard.AppServer.Dashboard
{
    public class GitHubService
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly DashboardRepository _dashboardRepository;

        public GitHubService(IHttpClientFactory httpClientFactory, DashboardRepository dashboardRepository)
        {
            _httpClientFactory = httpClientFactory;
            _dashboardRepository = dashboardRepository;
        }

        public async Task Update()
        {
            foreach (var repository in await _dashboardRepository.GetRepositories())
            {
                var url = "https://api.github.com/repos/" + repository + "/stats/contributors";
                var str = await _httpClientFactory.CreateClient().GetStringAsync(url);
                var json = JsonConvert.DeserializeXNode(str);
                Console.WriteLine(url);
                Console.WriteLine(json.Elements().Count());
            }
        }

        public async Task<List<string>> GetRepositories()
        {
            return await _dashboardRepository.GetRepositories();
        }
    }
}