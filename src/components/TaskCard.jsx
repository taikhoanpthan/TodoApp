import {
  FaTrash,
  FaCheckCircle,
  FaClock,
  FaUser,
  FaEye,
} from "react-icons/fa";

import { motion } from "framer-motion";

import Swal from "sweetalert2";

export default function TaskCard({
  task,
  onDelete,
  onToggle,
}) {
  // VIEW DETAIL

  const handleViewDetail = () => {
    Swal.fire({
      title: `
        <div style="
          font-size:22px;
          font-weight:bold;
        ">
          Chi tiết công việc
        </div>
      `,

      html: `
        <div style="
          text-align:left;
          margin-top:20px;
          font-size:15px;
          line-height:2;
        ">

          <div style="
            background:#f3f4f6;
            padding:14px;
            border-radius:16px;
            margin-bottom:16px;
          ">
            <b>👤 Người tạo:</b><br/>
            ${task.creator}
          </div>

          <div style="
            background:#f3f4f6;
            padding:14px;
            border-radius:16px;
            margin-bottom:16px;
          ">
            <b>🕒 Ngày tạo:</b><br/>
            ${new Date(
              task.createdAt
            ).toLocaleString(
              "vi-VN"
            )}
          </div>

          <div style="
            background:#f9fafb;
            padding:16px;
            border-radius:16px;
            border:1px solid #e5e7eb;
            white-space:pre-line;
            line-height:2;
            max-height:300px;
            overflow:auto;
          ">
            ${task.task}
          </div>

        </div>
      `,

      width: 500,

      confirmButtonText:
        "Đóng",

      confirmButtonColor:
        "#3b82f6",
    });
  };

  return (
    <motion.div
      layout
      initial={{
        opacity: 0,
        y: 30,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        scale: 0.9,
      }}
      transition={{
        duration: 0.25,
      }}
      className={`relative overflow-hidden rounded-[28px] p-5 shadow-lg border ${
        task.completed
          ? "bg-green-50 border-green-200"
          : "bg-white border-gray-100"
      }`}
    >
      {/* BACKGROUND */}

      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-100 rounded-full opacity-20 pointer-events-none z-0" />

      {/* STATUS */}

      <div className="absolute top-4 right-4 z-10">
        {task.completed ? (
          <div className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow">
            Hoàn thành
          </div>
        ) : (
          <div className="bg-orange-400 text-white text-xs px-3 py-1 rounded-full font-semibold shadow">
            Đang làm
          </div>
        )}
      </div>

      {/* CONTENT */}

      <div className="relative z-10">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <FaUser className="text-blue-500" />

          <span className="font-semibold">
            {task.creator}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500 mt-3">
          <FaClock className="text-orange-400" />

          <span>
            {task.createdAt
              ? new Date(
                  task.createdAt
                ).toLocaleString(
                  "vi-VN"
                )
              : "Không có ngày"}
          </span>
        </div>
      </div>

      {/* ACTIONS */}

      <div className="relative z-10 grid grid-cols-3 gap-3 mt-5">
        {/* VIEW */}

        <button
          onClick={
            handleViewDetail
          }
          className="py-3 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md"
        >
          <FaEye />

          <span className="text-sm font-semibold">
            Xem
          </span>
        </button>

        {/* TOGGLE */}

        <button
          onClick={() =>
            onToggle(task)
          }
          className={`py-3 rounded-2xl text-white flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md ${
            task.completed
              ? "bg-gray-400"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          <FaCheckCircle />

          <span className="text-sm font-semibold">
            {task.completed
              ? "Hoàn tác"
              : "Xong"}
          </span>
        </button>

        {/* DELETE */}

        <button
          onClick={() =>
            onDelete(task.id)
          }
          className="py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md"
        >
          <FaTrash />

          <span className="text-sm font-semibold">
            Xóa
          </span>
        </button>
      </div>
    </motion.div>
  );
}