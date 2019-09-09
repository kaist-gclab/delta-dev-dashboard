using DeltaDevDashboard.AppServer.Schedule;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using NodaTime;
using NodaTime.Serialization.JsonNet;

namespace DeltaDevDashboard.AppServer
{
    internal static class ConfigurationHelper
    {
        public static void ConfigureJsonSerializerSettings(this JsonSerializerSettings settings)
        {
            settings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            settings.ConfigureForNodaTime(DateTimeZoneProviders.Tzdb);
        }
        
        public static void AddScheduledTask<T>(this IServiceCollection services)
            where T : class, IScheduledTask
        {
            services.AddScoped<T>();
            services.AddHostedService<ScopedScheduledHostedService<T>>();
        }
    }
}