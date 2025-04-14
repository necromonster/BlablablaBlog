namespace BlablablaBlog.Server.Data
{
    public class Post
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public required string Message { get; set; } 
        public required DateTime DateCreate { get; set; }
        public required User Author { get; set; }
        public LinkedList<Comment>? Comments { get; set; }     
        public List<Tag>? Tags { get; set; } 
    }

    public class Tag
    {
        public int Id { get; set; }
        public required string Text { get; set; }
    }
}
