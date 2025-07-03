"use client";

import { useState, useEffect } from "react";
import useTasks from "./hooks/useTasks";
import TaskList from "./components/TaskList";
import FilterBar, { FilterOptions } from "./components/FilterBar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export default function Home() {
  const { tasks, loading, error, refetch } = useTasks();
  const [filter, setFilter] = useState<FilterOptions>({
    status: "",
    category: "",
    priority: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    // 🔁 Redirect admin to /admin if on home page
    if (token) {
      try {
        const decoded: { [key: string]: any } = jwtDecode(token);
        const role =
          decoded[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ];
        if (role === "Admin") {
          router.replace("/admin");
        }
      } catch (err) {
        console.error("Token decode failed", err);
      }
    }
  }, []);

  // Filter logic
  const filteredTasks = tasks.filter((task) => {
    const now = new Date();
    const statusMatch =
      filter.status === "" ||
      (filter.status === "completed" && task.isCompleted) ||
      (filter.status === "incomplete" && !task.isCompleted) ||
      (filter.status === "overdue" &&
        !task.isCompleted &&
        new Date(task.dueDate) < now);

    const categoryMatch =
      filter.category === "" ||
      task.category?.toLowerCase() === filter.category.toLowerCase();

    const priorityMatch =
      filter.priority === "" || task.priority.toString() === filter.priority;

    return statusMatch && categoryMatch && priorityMatch;
  });

  // Sort by due date
  const sortedTasks = filteredTasks.sort(
    (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );

  const completedCount = filteredTasks.filter((t) => t.isCompleted).length;
  const incompleteCount = filteredTasks.length - completedCount;
  const progressPercentage =
    tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto p-4 text-gray-300">
      <h1 className="text-3xl font-bold text-center mb-4">TodoList</h1>

      <div className="flex justify-between mb-4">
        {isLoggedIn ? (
          <>
            <Link href="/add-task">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded shadow transition-all duration-200 cursor-pointer">
                + Add New Task
              </button>
            </Link>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
              onClick={() => {
                localStorage.removeItem("token");
                setIsLoggedIn(false);
                window.location.href = "/login";
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <div className="flex gap-3 ml-auto">
            <Link href="/login">
              <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded cursor-pointer">
                Login
              </button>
            </Link>
            <Link href="/signup">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded cursor-pointer">
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </div>

      {!isLoggedIn ? (
        <div className="text-center text-gray-400 mt-10">
          <FilterBar onFilterChange={setFilter} />
          <p className="text-xl font-semibold">
            Please{" "}
            <a href="/login" className="text-blue-400 underline">
              Login
            </a>{" "}
            or{" "}
            <a href="/signup" className="text-purple-400 underline">
              Sign Up
            </a>{" "}
            to view your tasks.
          </p>
        </div>
      ) : (
        <>
          <FilterBar onFilterChange={setFilter} />
          <div className="mb-4 text-sm text-gray-400">
            Completed: {completedCount} | Incomplete: {incompleteCount}
          </div>
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-300 mb-1">
              <span>Progress</span>
              <span>{progressPercentage}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4">
              <div
                className="bg-green-500 h-4 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
          {!loading && !error && (
            <TaskList tasks={sortedTasks} refetch={refetch} />
          )}
        </>
      )}
    </div>
  );
}
