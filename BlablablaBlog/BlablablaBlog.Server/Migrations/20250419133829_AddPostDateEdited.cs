using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BlablablaBlog.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddPostDateEdited : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DateEdited",
                table: "Posts",
                type: "timestamp with time zone",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateEdited",
                table: "Posts");
        }
    }
}
