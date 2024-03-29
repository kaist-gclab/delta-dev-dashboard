﻿using System;
using DeltaDevDashboard.AppServer.Dashboard;
using DeltaDevDashboard.AppServer.Schedule;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using NodaTime;
using StackExchange.Redis.Extensions.Core;
using StackExchange.Redis.Extensions.Core.Abstractions;
using StackExchange.Redis.Extensions.Core.Configuration;
using StackExchange.Redis.Extensions.Core.Implementations;
using StackExchange.Redis.Extensions.Newtonsoft;

namespace DeltaDevDashboard.AppServer
{
    public class Startup
    {
        private readonly IConfiguration _configuration;

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers()
                .AddNewtonsoftJson(options => options.SerializerSettings.ConfigureJsonSerializerSettings());

            services.AddSingleton<IClock>(SystemClock.Instance);
            services.AddLogging(builder => builder.AddConsole());
            services.AddCors();
            services.AddHttpClient();
            services.AddHttpContextAccessor();
            services.TryAddSingleton<IActionContextAccessor, ActionContextAccessor>();

            services.AddScoped<DashboardRepository>();
            services.AddScoped<DashboardService>();
            services.AddScoped<GitHubService>();
            services.AddScoped<GitHubHttpClientFactory>();

            services.AddScheduledTask<GitHubUpdateScheduledTask>();
            services.AddSingleton(DateTimeZoneProviders.Tzdb[_configuration["Time:DateTimeZone"]]);
            services.AddSingleton<ScheduleHelper>();

            var redisConfiguration = _configuration.GetSection("Redis").Get<RedisConfiguration>();
            if (redisConfiguration == null)
            {
                throw new InvalidOperationException(nameof(RedisConfiguration));
            }

            services.AddSingleton(redisConfiguration);
            services.AddSingleton<IRedisClient, RedisClient>();
            services.AddSingleton<IRedisConnectionPoolManager, RedisConnectionPoolManager>();
            services.AddSingleton(provider => provider.GetRequiredService<IRedisClient>().GetDefaultDatabase());
            var jsonSerializerSettings = new JsonSerializerSettings();
            jsonSerializerSettings.ConfigureJsonSerializerSettings();
            services.AddSingleton(jsonSerializerSettings);
            services.AddSingleton<ISerializer, NewtonsoftSerializer>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseCors(builder => builder
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}