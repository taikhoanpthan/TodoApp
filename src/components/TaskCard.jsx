import {
  FaTrash,
  FaCheckCircle,
  FaClock,
  FaUser,
  FaEye,
  FaEdit,
} from "react-icons/fa";

import { motion } from "framer-motion";
import Swal from "sweetalert2";

export default function TaskCard({
  task,
  onDelete,
  onToggle,
  onEdit,
}) {
  // =========================
  // VIEW DETAIL
  // =========================

  const handleViewDetail = () => {
    Swal.fire({
      title: "Chi tiết công việc",

      html: `
        <div style="text-align:left">

          <div style="
            background:#f8fafc;
            padding:16px;
            border-radius:20px;
            margin-bottom:14px;
          ">
            <div style="
              font-size:12px;
              color:#94a3b8;
              margin-bottom:6px;
              font-weight:700;
              text-transform:uppercase;
            ">
              Người tạo
            </div>

            <div style="
              font-size:16px;
              font-weight:600;
              color:#111827;
            ">
              ${task.creator}
            </div>
          </div>

          <div style="
            background:#f8fafc;
            padding:16px;
            border-radius:20px;
            margin-bottom:14px;
          ">
            <div style="
              font-size:12px;
              color:#94a3b8;
              margin-bottom:6px;
              font-weight:700;
              text-transform:uppercase;
            ">
              Ngày tạo
            </div>

            <div style="
              font-size:15px;
              font-weight:500;
              color:#111827;
            ">
              ${new Date(
                task.createdAt
              ).toLocaleString("vi-VN")}
            </div>
          </div>

          <div style="
            background:#f8fafc;
            padding:18px;
            border-radius:22px;
          ">
            <div style="
              font-size:12px;
              color:#94a3b8;
              margin-bottom:8px;
              font-weight:700;
              text-transform:uppercase;
            ">
              Nội dung
            </div>

            <div style="
              font-size:15px;
              line-height:1.8;
              color:#111827;
              white-space:pre-wrap;
              word-break:break-word;
            ">
              ${task.task}
            </div>
          </div>

        </div>
      `,

      confirmButtonText: "Đóng",

      confirmButtonColor:
        "#3b82f6",

      background: "#ffffff",

      customClass: {
        popup:
          "rounded-[30px]",
        confirmButton:
          "rounded-2xl",
      },
    });
  };

  // =========================
  // EDIT
  // =========================

  const handleEditTask =
    async () => {
      const result =
        await Swal.fire({
          title:
            "Chỉnh sửa",

          html: `
          <input
            id="creator"
            class="swal2-input"
            placeholder="Người tạo"
            value="${task.creator}"
          />

          <textarea
            id="task"
            class="swal2-textarea"
            placeholder="Nội dung công việc"
          >${task.task}</textarea>
        `,

          showCancelButton: true,

          confirmButtonText:
            "Lưu",

          cancelButtonText:
            "Hủy",

          confirmButtonColor:
            "#3b82f6",

          cancelButtonColor:
            "#9ca3af",

          background: "#ffffff",

          customClass: {
            popup:
              "rounded-[30px]",
          },

          preConfirm: () => {
            const creator =
              document.getElementById(
                "creator"
              ).value;

            const taskText =
              document.getElementById(
                "task"
              ).value;

            if (
              !creator.trim() ||
              !taskText.trim()
            ) {
              Swal.showValidationMessage(
                "Vui lòng nhập đầy đủ"
              );

              return false;
            }

            return {
              creator,
              task: taskText,
            };
          },
        });

      if (!result.isConfirmed)
        return;

      onEdit(task, result.value);
    };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 14,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.22,
      }}
      whileTap={{
        scale: 0.985,
      }}
      className={`
        relative
        rounded-[30px]
        p-5
        border
        overflow-hidden
        transition-all
        duration-200

        ${
          task.completed
            ? `
              bg-green-50
              border-green-100
            `
            : `
              bg-white
              border-gray-100
            `
        }
      `}
      style={{
        WebkitTapHighlightColor:
          "transparent",
        transform:
          "translateZ(0)",
      }}
    >
      {/* TOP */}

      <div className="flex items-start justify-between gap-3">
        
        <div className="flex-1 min-w-0">
          
          {/* USER */}

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FaUser className="text-blue-500 text-[13px]" />

            <span className="font-semibold truncate">
              {task.creator}
            </span>
          </div>

          {/* DATE */}

          <div className="flex items-center gap-2 text-sm text-gray-400 mt-2">
            <FaClock className="text-orange-400 text-[12px]" />

            <span>
              {task.createdAt
                ? new Date(
                    task.createdAt
                  ).toLocaleDateString(
                    "vi-VN"
                  )
                : "Không có ngày"}
            </span>
          </div>
        </div>

        {/* STATUS */}

        <div
          className={`
            px-3
            h-8
            rounded-full
            flex
            items-center
            justify-center
            text-xs
            font-semibold
            flex-shrink-0

            ${
              task.completed
                ? `
                  bg-green-500
                  text-white
                `
                : `
                  bg-orange-400
                  text-white
                `
            }
          `}
        >
          {task.completed
            ? "Done"
            : "Doing"}
        </div>
      </div>

      {/* TASK */}

      <div
        className={`
          mt-4
          text-[15px]
          leading-7
          break-words

          ${
            task.completed
              ? `
                text-gray-400
                line-through
              `
              : `
                text-gray-800
              `
          }
        `}
      >
        {task.task}
      </div>

      {/* ACTIONS */}

      <div className="grid grid-cols-4 gap-2 mt-5">

        {/* VIEW */}

        <button
          onClick={
            handleViewDetail
          }
          className="
            h-11
            rounded-2xl
            bg-blue-50
            text-blue-600

            flex
            items-center
            justify-center

            active:scale-95

            transition-transform
          "
        >
          <FaEye />
        </button>

        {/* EDIT */}

        <button
          onClick={
            handleEditTask
          }
          className="
            h-11
            rounded-2xl
            bg-orange-50
            text-orange-500

            flex
            items-center
            justify-center

            active:scale-95

            transition-transform
          "
        >
          <FaEdit />
        </button>

        {/* TOGGLE */}

        <button
          onClick={() =>
            onToggle(task)
          }
          className={`
            h-11
            rounded-2xl

            flex
            items-center
            justify-center

            active:scale-95

            transition-transform

            ${
              task.completed
                ? `
                  bg-gray-100
                  text-gray-500
                `
                : `
                  bg-green-50
                  text-green-600
                `
            }
          `}
        >
          <FaCheckCircle />
        </button>

        {/* DELETE */}

        <button
          onClick={() =>
            onDelete(task.id)
          }
          className="
            h-11
            rounded-2xl
            bg-red-50
            text-red-500

            flex
            items-center
            justify-center

            active:scale-95

            transition-transform
          "
        >
          <FaTrash />
        </button>
      </div>
    </motion.div>
  );
}
