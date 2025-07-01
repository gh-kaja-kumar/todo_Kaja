using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        // Hardcoded UserId for now
        private const int HardcodedUserId = 1;

        public TodoItemsController(TodoDbContext context)
        {
            _context = context;
        }

        // GET: api/TodoItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodoItems()
        {
            // Fetch tasks only for the hardcoded user
            return await _context.TodoItems
                .Where(t => t.AppUserId == HardcodedUserId)
                .ToListAsync();
        }

        // GET: api/TodoItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TodoItem>> GetTodoItem(int id)
        {
            // Fetch the task only if it belongs to the hardcoded user
            var todoItem = await _context.TodoItems
                .FirstOrDefaultAsync(t => t.Id == id && t.AppUserId == HardcodedUserId);

            if (todoItem == null)
            {
                return NotFound();
            }

            return todoItem;
        }

        // PUT: api/TodoItems/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodoItem(int id, TodoItem todoItem)
        {
            if (id != todoItem.Id)
            {
                return BadRequest();
            }

            // Ensure the task belongs to the hardcoded user
            var existingTodoItem = await _context.TodoItems
                .FirstOrDefaultAsync(t => t.Id == id && t.AppUserId == HardcodedUserId);

            if (existingTodoItem == null)
            {
                return NotFound("Task not found or does not belong to the user.");
            }

            // Update the task
            existingTodoItem.Title = todoItem.Title;
            existingTodoItem.Description = todoItem.Description;
            existingTodoItem.DueDate = todoItem.DueDate;
            existingTodoItem.IsCompleted = todoItem.IsCompleted;
            existingTodoItem.Priority = todoItem.Priority;
            existingTodoItem.Category = todoItem.Category;

            _context.Entry(existingTodoItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TodoItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/TodoItems
        [HttpPost]
        public async Task<ActionResult<TodoItem>> PostTodoItem(TodoItem todoItem)
        {
            // Assign the hardcoded user to the task
            todoItem.AppUserId = HardcodedUserId;

            _context.TodoItems.Add(todoItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTodoItem", new { id = todoItem.Id }, todoItem);
        }

        // DELETE: api/TodoItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodoItem(int id)
        {
            // Ensure the task belongs to the hardcoded user
            var todoItem = await _context.TodoItems
                .FirstOrDefaultAsync(t => t.Id == id && t.AppUserId == HardcodedUserId);

            if (todoItem == null)
            {
                return NotFound("Task not found or does not belong to the user.");
            }

            _context.TodoItems.Remove(todoItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TodoItemExists(int id)
        {
            return _context.TodoItems.Any(e => e.Id == id && e.AppUserId == HardcodedUserId);
        }
    }
}
