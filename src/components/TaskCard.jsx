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
      width: 560,

      showConfirmButton: false,

      background: "transparent",

      padding: 12,

      scrollbarPadding: false,

      html: `
        <div style="
          position:relative;
          overflow:hidden;
          border-radius:34px;

          background:rgba(255,255,255,.88);

          backdrop-filter:blur(12px);
          -webkit-backdrop-filter:blur(12px);

          border:1px solid rgba(255,255,255,.6);

          box-shadow:
            0 10px 30px rgba(0,0,0,.08);

          text-align:left;
        ">

          <!-- BG -->

          <div style="
            position:absolute;
            top:-60px;
            right:-60px;
            width:180px;
            height:180px;

            background:
              radial-gradient(
                circle,
                rgba(59,130,246,.18),
                transparent 70%
              );

            border-radius:999px;
          "></div>

          <!-- HEADER -->

          <div style="
            position:relative;
            z-index:2;

            padding:28px;

            border-bottom:
              1px solid rgba(255,255,255,.55);
          ">

            <div style="
              display:flex;
              justify-content:space-between;
              align-items:center;
              gap:14px;
            ">

              <div>

                <div style="
                  font-size:30px;
                  font-weight:800;
                  color:#111827;
                  letter-spacing:-1px;
                ">
                  Công việc
                </div>

                <div style="
                  margin-top:8px;
                  color:#6b7280;
                  font-size:14px;
                  font-style:italic;
                ">
                  ${
                    task.completed
                      ? "Đã hoàn thành"
                      : "Đang thực hiện"
                  }
                </div>

              </div>

              <div style="
                background:${
                  task.completed
                    ? "linear-gradient(135deg,#22c55e,#16a34a)"
                    : "linear-gradient(135deg,#fb923c,#f97316)"
                };

                color:white;

                padding:10px 16px;

                border-radius:999px;

                font-size:12px;
                font-weight:700;
              ">
                ${
                  task.completed
                    ? "Hoàn thành"
                    : "Đang làm"
                }
              </div>

            </div>

          </div>

          <!-- BODY -->

          <div style="
            position:relative;
            z-index:2;

            padding:24px;
          ">

            <!-- INFO -->

            <div style="
              display:grid;
              grid-template-columns:1fr 1fr;
              gap:12px;
              margin-bottom:18px;
            ">

              <div style="
                background:rgba(248,250,252,.9);

                border-radius:24px;

                padding:18px;
              ">

                <div style="
                  font-size:11px;
                  color:#94a3b8;

                  margin-bottom:8px;

                  font-weight:700;

                  text-transform:uppercase;
                ">
                  Người tạo
                </div>

                <div style="
                  font-size:17px;
                  color:#111827;

                  font-weight:700;

                  word-break:break-word;
                ">
                  ${task.creator}
                </div>

              </div>

              <div style="
                background:rgba(248,250,252,.9);

                border-radius:24px;

                padding:18px;
              ">

                <div style="
                  font-size:11px;
                  color:#94a3b8;

                  margin-bottom:8px;

                  font-weight:700;

                  text-transform:uppercase;
                ">
                  Ngày tạo
                </div>

                <div style="
                  font-size:14px;
                  color:#111827;

                  font-weight:600;

                  line-height:1.7;
                ">
                  ${new Date(
                    task.createdAt
                  ).toLocaleString("vi-VN")}
                </div>

              </div>

            </div>

            <!-- TASK -->

            <div style="
              background:rgba(248,250,252,.9);

              border-radius:28px;

              padding:22px;
            ">

              <div style="
                font-size:11px;
                color:#94a3b8;

                margin-bottom:12px;

                font-weight:700;

                text-transform:uppercase;
              ">
                Nội dung công việc
              </div>

              <div style="
                font-size:15px;

                line-height:1.9;

                color:#111827;

                white-space:pre-wrap;

                word-break:break-word;
              ">
                ${task.task}
              </div>

            </div>

          </div>

          <!-- FOOTER -->

          <div style="
            padding:22px 24px 24px;

            border-top:
              1px solid rgba(255,255,255,.55);
          ">

            <button
              id="closeTaskDetail"
              style="
                width:100%;
                height:56px;

                border:none;

                border-radius:24px;

                background:
                  linear-gradient(
                    135deg,
                    #3b82f6,
                    #6366f1
                  );

                color:white;

                font-size:15px;

                font-weight:700;

                cursor:pointer;
              "
            >
              Đóng
            </button>

          </div>

        </div>
      `,

      didOpen: () => {
        document
          .getElementById(
            "closeTaskDetail"
          )
          ?.addEventListener(
            "click",
            () => {
              Swal.close();
            }
          );
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
            "Chỉnh sửa công việc",

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

          background:
            "rgba(255,255,255,.95)",

          customClass: {
            popup:
              "rounded-[32px]",
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
        y: 20,
        scale: 0.98,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        scale: 0.96,
      }}
      transition={{
        duration: 0.25,
      }}
      whileTap={{
        scale: 0.985,
      }}
      className={`
        relative
        overflow-hidden
        rounded-[32px]
        p-5

        border

        transition-all
        duration-300

        ${
          task.completed
            ? `
              bg-green-50/90
              border-green-100
            `
            : `
              bg-white/90
              border-white/70
            `
        }
      `}
      style={{
        backdropFilter:
          "blur(10px)",
        WebkitBackdropFilter:
          "blur(10px)",

        boxShadow:
          "0 8px 24px rgba(0,0,0,.06)",

        transform:
          "translateZ(0)",

        WebkitTapHighlightColor:
          "transparent",
      }}
    >
      {/* LIGHT */}

      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/20 rounded-full pointer-events-none" />

      {/* STATUS */}

      <div className="absolute top-4 right-4 z-10">
        {task.completed ? (
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
            Hoàn thành
          </div>
        ) : (
          <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
            Đang làm
          </div>
        )}
      </div>

      {/* CONTENT */}

      <div className="relative z-10">
        
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <FaUser className="text-blue-500" />

          <span className="font-semibold italic">
            {task.creator}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
          <FaClock className="text-orange-400" />

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

        <div
          className={`
            mt-4
            text-[15px]
            leading-8
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

      </div>

      {/* ACTIONS */}

      <div className="relative z-10 grid grid-cols-4 gap-2 mt-5">

        {/* VIEW */}

        <button
          onClick={
            handleViewDetail
          }
          className="
            h-12
            rounded-2xl

            bg-gradient-to-r
            from-blue-500
            to-indigo-500

            text-white

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
            h-12
            rounded-2xl

            bg-gradient-to-r
            from-yellow-400
            to-orange-400

            text-white

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
            h-12
            rounded-2xl

            text-white

            flex
            items-center
            justify-center

            active:scale-95

            transition-transform

            ${
              task.completed
                ? `
                  bg-gradient-to-r
                  from-gray-400
                  to-gray-500
                `
                : `
                  bg-gradient-to-r
                  from-green-500
                  to-emerald-500
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
            h-12
            rounded-2xl

            bg-gradient-to-r
            from-red-500
            to-pink-500

            text-white

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
