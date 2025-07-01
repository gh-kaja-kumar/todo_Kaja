import Link from "next/link";
import axios from "axios";
import { Task } from "../hooks/types";

export interface TaskItemProps {
  task: Task;
  refetch: () => void;
}

export default function TaskItem({
  task,
  refetch,
}: {
  task: Task;
  refetch: () => void;
}) {
  const handleCheckboxChange = async () => {
    try {
      await axios.put(`http://localhost:5025/api/TodoItems/${task.id}`, {
        ...task,
        isCompleted: !task.isCompleted, // Toggle the completed status
      });
      refetch(); // Refresh the task list after updating
    } catch (error) {
      console.error("Failed to update task:", error);
      alert("Error updating task");
    }
  };

  return (
    <li className="border p-4 rounded shadow">
      <div className="flex justify-between items-start">
        <div>
          {/* Checkbox to mark task as completed */}
          <input
            type="checkbox"
            checked={task.isCompleted}
            onChange={handleCheckboxChange} // Handle checkbox change
            className="mr-2 cursor-pointer"
          />
          <span
            className={task.isCompleted ? "line-through text-gray-400" : ""}
          >
            {task.title}
          </span>
          <div className="text-sm text-gray-500 mt-1">
            Due: {task.dueDate?.split("T")[0]} | Category: {task.category} | Priority:{" "}
            {task.priority === 0
              ? "Low"
              : task.priority === 1
              ? "Normal"
              : task.priority === 2
              ? "High"
              : "Unknown"}
          </div>
        </div>
        <div className="text-sm space-x-2">
          <Link href={`/show-task/${task.id}`}>
            <button className="text-blue-400 underline text-sm cursor-pointer">
              Show More
            </button>
          </Link>

          <Link href={`/edit-task/${task.id}`} className="text-yellow-600">
            Edit
          </Link>

          <button
            onClick={async () => {
              try {
                await axios.delete(
                  `http://localhost:5025/api/TodoItems/${task.id}`
                );
                refetch();
              } catch (error) {
                console.error("Delete failed", error);
                alert("Error deleting task");
              }
            }}
            className="text-red-500 hover:text-red-700 transition-colors cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}
