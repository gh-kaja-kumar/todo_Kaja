namespace TodoApi.DTOs
{
    public class TodoItemDto
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public string? Description { get; set; }
        public DateTime DueDate { get; set; }
        public bool IsCompleted { get; set; }
        public int Priority { get; set; }
        public string? Category { get; set; }
    }
}