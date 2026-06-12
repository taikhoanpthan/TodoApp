import TaskCard from "./TaskCard";
import EmptyState from "../common/EmptyState";

export default function TaskList({
  tasks,
  onDelete,
  onToggle,
  onEdit,
}) {
  if (!tasks.length) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}