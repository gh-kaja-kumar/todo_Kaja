using Microsoft.AspNetCore.Mvc;
using TodoApi.Models;
using TodoApi.Data;

namespace TodoApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly TodoDbContext _context;

        public UsersController(TodoDbContext context)
        {
            _context = context;
        }

        [HttpPost("signup")]
        public IActionResult Signup([FromBody] AppUser user)
        {
            if (_context.AppUsers.Any(u => u.Username == user.Username))
                return BadRequest("Username already exists.");

            _context.AppUsers.Add(user);
            _context.SaveChanges();

            return Ok("User registered successfully.");
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] AppUser login)
        {
            var user = _context.AppUsers
                .FirstOrDefault(u => u.Username == login.Username && u.Password == login.Password);

            if (user == null)
                return Unauthorized("Invalid username or password.");

            // Later: return JWT token
            return Ok("Login successful. (JWT will be implemented later)");
        }
    }
}
