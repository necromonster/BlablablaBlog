using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BlablablaBlog.Server.Model;

public class Comment
{
    public int Id { get; set; }

    public string Message { get; set; } = null!;

    public DateTime DateCreate { get; set; } = DateTime.Now;

    public User Author { get; set; } = null!;
}
