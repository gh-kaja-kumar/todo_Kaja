using System;
using Microsoft.EntityFrameworkCore;
using TodoApi.Models;

namespace TodoApi.Data;

public class TodoDbContext : DbContext
{
    public TodoDbContext(DbContextOptions<TodoDbContext> options) : base(options) { }

    public DbSet<TodoItem> TodoItems => Set<TodoItem>();
    public DbSet<AppUser> AppUsers => Set<AppUser>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Seed dummy users
        modelBuilder.Entity<AppUser>().HasData(
            new AppUser { Id = 1, Username = "user1", Password = "1234", Email = "user1@example.com" },
            new AppUser { Id = 2, Username = "user2", Password = "1234", Email = "user2@example.com" }
        );

        // Seed default tasks for each user with additional properties
        var staticDueDate = new DateTime(2025, 07, 01, 8, 0, 0);

        modelBuilder.Entity<TodoItem>().HasData(
            new TodoItem
            {
                Id = 1,
                Title = "Wake Up",
                Description = "Wake up early in the morning",
                DueDate = staticDueDate,
                IsCompleted = false,
                Priority = 1,
                Category = "Personal",
                AppUserId = 1
            },
            new TodoItem
            {
                Id = 2,
                Title = "Sleep",
                Description = "Go to bed early",
                DueDate = staticDueDate,
                IsCompleted = false,
                Priority = 0,
                Category = "Personal",
                AppUserId = 1
            },
            new TodoItem
            {
                Id = 3,
                Title = "Wake Up",
                Description = "Wake up early in the morning",
                DueDate = staticDueDate,
                IsCompleted = false,
                Priority = 1,
                Category = "Personal",
                AppUserId = 2
            },
            new TodoItem
            {
                Id = 4,
                Title = "Sleep",
                Description = "Go to bed early",
                DueDate = staticDueDate,
                IsCompleted = false,
                Priority = 0,
                Category = "Personal",
                AppUserId = 2
            }
        );
    }
}
