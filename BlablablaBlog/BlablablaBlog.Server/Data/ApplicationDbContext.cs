using BlablablaBlog.Server.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Reflection.Emit;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace BlablablaBlog.Server.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Post> Posts { get; set; } = null!;
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Comment> Comments { get; set; } = null!;
        public DbSet<Tag> Tags { get; set; } = null!;

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
                : base(options)
        {
           //Database.EnsureDeleted();
           //Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            /*  var config = new ConfigurationBuilder()
                          .AddJsonFile("appsettings.json")
                          .SetBasePath(Directory.GetCurrentDirectory())
                          .Build();

              optionsBuilder.UseNpgsql(config.GetConnectionString("DefaultConnection"));
              optionsBuilder.EnableSensitiveDataLogging();*/

            optionsBuilder.EnableSensitiveDataLogging();
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Post>()
                .Property(u => u.DateCreate)
                .HasDefaultValueSql("CURRENT_TIMESTAMP");
          /*              
            User user1 = new User { Id = 1, Name = "Александр", Email = "alex@test.com" };
            User user2 = new User { Id = 2, Name = "Борис", Email = "boris@test.com" };
            User user3 = new User { Id = 3, Name = "Василий", Email = "vasya@test.com" };
            modelBuilder.Entity<User>().HasData(user1, user2, user3);
            */

            /**/

            /*
                       var posts = Enumerable.Range(1, 3).Select(index => new Post
                       {
                           Id = index,
                           Title = "Тестовый пост " + index,
                           Message = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. " +
                                   "Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat " +
                                   "libero asperiores earum nam nobis, culpa ratione quam perferendis esse, " +
                                   "cupiditate neque quas!",
                           DateCreate = DateTime.Now,                     
                           AuthorId = user1.Id,
                           Tags = [ new Tag {Text=$"тэг1_{index}"},
                                    new Tag {Text=$"тэг2_{index}"},
                                    new Tag {Text=$"тэг3_{index}"}
                                   ],
                           Comments = [
                               new Comment {Message = $"Комментарий #1_{index}", DateCreate=DateTime.Now, AuthorId=user1.Id },
                               new Comment {Message = $"Комментарий #2_{index}", DateCreate=DateTime.Now, AuthorId=user2.Id },
                               new Comment {Message = $"Комментарий #3_{index}", DateCreate=DateTime.Now, AuthorId=user3.Id }
                               ]
                       });

                       modelBuilder.Entity<Post>().HasData(posts);*/
        }

    }
}
