'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Task } from '../hooks/types'; // Adjust if needed

const EditTask = () => {
  const router = useRouter();
  const params = useParams();
  const taskId = params.id as string; // typecast since useParams returns string | string[]

  const [task, setTask] = useState<Task | null>(null);
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);

  // Fetch task data on mount
  useEffect(() => {
    if (!taskId) return;

    fetch(`/api/tasks/${taskId}`)
      .then((res) => res.json())
      .then((data) => {
        setTask(data);
        setTitle(data.title);
        setCompleted(data.completed);
      })
      .catch((err) => console.error('Failed to fetch task:', err));
  }, [taskId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch(`/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, completed }),
    });

    router.push('/'); // Redirect to home after update
  };

  if (!task) return <p>Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Title</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
          <label>Completed</label>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Update Task
        </button>
      </form>
    </div>
  );
};

export default EditTask;
