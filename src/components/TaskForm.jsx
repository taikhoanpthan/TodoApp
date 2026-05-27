import { useState } from "react";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";

export default function TaskForm({
  onAdd,
}) {
  const [creator, setCreator] =
    useState("");

  const [task, setTask] =
    useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!creator || !task)
      return;

    onAdd({
      creator,
      task,
      createdAt:
        new Date().toISOString(),
      completed: false,
    });

    setCreator("");
    setTask("");
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl shadow-lg p-4 mx-4 mt-4 space-y-4"
    >
      <div>
        <label className="text-sm font-semibold text-gray-500">
          Người tạo
        </label>

        <input
          type="text"
          placeholder="Ví dụ: Nguyễn Văn A..."
          className="w-full mt-2 border border-gray-200 p-3 rounded-2xl outline-none focus:border-blue-500"
          value={creator}
          onChange={(e) =>
            setCreator(
              e.target.value
            )
          }
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-gray-500">
          Công việc
        </label>

        <textarea
          placeholder="Nhập nội dung công việc..."
          className="w-full mt-2 border border-gray-200 p-3 rounded-2xl outline-none focus:border-blue-500 min-h-[120px]"
          value={task}
          onChange={(e) =>
            setTask(e.target.value)
          }
        />
      </div>

      <button className="w-full bg-blue-500 hover:bg-blue-600 transition text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2">
        <FaPlus />
        Tạo công việc
      </button>
    </motion.form>
  );
}