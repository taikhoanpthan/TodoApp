import { motion, AnimatePresence } from "framer-motion";
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
    /* SỬA CHÍNH: Thêm AnimatePresence bọc ngoài để tạo hiệu ứng chuyển cảnh 
       cho danh sách khi Thêm/Xóa/Sửa tác vụ chuẩn game MMO.
    */
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: -50, transition: { duration: 0.2 } }}
            layout
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
              mass: 1,
            }}
          >
            <TaskCard
              task={task}
              onDelete={onDelete}
              onToggle={onToggle}
              onEdit={onEdit}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}