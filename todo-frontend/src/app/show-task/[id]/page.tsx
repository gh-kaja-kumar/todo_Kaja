'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

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

export default function TaskDetailsPage() {
  const { id } = useParams();
  const [task, setTask] = useState<Task | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:5025/api/TodoItems/${id}`);
        setTask(response.data);
      } catch (err) {
        setError('Failed to load task.');
        console.error(err);
      }
    };

    if (id) fetchTask();
  }, [id]);

  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  if (!task) return <div className="text-white text-center p-4">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg mt-6">
      <h1 className="text-3xl font-bold mb-4">{task.title}</h1>

      <div className="space-y-3">
        <p><span className="font-semibold">Description:</span> {task.description || 'No description provided.'}</p>
        <p><span className="font-semibold">Due Date:</span> {new Date(task.dueDate).toLocaleString()}</p>
        <p><span className="font-semibold">Priority:</span> {['Low', 'Medium', 'High'][task.priority]}</p>
        <p><span className="font-semibold">Category:</span> {task.category}</p>
        <p><span className="font-semibold">Status:</span> 
          <span className={`ml-2 px-2 py-1 rounded text-sm ${task.isCompleted ? 'bg-green-600' : 'bg-yellow-600'}`}>
            {task.isCompleted ? 'Completed' : 'Incomplete'}
          </span>
        </p>
      </div>
    </div>
  );
}
