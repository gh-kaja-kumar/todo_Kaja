import React from 'react';
import TaskItem from './TaskItem';
import { Task } from '../hooks/types'; // Adjust the path to your types file

interface TaskListProps {
  tasks: Task[];
  refetch: () => void; // Function to refetch tasks
}

const TaskList: React.FC<TaskListProps> = ({ tasks, refetch }) => {
  if (!tasks.length) return <p>No tasks found.</p>;

  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} refetch={refetch} />
      ))}
    </ul>
  );
};

export default TaskList;
