import Link from "next/link";

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  isCompleted: boolean;
  priority: number;
  category: string;
  appUserId: number;
}

export default function TaskItem({ task }: { task: Task }) {
  return (
    <li className="border p-4 rounded shadow">
      <div className="flex justify-between items-start">
        <div>
          <input
            type="checkbox"
            checked={task.isCompleted}
            readOnly
            className="mr-2"
          />
          <span
            className={task.isCompleted ? "line-through text-gray-400" : ""}
          >
            {task.title}
          </span>
          <div className="text-sm text-gray-500 mt-1">
            Due: {task.dueDate?.split("T")[0]} | Category: {task.category} |
            Priority: {task.priority}
          </div>
        </div>
        <div className="text-sm space-x-2">
          <Link href={`/show-task/${task.id}`}>
            <button className="text-blue-400 underline text-sm cursor-pointer">
              Show More
            </button>
          </Link>

          <button
            onClick={() => alert("Edit not implemented")}
            className="text-yellow-600"
          >
            Edit
          </button>
          <button
            onClick={() => alert("Delete not implemented")}
            className="text-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}
