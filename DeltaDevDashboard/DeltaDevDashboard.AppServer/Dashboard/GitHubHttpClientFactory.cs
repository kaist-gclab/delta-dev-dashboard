using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace DeltaDevDashboard.AppServer.Dashboard
{
    public class GitHubHttpClientFactory
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly DashboardRepository _dashboardRepository;

        public GitHubHttpClientFactory(IHttpClientFactory httpClientFactory, DashboardRepository dashboardRepository)
        {
            _httpClientFactory = httpClientFactory;
            _dashboardRepository = dashboardRepository;
        }

        public async Task<HttpClient> CreateClient()
        {
            var token = await _dashboardRepository.GetGitHubToken();
            if (string.IsNullOrWhiteSpace(token))
            {
                throw new ArgumentOutOfRangeException();
            }

            var client = _httpClientFactory.CreateClient();
            client.DefaultRequestHeaders.UserAgent.Add(ProductInfoHeaderValue.Parse("HttpClient"));
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic",
                Convert.ToBase64String(Encoding.UTF8.GetBytes("username:" + token)));
            await Task.Delay(2048);
            return client;
        }
    }
}