import { useState } from "react";

import Header from "../components/layout/Header";
import Dashboard from "../components/layout/Dashboard";

import TaskForm from "../components/task/TaskForm";
import FilterBar from "../components/task/FilterBar";
import TaskList from "../components/task/TaskList";

import Intro from "../components/common/Intro";
import EmptyState from "../components/common/EmptyState";

import useTasks from "../hooks/useTasks";

import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";

import {
  createTask,
  deleteTask,
  updateTask,
} from "../services/api";

export default function HomePage() {
  const { tasks, setTasks, loading } =
    useTasks();

  const [filter, setFilter] =
    useState("pending");

  const [showIntro, setShowIntro] =
    useState(true);

  const [showAll, setShowAll] =
    useState(false);

  // =====================
  // ADD TASK
  // =====================

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

  // =====================
  // DELETE TASK
  // =====================

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

  // =====================
  // TOGGLE TASK
  // =====================

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

  // =====================
  // EDIT TASK
  // =====================

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

  // =====================
  // FILTER
  // =====================

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

  // =====================
  // SHOW MORE
  // =====================

  const visibleTasks =
    showAll
      ? filteredTasks
      : filteredTasks.slice(
          0,
          5
        );

  // =====================
  // STATS
  // =====================

  const completedCount =
    tasks.filter(
      (task) =>
        task.completed
    ).length;

  const pendingCount =
    tasks.filter(
      (task) =>
        !task.completed
    ).length;

  // =====================
  // INTRO
  // =====================

  if (showIntro) {
    return (
      <Intro
        onFinish={() =>
          setShowIntro(false)
        }
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 pb-24">
      <Toaster
        position="top-center"
        reverseOrder={false}
      />

      <Header
        totalTasks={tasks.length}
      />

      <Dashboard
        total={tasks.length}
        completed={
          completedCount
        }
        pending={pendingCount}
      />

      <TaskForm
        onAdd={handleAdd}
      />

      <FilterBar
        filter={filter}
        setFilter={setFilter}
      />

      <div className="px-4 mt-4">
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
            <TaskList
              tasks={visibleTasks}
              onDelete={
                handleDelete
              }
              onToggle={
                handleToggle
              }
              onEdit={handleEdit}
            />

            {filteredTasks.length >
              5 && (
              <button
                onClick={() =>
                  setShowAll(
                    !showAll
                  )
                }
                className="
                  w-full
                  mt-4
                  py-4
                  rounded-2xl
                  bg-white
                  border
                  border-gray-200
                  shadow-sm
                  text-gray-700
                  font-semibold
                  hover:bg-gray-50
                  transition-all
                "
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