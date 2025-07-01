using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using TodoApi.Models;

namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoItemsController : ControllerBase
    {
        private readonly TodoDbContext _context;

        public TodoItemsController(TodoDbContext context)
        {
            _context = context;
        }

        // ✅ GET: api/TodoItems
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodoItems()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null)
                return Unauthorized();

            return await _context.TodoItems
                .Where(t => t.AppUserId == int.Parse(userId))
                .ToListAsync();
        }

        // ✅ GET: api/TodoItems/5
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<TodoItem>> GetTodoItem(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null)
                return Unauthorized();

            var todoItem = await _context.TodoItems
                .FirstOrDefaultAsync(t => t.Id == id && t.AppUserId == int.Parse(userId));

            if (todoItem == null)
                return NotFound();

            return todoItem;
        }

        // ✅ PUT: api/TodoItems/5
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodoItem(int id, TodoItem todoItem)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null)
                return Unauthorized();

            if (id != todoItem.Id)
                return BadRequest();

            var existingTodoItem = await _context.TodoItems
                .FirstOrDefaultAsync(t => t.Id == id && t.AppUserId == int.Parse(userId));

            if (existingTodoItem == null)
                return NotFound("Task not found or does not belong to the user.");

            // Update fields
            existingTodoItem.Title = todoItem.Title;
            existingTodoItem.Description = todoItem.Description;
            existingTodoItem.DueDate = todoItem.DueDate;
            existingTodoItem.IsCompleted = todoItem.IsCompleted;
            existingTodoItem.Priority = todoItem.Priority;
            existingTodoItem.Category = todoItem.Category;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // ✅ POST: api/TodoItems
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<TodoItem>> PostTodoItem(TodoItem todoItem)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null)
                return Unauthorized();

            todoItem.AppUserId = int.Parse(userId);

            _context.TodoItems.Add(todoItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTodoItem", new { id = todoItem.Id }, todoItem);
        }

        // ✅ DELETE: api/TodoItems/5
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodoItem(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null)
                return Unauthorized();

            var todoItem = await _context.TodoItems
                .FirstOrDefaultAsync(t => t.Id == id && t.AppUserId == int.Parse(userId));

            if (todoItem == null)
                return NotFound("Task not found or does not belong to the user.");

            _context.TodoItems.Remove(todoItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TodoItemExists(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            return _context.TodoItems.Any(e => e.Id == id && e.AppUserId == int.Parse(userId));
        }
    }
}
