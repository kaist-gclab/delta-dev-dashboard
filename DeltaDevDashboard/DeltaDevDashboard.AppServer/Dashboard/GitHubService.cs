using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NodaTime;

namespace DeltaDevDashboard.AppServer.Dashboard
{
    public class GitHubService
    {
        private readonly GitHubHttpClientFactory _gitHubHttpClientFactory;
        private readonly DashboardRepository _dashboardRepository;
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IClock _clock;

        public GitHubService(GitHubHttpClientFactory gitHubHttpClientFactory, DashboardRepository dashboardRepository,
            IHttpClientFactory httpClientFactory, IClock clock)
        {
            _gitHubHttpClientFactory = gitHubHttpClientFactory;
            _dashboardRepository = dashboardRepository;
            _httpClientFactory = httpClientFactory;
            _clock = clock;
        }

        public async Task Update()
        {
            for (var i = 0; i < 2; i++)
            {
                var gitHubStatistics = await FetchGitHubStatistics();
                await _dashboardRepository.SetGitHubStatistics(gitHubStatistics);
                if (gitHubStatistics.IsComplete)
                {
                    break;
                }
            }
        }

        private async Task<GitHubStatistics> FetchGitHubStatistics()
        {
            var details = new List<GitHubStatistics.GitHubStatisticsDetail>();
            var result = new GitHubStatistics
            {
                Updated = _clock.GetCurrentInstant(),
                IsComplete = true,
                Details = details
            };

            var repositories = await _dashboardRepository.GetRepositories();
            result.Repositories = repositories.Count;
            var uniqueContributors = new HashSet<string>();
            foreach (var repository in repositories)
            {
                var contributors = (await GetContributors(repository))?.ToList();
                var commits = await GetCommits(repository);
                var stargazers = await GetStargazers(repository);
                if (contributors == null || commits == null || stargazers == null)
                {
                    result.IsComplete = false;
                }

                contributors?.ForEach(c => uniqueContributors.Add(c));

                details.Add(new GitHubStatistics.GitHubStatisticsDetail
                {
                    Name = repository,
                    Commits = commits,
                    Stargazers = stargazers,
                    Contributors = contributors?.Count
                });
            }

            result.Contributors = uniqueContributors.Count;
            return result;
        }

        private async Task<IEnumerable<string>> GetContributors(string repository)
        {
            var url = "https://api.github.com/repos/" + repository + "/stats/contributors";
            var client = await _gitHubHttpClientFactory.CreateClient();
            var text = await client.GetStringAsync(url);
            try
            {
                var ids = from cont in JArray.Load(new JsonTextReader(new StringReader(text)))
                          let author = cont["author"]
                          select author["id"].ToString();
                return ids.ToList();
            }
            catch (JsonReaderException)
            {
                return null;
            }
        }

        private async Task<int?> GetCommits(string repository)
        {
            var url = "https://github.com/" + repository;
            var client = _httpClientFactory.CreateClient();
            var text = await client.GetStringAsync(url);
            try
            {
                var begin = text.IndexOf("<li class=\"commits\">", StringComparison.Ordinal);
                var end = text.IndexOf("</li>", begin, StringComparison.Ordinal);
                text = text.Substring(begin, end - begin);
                var regex = new Regex(@"<span class=""num text-emphasized"">\s*?(\d+)\s*?</span>");
                var match = regex.Match(text);
                var commits = match.Groups[1].Value;
                return int.Parse(commits);
            }
            catch
            {
                return null;
            }
        }

        private async Task<int?> GetStargazers(string repository)
        {
            var url = "https://api.github.com/repos/" + repository;
            var client = await _gitHubHttpClientFactory.CreateClient();
            var text = await client.GetStringAsync(url);
            try
            {
                var obj = JObject.Load(new JsonTextReader(new StringReader(text)));
                return (int) obj["stargazers_count"];
            }
            catch (JsonReaderException)
            {
                return null;
            }
        }


        public async Task<List<string>> GetRepositories()
        {
            return await _dashboardRepository.GetRepositories();
        }

        public async Task<GitHubStatistics> GetGitHubStatistics()
        {
            return await _dashboardRepository.GetGitHubStatistics();
        }

        public async Task<GitHubTargets> GetGitHubTargetsBegin()
        {
            return await _dashboardRepository.GetGitHubTargetsBegin();
        }
        
        public async Task<GitHubTargets> GetGitHubTargetsEnd()
        {
            return await _dashboardRepository.GetGitHubTargetsEnd();
        }
    }
}