import { useState } from "react";

import Header from "../components/layout/Header";
import Dashboard from "../components/layout/Dashboard";

import TaskForm from "../components/task/TaskForm";
import FilterBar from "../components/task/FilterBar";
import TaskList from "../components/task/TaskList";

import Intro from "../components/common/Intro";
import EmptyState from "../components/common/EmptyState";

import useTasks from "../hooks/useTasks";
import { useTheme } from "../components/context/ThemeContext";

import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";

import {
  createTask,
  deleteTask,
  updateTask,
} from "../services/api";

export default function HomePage() {
  const { tasks, setTasks, loading } = useTasks();
  const { dark } = useTheme();
  const [filter, setFilter] = useState("pending");
  const [showIntro, setShowIntro] = useState(true);
  const [showAll, setShowAll] = useState(false);

  // =====================
  // ADD TASK
  // =====================
  const handleAdd = async (newTask) => {
    try {
      const createdTask = await createTask({
        creator: newTask.creator,
        task: newTask.task,
        completed: false,
        createdAt: new Date().toISOString(),
      });

      setTasks((prev) => [createdTask, ...prev]);
      toast.success("Tạo công việc thành công");
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra");
    }
  };

  // =====================
  // DELETE TASK
  // =====================
  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Xác nhận xóa",
        text: "Nhập mật khẩu để xóa",
        input: "password",
        inputPlaceholder: "Nhập mật khẩu...",
        confirmButtonText: "Xóa",
        cancelButtonText: "Hủy",
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        cancelButtonColor: "#9ca3af",
      });

      if (!result.isConfirmed) return;

      if (result.value !== "matkhau123") {
        toast.error("Sai mật khẩu");
        return;
      }

      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
      toast.success("Đã xóa công việc");
    } catch (error) {
      console.log(error);
      toast.error("Xóa thất bại");
    }
  };

  // =====================
  // TOGGLE TASK
  // =====================
  const handleToggle = async (task) => {
    try {
      const updatedTask = {
        ...task,
        completed: !task.completed,
      };

      await updateTask(task.id, updatedTask);
      setTasks((prev) =>
        prev.map((item) => (item.id === task.id ? updatedTask : item))
      );

      toast.success(updatedTask.completed ? "Đã hoàn thành" : "Đã hoàn tác");
    } catch (error) {
      console.log(error);
      toast.error("Cập nhật thất bại");
    }
  };

  // =====================
  // EDIT TASK
  // =====================
  const handleEdit = async (task, data) => {
    try {
      const updatedTask = {
        ...task,
        creator: data.creator,
        task: data.task,
      };

      await updateTask(task.id, updatedTask);
      setTasks((prev) =>
        prev.map((item) => (item.id === task.id ? updatedTask : item))
      );

      toast.success("Đã cập nhật công việc");
    } catch (error) {
      console.log(error);
      toast.error("Cập nhật thất bại");
    }
  };

  // =====================
  // FILTER
  // =====================
  const filteredTasks =
    filter === "completed"
      ? tasks.filter((task) => task.completed)
      : filter === "pending"
      ? tasks.filter((task) => !task.completed)
      : tasks;

  // =====================
  // SHOW MORE
  // =====================
  const visibleTasks = showAll ? filteredTasks : filteredTasks.slice(0, 5);

  // =====================
  // STATS
  // =====================
  const completedCount = tasks.filter((task) => task.completed).length;
  const pendingCount = tasks.filter((task) => !task.completed).length;

  if (showIntro) {
    return <Intro onFinish={() => setShowIntro(false)} />;
  }

  return (
    /* SỬA CHÍNH TẠI ĐÂY:
       - Light Mode: bg-gradient từ xám sang xám đậm nhạt truyền thống.
       - Dark Mode (Style MMO/Neon): Đổi thành nền tối huyền bí (zinc-950), chuyển màu mượt mà (transition-colors).
    */
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200 pb-24 transition-colors duration-500 dark:from-zinc-950 dark:via-zinc-950 dark:to-slate-900">
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: dark ? "#18181b" : "#ffffff",
            color: dark ? "#f4f4f5" : "#172033",
            border: dark ? "1px solid #3f3f46" : "1px solid #e2e8f0",
          },
        }}
      />

      <Header totalTasks={tasks.length} />

      <Dashboard
        total={tasks.length}
        completed={completedCount}
        pending={pendingCount}
      />

      <TaskForm onAdd={handleAdd} />

      <FilterBar filter={filter} setFilter={setFilter} />

      <div className="px-4 mt-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center mt-24">
            {/* Vòng xoay Loading đổi thành màu xanh Cyan Neon phát sáng rực rỡ ở Dark Mode */}
            <div className="w-10 h-10 rounded-full border-4 border-blue-500 border-t-transparent dark:border-cyan-400 dark:border-t-transparent animate-spin [box-shadow:0_0_15px_rgba(34,211,238,0.5)]" />

            <p className="mt-4 text-gray-400 dark:text-cyan-400/80 text-sm font-medium tracking-wide">
              Đang tải dữ liệu hệ thống...
            </p>
          </div>
        ) : filteredTasks.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <TaskList
              tasks={visibleTasks}
              onDelete={handleDelete}
              onToggle={handleToggle}
              onEdit={handleEdit}
            />

            {filteredTasks.length > 5 && (
              /* SỬA CHÍNH NÚT XEM THÊM:
                 - Ở Dark Mode, biến thành nút viền Neon Cyberpunk cực ngầu.
                 - Hiệu ứng phát sáng bóng mờ [box-shadow] tăng thẩm mỹ MMO.
              */
              <button
                onClick={() => setShowAll(!showAll)}
                className="w-full mt-4 py-4 rounded-2xl bg-white text-slate-700 font-semibold border border-slate-200 hover:bg-slate-50 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800 transition-all duration-300"
              >
                {showAll
                  ? "Thu gọn bảng"
                  : `Xem thêm ${filteredTasks.length - 5} công việc`}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
