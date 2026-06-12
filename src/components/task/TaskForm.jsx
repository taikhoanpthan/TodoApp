import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaPlus,
  FaUser,
  FaClipboardList,
} from "react-icons/fa";

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
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      onSubmit={handleSubmit}
      className="
        mx-4
        mt-4
        p-5
        rounded-[28px]
        bg-white/90
        backdrop-blur-xl
        border
        border-white/50
        shadow-[0_10px_30px_rgba(0,0,0,0.08)]
      "
    >
      <h2
        className="
          text-lg
          font-bold
          text-slate-800
          mb-5
        "
      >
        Tạo công việc mới
      </h2>

      <div className="space-y-4">
        <div>
          <label
            className="
              flex
              items-center
              gap-2
              text-sm
              font-semibold
              text-slate-600
              mb-2
            "
          >
            <FaUser size={12} />
            Người tạo
          </label>

          <input
            type="text"
            placeholder="Nhập tên người tạo..."
            value={creator}
            onChange={(e) =>
              setCreator(
                e.target.value
              )
            }
            className="
              w-full
              px-4
              py-3
              rounded-2xl
              bg-slate-50
              border
              border-slate-200
              outline-none
              transition-all
              focus:border-blue-500
              focus:bg-white
              focus:ring-4
              focus:ring-blue-100
            "
          />
        </div>

        <div>
          <label
            className="
              flex
              items-center
              gap-2
              text-sm
              font-semibold
              text-slate-600
              mb-2
            "
          >
            <FaClipboardList size={12} />
            Công việc
          </label>

          <textarea
            placeholder="Mô tả công việc cần thực hiện..."
            value={task}
            onChange={(e) =>
              setTask(
                e.target.value
              )
            }
            className="
              w-full
              px-4
              py-3
              rounded-2xl
              bg-slate-50
              border
              border-slate-200
              outline-none
              resize-none
              min-h-[120px]
              transition-all
              focus:border-blue-500
              focus:bg-white
              focus:ring-4
              focus:ring-blue-100
            "
          />
        </div>

        <motion.button
          whileTap={{
            scale: 0.96,
          }}
          whileHover={{
            scale: 1.01,
          }}
          className="
            w-full
            mt-2
            py-4
            rounded-2xl
            font-bold
            text-white
            flex
            items-center
            justify-center
            gap-3
            bg-gradient-to-r
            from-blue-500
            to-indigo-600
            shadow-lg
            shadow-blue-500/30
          "
        >
          <FaPlus />
          Tạo công việc
        </motion.button>
      </div>
    </motion.form>
  );
}