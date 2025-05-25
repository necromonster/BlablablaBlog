using BlablablaBlog.Server.Data;
using BlablablaBlog.Server.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using System.Reflection.Metadata;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BlablablaBlog.Server.Controllers
{

    [Route("[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly ApplicationDbContext db;
        private readonly ILogger<PostController> _logger;

        public PostController(ILogger<PostController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            db = context;
        }
        // GET: api/<PostController>        
        [HttpGet]
        [Route("feed")]
        public async Task<ActionResult<IEnumerable<Post>>> Get() 
        {
            var posts = await db.Posts
                .Include(i => i.Tags)
                .Include(i => i.Author)
                .Include(i => i.Comments)
                //.Where(w => w.State == PostState.PUBLISHED) // PUBLISHED by default
                .OrderByDescending(p => p.DateCreate)
                .ToArrayAsync();

            return Ok(posts);            
        }

        // GET api/<PostController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Post>>> Get(int id)
        {
            Post? post = await db.Posts
                .Where(p => p.Id == id)
                .Include(i => i.Tags)
                .Include(i => i.Author)
                .FirstOrDefaultAsync();
            if(post == null) 
                return NotFound();

            return Ok(post);            
        }

        // POST api/<PostController>
        [HttpPost]
        public async Task<IActionResult> Post(Post post)
        {            
            if (post.State == PostState.PUBLISHED) // при публикации должна сразу ставиться дата публикации
                post.DatePublished = DateTime.UtcNow;
            db.Posts.Add(post);

            await db.SaveChangesAsync();            
            return Ok(post);
        }

        // PUT api/<PostController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Post post)
        {
            if ( id != post.Id )
            {
                return NotFound();
            }

            db.Tags.RemoveRange (
                    db.Tags
                    .Where(t =>t.PostId == id).ToArray()
                    );

            post.DateEdited = DateTime.UtcNow; // при сохранении редактируемого поста - ставится дата dateEdited

            if (post.State == PostState.PUBLISHED)
                post.DatePublished = DateTime.UtcNow;
            db.Posts.Update(post);          

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PostExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE api/<PostController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {           
            var post =  db.Posts.Where(b => b.Id == id).Include(b => b.Tags).FirstOrDefault();
            if(post == null) 
                return NotFound();

            db.Posts.Remove(post);
            db.SaveChanges();   // не асинхронно, потому что хочу дождаться реального удаления, т.к. на клиенте рефреш постов будет сразу после удаления

            return Ok(post);
        }

        private bool PostExists(long id)
        {
            return db.Posts.Any(e => e.Id == id);
        }
    }
}
