using System;

namespace TodoApi.Models;

public class TodoItem
{
    public int Id { get; set; }  // Primary Key
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public DateTime DueDate { get; set; }
    public bool IsCompleted { get; set; } = false;
    public int Priority { get; set; } = 0; // 0 = Normal, 1 = High, etc.
    public string Category { get; set; } = "General";

    public int AppUserId { get; set; }  // FK column
    public AppUser? AppUser { get; set; }  // Navigation property
}
