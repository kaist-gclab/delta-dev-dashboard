using Microsoft.AspNetCore.Mvc;

namespace DeltaDevDashboard.AppServer.Dashboard
{
    [ApiController]
    [Route("/")]
    public class HomeController : ControllerBase
    {
        public IActionResult Home()
        {
            return Ok("DeltaDevDashboard");
        }
    }
}