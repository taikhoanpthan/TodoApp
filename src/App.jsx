// App.jsx

import { useEffect, useState } from "react";

import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskCard from "./components/TaskCard";
import FilterBar from "./components/FilterBar";
import EmptyState from "./components/EmptyState";

import Swal from "sweetalert2";

import { getTasks, createTask, deleteTask, updateTask } from "./services/api";

import toast, { Toaster } from "react-hot-toast";

import { motion } from "framer-motion";

export default function App() {
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(false);

  // mặc định mở tab chưa làm

  const [filter, setFilter] = useState("pending");

  // thu gọn task

  const [showAll, setShowAll] = useState(false);

  // =========================
  // FETCH TASKS
  // =========================

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const data = await getTasks();

      const formattedData = data.map((item, index) => ({
        ...item,
        id: item.id || `task-${index}`,
      }));

      setTasks(formattedData.reverse());
    } catch (error) {
      console.log(error);

      toast.error("Không tải được dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // reset showAll khi đổi filter

  useEffect(() => {
    setShowAll(false);
  }, [filter]);

  // =========================
  // ADD TASK
  // =========================

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

  // =========================
  // DELETE TASK
  // =========================

  const handleDelete = async (id) => {
    try {
      if (!id) {
        toast.error("Không tìm thấy ID");

        return;
      }

      const result = await Swal.fire({
        title: "Xác nhận xóa",
        text: "Nhập mật khẩu để xóa công việc",
        input: "password",
        inputPlaceholder: "Nhập mật khẩu...",
        confirmButtonText: "Xóa",
        cancelButtonText: "Hủy",
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        cancelButtonColor: "#9ca3af",
        background: "#fff",
        borderRadius: 24,
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

  // =========================
  // TOGGLE COMPLETE
  // =========================

  const handleToggle = async (task) => {
    try {
      const updatedTask = {
        ...task,
        completed: !task.completed,
      };

      await updateTask(task.id, updatedTask);

      setTasks((prev) =>
        prev.map((item) => (item.id === task.id ? updatedTask : item)),
      );

      toast.success(updatedTask.completed ? "Đã hoàn thành" : "Đã hoàn tác");
    } catch (error) {
      console.log(error);

      toast.error("Cập nhật thất bại");
    }
  };

  // =========================
  // EDIT TASK
  // =========================

  const handleEdit = async (oldTask, newData) => {
    try {
      const updatedTask = {
        ...oldTask,
        creator: newData.creator,
        task: newData.task,
      };

      await updateTask(oldTask.id, updatedTask);

      setTasks((prev) =>
        prev.map((item) => (item.id === oldTask.id ? updatedTask : item)),
      );

      toast.success("Cập nhật thành công");
    } catch (error) {
      console.log(error);

      toast.error("Cập nhật thất bại");
    }
  };

  // =========================
  // FILTER TASKS
  // =========================

  const filteredTasks =
    filter === "completed"
      ? tasks.filter((task) => task.completed)
      : filter === "pending"
        ? tasks.filter((task) => !task.completed)
        : tasks;

  // =========================
  // THU GỌN TASK
  // =========================

  const displayedTasks = showAll ? filteredTasks : filteredTasks.slice(0, 5);

  // =========================
  // STATS
  // =========================

  const completedCount = tasks.filter((task) => task.completed).length;

  const pendingCount = tasks.filter((task) => !task.completed).length;

  // =========================
  // UI
  // =========================

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-100 to-gray-200 pb-24">
      <Toaster position="top-center" />

      {/* HEADER */}

      <Header />

      {/* DASHBOARD */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="px-4 mt-5"
      >
        <div className="grid grid-cols-3 gap-3">
          {/* TOTAL */}

          <div className="bg-white rounded-3xl p-4 shadow-md border border-gray-100">
            <p className="text-xs text-gray-400 font-medium">Tổng việc</p>

            <h2 className="text-3xl font-bold text-gray-800 mt-2">
              {tasks.length}
            </h2>
          </div>

          {/* COMPLETED */}

          <div className="bg-green-500 rounded-3xl p-4 shadow-md text-white">
            <p className="text-xs opacity-80">Hoàn thành</p>

            <h2 className="text-3xl font-bold mt-2">{completedCount}</h2>
          </div>

          {/* PENDING */}

          <div className="bg-orange-400 rounded-3xl p-4 shadow-md text-white">
            <p className="text-xs opacity-80">Chưa xong</p>

            <h2 className="text-3xl font-bold mt-2">{pendingCount}</h2>
          </div>
        </div>
      </motion.div>

      {/* FORM */}

      <TaskForm onAdd={handleAdd} />

      {/* FILTER */}

      <div className="sticky top-0 z-20 bg-gradient-to-b from-slate-100 via-gray-100 to-transparent pt-3 pb-2">
        <FilterBar filter={filter} setFilter={setFilter} />
      </div>

      {/* TASK LIST */}

      <div className="px-4 mt-2 space-y-4">
        {loading ? (
          // LOADING

          <div className="flex flex-col items-center justify-center mt-24">
            <div className="w-10 h-10 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />

            <p className="mt-4 text-gray-400 text-sm">Đang tải dữ liệu...</p>
          </div>
        ) : filteredTasks.length === 0 ? (
          // EMPTY

          <EmptyState />
        ) : (
          <>
            {/* TASKS */}

            {displayedTasks.map((task, index) => (
              <motion.div
                key={task.id || `task-${index}`}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.05,
                }}
              >
                <TaskCard
                  task={task}
                  onDelete={handleDelete}
                  onToggle={handleToggle}
                  onEdit={handleEdit}
                />
              </motion.div>
            ))}

            {/* SHOW MORE */}

            {filteredTasks.length > 5 && (
              <div className="flex justify-center pt-2">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="px-6 py-3 rounded-2xl bg-white shadow-md border border-gray-100 text-sm font-semibold hover:scale-105 active:scale-95 transition-all duration-200"
                >
                  {showAll
                    ? "Thu gọn"
                    : `Xem thêm (${filteredTasks.length - 5})`}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
