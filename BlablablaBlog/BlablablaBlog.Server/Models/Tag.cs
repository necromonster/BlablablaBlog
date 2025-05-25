using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BlablablaBlog.Server.Model;

public class Tag
{
    public int Id { get; set; }

    public string Text { get; set; } = null!;

    public int PostId { get; set; }
}
