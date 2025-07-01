"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Task } from "../../hooks/types"; // Adjust path if needed

const EditTask = () => {
  const router = useRouter();
  const params = useParams();
  const taskId = params?.id as string;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState(0);
  const [category, setCategory] = useState("Personal");
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!taskId) return;

    const fetchTask = async () => {
      try {
        const token =
          typeof window !== "undefined" ? localStorage.getItem("token") : null;

        const res = await fetch(
          `http://localhost:5025/api/TodoItems/${taskId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) throw new Error("Task not found");

        const data: Task = await res.json();
        setTitle(data.title);
        setDescription(data.description || "");
        setDueDate(data.dueDate); // Keep the full datetime value
        setPriority(data.priority);
        setCategory(data.category || "Personal");
        setCompleted(data.isCompleted);
      } catch (err: any) {
        console.error(err);
        setError("Failed to load task.");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    try {
      const res = await fetch(`http://localhost:5025/api/TodoItems/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
        body: JSON.stringify({
          id: taskId,
          title,
          description,
          dueDate,
          priority,
          category,
          isCompleted: completed,
        }),
      });

      if (!res.ok) throw new Error("Update failed");
      router.push("/");
    } catch (err) {
      console.error("Failed to update task:", err);
      alert("Failed to update task");
    }
  };

  if (loading)
    return <p className="text-white text-center mt-10">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="max-w-xl mx-auto mt-12 px-6 py-8 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-8 text-center">Edit Task</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Due Date</label>
          <input
            type="datetime-local"
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Priority</label>
          <select
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={priority}
            onChange={(e) => setPriority(Number(e.target.value))}
          >
            <option value={0}>Low</option>
            <option value={1}>Medium</option>
            <option value={2}>High</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Personal</option>
            <option>Work</option>
            <option>Health</option>
            <option>Study</option>
            <option>Other</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className="accent-blue-500"
          />
          <label className="text-sm font-medium">Completed</label>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition cursor-pointer"
        >
          Update Task
        </button>
      </form>
    </div>
  );
};

export default EditTask;
