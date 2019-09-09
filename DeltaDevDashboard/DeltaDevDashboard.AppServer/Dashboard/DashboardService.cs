using System.Threading.Tasks;
using NodaTime;

namespace DeltaDevDashboard.AppServer.Dashboard
{
    public class DashboardService
    {
        private readonly DashboardRepository _dashboardRepository;

        public DashboardService(DashboardRepository dashboardRepository)
        {
            _dashboardRepository = dashboardRepository;
        }

        public async Task<string> GetApiKey()
        {
            return await _dashboardRepository.GetApiKey();
        }

        public async Task<string> GetProjectTitle()
        {
            return await _dashboardRepository.GetProjectTitle();
        }

        public async Task<Instant> GetProjectDueDate()
        {
            return await _dashboardRepository.GetProjectDueDate();
        }
    }
}