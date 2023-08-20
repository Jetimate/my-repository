using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Spelz.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        [HttpGet()]
        public IActionResult Login(string username, string password)
        {
            var result = false;

            if (username == "jetimate" && password == "12345678")
            {
                result = true;
            }
            else
            {
                return Unauthorized();
            }

            return new ObjectResult(result);
        }
    }
}
