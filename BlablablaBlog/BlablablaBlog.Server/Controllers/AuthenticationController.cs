using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace BlablablaBlog.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthenticationController : Controller
{
    public const string CorsPolicyName = "Bff";

    [HttpGet("check_session")]
    [EnableCors(CorsPolicyName)]
    public ActionResult<IDictionary<string, string>> CheckSession()
    {
        // return 401 Unauthorized to force SPA redirection to Login endpoint
        if (User.Identity?.IsAuthenticated != true)
            return Unauthorized();

        var claims = User.Claims.ToDictionary(claim => claim.Type, claim => claim.Value);

        foreach (var user in claims)
            Console.WriteLine(user.ToString());

        return claims;
    }

    [HttpGet("login")]
    public ActionResult<IDictionary<string, string>> Login()
    {        
        var result = Challenge(new AuthenticationProperties { RedirectUri = Url.Content("~/") });
        return result;
    }

    [HttpPost("logout")]
    public IActionResult Logout()
    {
        return SignOut();
    }
}