// DTOs/Admin/CreateTaskByAdminDto.cs
namespace YourNamespace.DTOs.Admin
{
    public class CreateTaskByAdminDto
    {
        public string Title { get; set; }
        public string? Description { get; set; }
        public DateTime DueDate { get; set; }
        public int Priority { get; set; }
        public string? Category { get; set; }
        public required string AssignedToUsername { get; set; }
    }
}
