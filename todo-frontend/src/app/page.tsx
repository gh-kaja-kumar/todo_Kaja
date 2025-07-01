"use client";
import { useState } from "react";
import useTasks from "./hooks/useTasks";
import TaskList from "./components/TaskList";
import FilterBar, { FilterOptions } from "./components/FilterBar";
import Link from "next/link";

export default function Home() {
  const { tasks, loading, error, refetch } = useTasks();
  const [filter, setFilter] = useState<FilterOptions>({
    status: "",
    category: "",
    priority: "",
  });

  const filteredTasks = tasks.filter((task) => {
    const statusMatch =
      filter.status === "" ||
      (filter.status === "completed" && task.isCompleted) ||
      (filter.status === "incomplete" && !task.isCompleted);

    const categoryMatch =
      filter.category === "" || task.category === filter.category;

    const priorityMatch =
      filter.priority === "" || task.priority.toString() === filter.priority;

    return statusMatch && categoryMatch && priorityMatch;
  });

  const completedCount = filteredTasks.filter((t) => t.isCompleted).length;
  const incompleteCount = filteredTasks.length - completedCount;

  return (
    <div className="max-w-4xl mx-auto p-4 text-gray-300">
      <h1 className="text-3xl font-bold text-center mb-4">TodoList</h1>

      <div className="flex justify-between mb-4">
        <Link href="/add-task">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded shadow transition-all duration-200 cursor-pointer">
            + Add New Task
          </button>
        </Link>
        <button className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer">
          Logout
        </button>
      </div>

      <FilterBar onFilterChange={setFilter} />

      <div className="mb-4 text-sm text-gray-400">
        Completed: {completedCount} | Incomplete: {incompleteCount}
      </div>
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-300 mb-1">
          <span>Progress</span>
          <span>{Math.round((completedCount / tasks.length) * 100 || 0)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-4">
          <div
            className="bg-green-500 h-4 rounded-full transition-all duration-300"
            style={{ width: `${(completedCount / tasks.length) * 100 || 0}%` }}
          />
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && <TaskList tasks={filteredTasks} />}
    </div>
  );
}
