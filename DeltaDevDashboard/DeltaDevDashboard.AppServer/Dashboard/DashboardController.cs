using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using NodaTime;

namespace DeltaDevDashboard.AppServer.Dashboard
{
    [ApiController]
    [Route("/api/dashboard")]
    public class DashboardController : ControllerBase
    {
        private readonly GitHubService _gitHubService;
        private readonly IActionContextAccessor _actionContextAccessor;
        private readonly DashboardService _dashboardService;
        private readonly IClock _clock;

        public DashboardController(GitHubService gitHubService,
            IActionContextAccessor actionContextAccessor,
            DashboardService dashboardService, IClock clock)
        {
            _gitHubService = gitHubService;
            _actionContextAccessor = actionContextAccessor;
            _dashboardService = dashboardService;
            _clock = clock;
        }

        [HttpGet]
        public async Task<IActionResult> Home()
        {
            var apiKey = await _dashboardService.GetApiKey();
            if (apiKey == null)
            {
                return NotFound();
            }

            var httpContext = _actionContextAccessor.ActionContext.HttpContext;
            var headers = httpContext.Request.Headers;
            if (!headers.ContainsKey("Authorization"))
            {
                return NotFound();
            }

            var header = headers["Authorization"];
            if (header.Count != 1 || header.First() != apiKey)
            {
                return NotFound();
            }

            return Ok(await Dashboard());
        }

        private async Task<DashboardResponse> Dashboard()
        {
            var response = new DashboardResponse
            {
                CurrentInstant = _clock.GetCurrentInstant(),
                ProjectTitle = await _dashboardService.GetProjectTitle(),
                ProjectDueDate = await _dashboardService.GetProjectDueDate(),
                Repositories = await _gitHubService.GetRepositories(),
                
            };
            return response;
        }

        private class DashboardResponse
        {
            public Instant CurrentInstant { get; set; }
            public string ProjectTitle { get; set; }
            public Instant ProjectDueDate { get; set; }
        }
    }
}