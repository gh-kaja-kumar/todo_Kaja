using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TodoApi.Services.Interfaces;

namespace TodoApi.Controllers;

[Route("api/admin")]
[ApiController]
[Authorize(Roles = "Admin")]
public class AdminController : ControllerBase
{
    private readonly IAdminService _adminService;

    public AdminController(IAdminService adminService)
    {
        _adminService = adminService;
    }

    // GET: api/admin/tasks
    [HttpGet("tasks")]
    public async Task<IActionResult> GetAllTasks()
    {
        var tasks = await _adminService.GetAllTasksAsync();
        return Ok(tasks);
    }

    // GET: api/admin/tasks/{userId}
    [HttpGet("tasks/{userId}")]
    public async Task<IActionResult> GetTasksByUser(int userId)
    {
        var tasks = await _adminService.GetTasksByUserIdAsync(userId);
        return Ok(tasks);
    }
}
