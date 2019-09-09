using System.Threading.Tasks;
using NodaTime;

namespace DeltaDevDashboard.AppServer.Schedule
{
    public interface IScheduledTask
    {
        Duration Interval { get; }

        Task DoWorkAsync();
    }
}