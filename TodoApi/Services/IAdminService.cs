using TodoApi.DTOs;

namespace TodoApi.Services.Interfaces;

public interface IAdminService
{
    Task<IEnumerable<TodoItemDto>> GetAllTasksAsync();
    Task<IEnumerable<TodoItemDto>> GetTasksByUserIdAsync(int userId);
}