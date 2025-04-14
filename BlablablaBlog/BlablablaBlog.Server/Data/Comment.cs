namespace BlablablaBlog.Server.Data
{
    public class Comment
    {
        public int Id { get; set; }
        public required string Message { get; set; }
        public required DateTime DateCreate { get; set; }
        public required User Author { get; set; }

        public int? IdParent { get; set; }
        public LinkedList<Comment>? Replies { get; set; }
    }
}
