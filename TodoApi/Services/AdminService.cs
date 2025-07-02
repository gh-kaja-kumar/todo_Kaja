using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using TodoApi.DTOs;
using TodoApi.Services.Interfaces;

namespace TodoApi.Services;

public class AdminService : IAdminService
{
    private readonly TodoDbContext _context;

    public AdminService(TodoDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<TodoItemDto>> GetAllTasksAsync()
    {
        return await _context.TodoItems
            .Include(t => t.Owner)
            .Include(t => t.AssignedToUser)
            .Select(t => new TodoItemDto
            {
                Id = t.Id,
                Title = t.Title,
                Description = t.Description,
                DueDate = t.DueDate,
                IsCompleted = t.IsCompleted,
                Priority = t.Priority,
                Category = t.Category,
                OwnerUsername = t.Owner.Username,
                AssignedToUsername = t.AssignedToUser != null ? t.AssignedToUser.Username : null
            }).ToListAsync();
    }

    public async Task<IEnumerable<TodoItemDto>> GetTasksByUserIdAsync(int userId)
    {
        return await _context.TodoItems
            .Include(t => t.Owner)
            .Include(t => t.AssignedToUser)
            .Where(t => t.AppUserId == userId || t.AssignedToUserId == userId)
            .Select(t => new TodoItemDto
            {
                Id = t.Id,
                Title = t.Title,
                Description = t.Description,
                DueDate = t.DueDate,
                IsCompleted = t.IsCompleted,
                Priority = t.Priority,
                Category = t.Category,
                OwnerUsername = t.Owner.Username,
                AssignedToUsername = t.AssignedToUser != null ? t.AssignedToUser.Username : null
            }).ToListAsync();
    }
}
