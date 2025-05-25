using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BlablablaBlog.Server.Model;
public enum PostState
{
    PUBLISHED,
    DRAFT,
    DELETED
}
public class Post
{
    public int Id { get; set; }

    public string? Title { get; set; } = null!;

    public string Message { get; set; } = null!;

    public DateTime? DateCreate { get; set; }

    public DateTime? DatePublished { get; set; }

    public DateTime? DateEdited { get; set; }

    public int? AuthorId { get; set; }

    public User? Author { get; set; }

    public PostState State { get; set; }
    
    public ICollection<Tag> Tags { get; set; } = [];
    
    public ICollection<Comment> Comments { get; set; } = [];
    
}
