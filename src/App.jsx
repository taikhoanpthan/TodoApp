// App.jsx

import { useEffect, useState } from "react";

import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskCard from "./components/TaskCard";
import FilterBar from "./components/FilterBar";
import EmptyState from "./components/EmptyState";
import Intro from "./components/Intro";

import Swal from "sweetalert2";

import {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} from "./services/api";

import toast, {
  Toaster,
} from "react-hot-toast";

import { motion } from "framer-motion";

export default function App() {
  // =========================
  // STATES
  // =========================

  const [tasks, setTasks] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  // mặc định hiện chưa làm

  const [filter, setFilter] =
    useState("pending");

  // intro

  const [showIntro, setShowIntro] =
    useState(true);

  // thu gọn

  const [showAll, setShowAll] =
    useState(false);

  // =========================
  // FETCH TASKS
  // =========================

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const data =
        await getTasks();

      const formattedData =
        data.map((item, index) => ({
          ...item,
          id:
            item.id ||
            `task-${index}`,
        }));

      setTasks(
        formattedData.reverse()
      );
    } catch (error) {
      console.log(error);

      toast.error(
        "Không tải được dữ liệu"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // =========================
  // ADD TASK
  // =========================

  const handleAdd = async (
    newTask
  ) => {
    try {
      const createdTask =
        await createTask({
          creator:
            newTask.creator,
          task: newTask.task,
          completed: false,
          createdAt:
            new Date().toISOString(),
        });

      setTasks((prev) => [
        createdTask,
        ...prev,
      ]);

      toast.success(
        "Tạo công việc thành công"
      );
    } catch (error) {
      console.log(error);

      toast.error(
        "Có lỗi xảy ra"
      );
    }
  };

  // =========================
  // DELETE TASK
  // =========================

  const handleDelete = async (
    id
  ) => {
    try {
      const result =
        await Swal.fire({
          title:
            "Xác nhận xóa",

          text: "Nhập mật khẩu để xóa",

          input: "password",

          inputPlaceholder:
            "Nhập mật khẩu...",

          confirmButtonText:
            "Xóa",

          cancelButtonText:
            "Hủy",

          showCancelButton: true,

          confirmButtonColor:
            "#ef4444",

          cancelButtonColor:
            "#9ca3af",
        });

      if (!result.isConfirmed)
        return;

      if (
        result.value !==
        "matkhau123"
      ) {
        toast.error(
          "Sai mật khẩu"
        );

        return;
      }

      await deleteTask(id);

      setTasks((prev) =>
        prev.filter(
          (task) =>
            task.id !== id
        )
      );

      toast.success(
        "Đã xóa công việc"
      );
    } catch (error) {
      console.log(error);

      toast.error(
        "Xóa thất bại"
      );
    }
  };

  // =========================
  // TOGGLE COMPLETE
  // =========================

  const handleToggle =
    async (task) => {
      try {
        const updatedTask = {
          ...task,
          completed:
            !task.completed,
        };

        await updateTask(
          task.id,
          updatedTask
        );

        setTasks((prev) =>
          prev.map((item) =>
            item.id === task.id
              ? updatedTask
              : item
          )
        );

        toast.success(
          updatedTask.completed
            ? "Đã hoàn thành"
            : "Đã hoàn tác"
        );
      } catch (error) {
        console.log(error);

        toast.error(
          "Cập nhật thất bại"
        );
      }
    };

  // =========================
  // EDIT TASK
  // =========================

  const handleEdit =
    async (task, data) => {
      try {
        const updatedTask = {
          ...task,
          creator:
            data.creator,
          task: data.task,
        };

        await updateTask(
          task.id,
          updatedTask
        );

        setTasks((prev) =>
          prev.map((item) =>
            item.id === task.id
              ? updatedTask
              : item
          )
        );

        toast.success(
          "Đã cập nhật công việc"
        );
      } catch (error) {
        console.log(error);

        toast.error(
          "Cập nhật thất bại"
        );
      }
    };

  // =========================
  // FILTER TASKS
  // =========================

  const filteredTasks =
    filter === "completed"
      ? tasks.filter(
          (task) =>
            task.completed
        )
      : filter === "pending"
      ? tasks.filter(
          (task) =>
            !task.completed
        )
      : tasks;

  // =========================
  // LIMIT TASKS
  // =========================

  const visibleTasks =
    showAll
      ? filteredTasks
      : filteredTasks.slice(0, 5);

  // =========================
  // STATS
  // =========================

  const completedCount =
    tasks.filter(
      (task) => task.completed
    ).length;

  const pendingCount =
    tasks.filter(
      (task) =>
        !task.completed
    ).length;

  // =========================
  // INTRO
  // =========================

  if (showIntro) {
    return (
      <Intro
        onFinish={() =>
          setShowIntro(false)
        }
      />
    );
  }

  // =========================
  // UI
  // =========================

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 pb-24">
      
      {/* TOASTER FIX IOS */}

      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={12}
        containerStyle={{
          top: "calc(env(safe-area-inset-top) + 10px)",
          left: 16,
          right: 16,
        }}
        toastOptions={{
          duration: 2200,

          style: {
            borderRadius: "22px",
            background:
              "rgba(255,255,255,0.9)",
            color: "#111827",
            backdropFilter:
              "blur(16px)",
            WebkitBackdropFilter:
              "blur(16px)",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.08)",
            padding:
              "14px 18px",
            fontSize: "14px",
            fontWeight: 600,
          },

          success: {
            iconTheme: {
              primary: "#22c55e",
              secondary: "#fff",
            },
          },

          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />

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

          <div className="bg-white rounded-3xl p-4 shadow-md">
            <p className="text-xs text-gray-400 font-medium">
              Tổng việc
            </p>

            <h2 className="text-3xl font-bold text-gray-800 mt-2">
              {tasks.length}
            </h2>
          </div>

          <div className="bg-green-500 rounded-3xl p-4 shadow-md text-white">
            <p className="text-xs opacity-80">
              Hoàn thành
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {completedCount}
            </h2>
          </div>

          <div className="bg-orange-400 rounded-3xl p-4 shadow-md text-white">
            <p className="text-xs opacity-80">
              Chưa xong
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {pendingCount}
            </h2>
          </div>

        </div>
      </motion.div>

      {/* FORM */}

      <TaskForm onAdd={handleAdd} />

      {/* FILTER */}

      <FilterBar
        filter={filter}
        setFilter={setFilter}
      />

      {/* TASK LIST */}

      <div className="px-4 mt-4 space-y-4">

        {loading ? (
          <div className="flex flex-col items-center justify-center mt-24">

            <div className="w-10 h-10 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />

            <p className="mt-4 text-gray-400 text-sm">
              Đang tải dữ liệu...
            </p>

          </div>
        ) : filteredTasks.length ===
          0 ? (
          <EmptyState />
        ) : (
          <>
            {visibleTasks.map(
              (
                task,
                index
              ) => (
                <TaskCard
                  key={
                    task.id ||
                    `task-${index}`
                  }
                  task={task}
                  onDelete={
                    handleDelete
                  }
                  onToggle={
                    handleToggle
                  }
                  onEdit={
                    handleEdit
                  }
                />
              )
            )}

            {/* SHOW MORE */}

            {filteredTasks.length >
              5 && (
              <button
                onClick={() =>
                  setShowAll(
                    !showAll
                  )
                }
                className="w-full py-4 rounded-2xl bg-white border border-gray-200 shadow-sm text-gray-700 font-semibold hover:bg-gray-50 transition-all"
              >
                {showAll
                  ? "Thu gọn"
                  : `Xem thêm ${
                      filteredTasks.length -
                      5
                    } công việc`}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
