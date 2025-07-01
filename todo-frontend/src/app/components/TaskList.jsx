import TaskItem from './TaskItem';

export default function TaskList({ tasks }) {
  if (!tasks.length) return <p>No tasks found.</p>;

  return (
    <ul className="space-y-4">
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}
