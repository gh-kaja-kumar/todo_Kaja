
import { useState, useEffect } from 'react';
import axios from '../../axiosConfig';
import { Task } from './types'; // adjust path as needed

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]); // ✅ Correctly typed array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      const response = await axios.get<Task[]>('http://localhost:5025/api/TodoItems');
      setTasks(response.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return { tasks, loading, error, refetch: fetchTasks };
};

export default useTasks;
