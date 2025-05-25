﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BlablablaBlog.Server.Model;

public class User
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

}
