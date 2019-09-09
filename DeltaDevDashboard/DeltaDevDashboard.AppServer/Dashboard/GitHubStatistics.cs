using System.Collections.Generic;
using NodaTime;

namespace DeltaDevDashboard.AppServer.Dashboard
{
    public class GitHubStatistics
    {
        public int Repositories { get; set; }
        public IEnumerable<GitHubStatisticsDetail> Details { get; set; }
        public Instant Updated { get; set; }
        public bool IsComplete { get; set; }

        public int? Contributors { get; set; }

        public class GitHubStatisticsDetail
        {
            public string Name { get; set; }
            public int? Commits { get; set; }
            public int? Stargazers { get; set; }
            public int? Contributors { get; set; }
        }
    }
}