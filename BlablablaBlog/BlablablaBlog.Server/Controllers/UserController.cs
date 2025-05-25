using BlablablaBlog.Server.Data;
using BlablablaBlog.Server.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BlablablaBlog.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext db;
        private readonly ILogger<UserController> _logger;
        public UserController(ILogger<UserController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            db = context;
            if (!db.Users.Any())
            {
                db.Users.Add(new User { Name = "Александр", Email = "alex@text.com" });
                db.Users.Add(new User { Name = "Борис", Email = "boris@text.com" });
                db.Users.Add(new User { Name = "Василий", Email = "vasya@text.com" });
                db.SaveChanges();
            }
        }

        // GET: <UserController>
        [HttpGet(Name = "GetUser")]
        public async Task<ActionResult<IEnumerable<User>>> Get()
        {            
            var user = await db.Users.ElementAtOrDefaultAsync(Random.Shared.Next(0, db.Users.Count() ));
            return Ok(user);
        }



        /*

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<UserController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }*/
    }
}
