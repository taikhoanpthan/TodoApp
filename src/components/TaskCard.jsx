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
          border-radius:32px;
          background:white;
          box-shadow:0 25px 60px rgba(0,0,0,0.15);
          text-align:left;

          width:100%;
          max-height:85vh;

          display:flex;
          flex-direction:column;
        ">

          <!-- BG -->

          <div style="
            position:absolute;
            top:-80px;
            right:-80px;
            width:220px;
            height:220px;
            background:#dbeafe;
            border-radius:999px;
            opacity:.5;
          "></div>

          <!-- HEADER -->

          <div style="
            position:relative;
            z-index:2;
            padding:28px;
            border-bottom:1px solid #f3f4f6;
            flex-shrink:0;
            background:white;
          ">

            <div style="
              display:flex;
              justify-content:space-between;
              align-items:flex-start;
              gap:16px;
            ">

              <div>

                <div style="
                  font-size:28px;
                  font-weight:800;
                  color:#111827;
                  line-height:1.3;
                ">
                  📋 Công việc
                </div>

                <div style="
                  margin-top:8px;
                  color:#9ca3af;
                  font-size:14px;
                  font-weight:500;
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
                  task.completed ? "#22c55e" : "#fb923c"
                };
                color:white;
                padding:10px 16px;
                border-radius:999px;
                font-size:13px;
                font-weight:700;
                white-space:nowrap;
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
            padding:28px;
            overflow-y:auto;
            flex:1;
          ">

            <!-- INFO -->

            <div style="
              display:grid;
              grid-template-columns:1fr 1fr;
              gap:14px;
              margin-bottom:22px;
            ">

              <!-- USER -->

              <div style="
                background:#f8fafc;
                border:1px solid #e5e7eb;
                border-radius:22px;
                padding:18px;
              ">

                <div style="
                  font-size:11px;
                  color:#94a3b8;
                  margin-bottom:12px;
                  font-weight:700;
                  letter-spacing:1px;
                  text-transform:uppercase;
                ">
                  Người tạo
                </div>

                <div style="
                  font-size:18px;
                  color:#111827;
                  font-weight:700;
                  line-height:1.7;
                  word-break:break-word;
                ">
                  ${task.creator}
                </div>

              </div>

              <!-- DATE -->

              <div style="
                background:#f8fafc;
                border:1px solid #e5e7eb;
                border-radius:22px;
                padding:18px;
              ">

                <div style="
                  font-size:11px;
                  color:#94a3b8;
                  margin-bottom:12px;
                  font-weight:700;
                  letter-spacing:1px;
                  text-transform:uppercase;
                ">
                  Ngày tạo
                </div>

                <div style="
                  font-size:15px;
                  color:#111827;
                  font-weight:600;
                  line-height:1.8;
                  word-break:break-word;
                ">
                  ${new Date(
                    task.createdAt
                  ).toLocaleString("vi-VN")}
                </div>

              </div>

            </div>

            <!-- TASK -->

            <div style="
              background:white;
              border:1px solid #e5e7eb;
              border-radius:24px;
              padding:22px;
              box-shadow:0 10px 30px rgba(0,0,0,.04);
            ">

              <div style="
                font-size:11px;
                color:#94a3b8;
                margin-bottom:14px;
                font-weight:700;
                letter-spacing:1px;
                text-transform:uppercase;
              ">
                Nội dung công việc
              </div>

              <textarea
                readonly
                style="
                  width:100%;
                  min-height:220px;
                  border:none;
                  outline:none;
                  resize:none;
                  border-radius:20px;
                  background:#f8fafc;
                  border:1px solid #e5e7eb;
                  padding:18px;
                  font-size:16px;
                  line-height:1.7;
                  color:#111827;
                  box-sizing:border-box;
                  font-family:inherit;
                  overflow-y:auto;
                "
              >${task.task}</textarea>

            </div>

          </div>

          <!-- FOOTER -->

          <div style="
            position:relative;
            z-index:2;
            padding:24px 28px 28px;
            background:white;
            border-top:1px solid #f3f4f6;
            flex-shrink:0;
          ">

            <button
              id="closeTaskDetail"
              style="
                width:100%;
                border:none;
                padding:16px;
                border-radius:22px;
                background:linear-gradient(
                  135deg,
                  #3b82f6,
                  #6366f1
                );
                color:white;
                font-size:16px;
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
          .getElementById("closeTaskDetail")
          ?.addEventListener("click", () => {
            Swal.close();
          });
      },
    });
  };

  // =========================
  // EDIT TASK
  // =========================

  const handleEditTask = async () => {
    const result = await Swal.fire({
      width: 560,

      showConfirmButton: false,

      background: "transparent",

      padding: 12,

      scrollbarPadding: false,

      html: `
        <div style="
          position:relative;
          overflow:hidden;
          border-radius:32px;
          background:white;
          text-align:left;
          box-shadow:0 25px 60px rgba(0,0,0,.15);

          width:100%;
          max-height:85vh;

          display:flex;
          flex-direction:column;
        ">

          <!-- BG -->

          <div style="
            position:absolute;
            top:-80px;
            right:-80px;
            width:220px;
            height:220px;
            background:#dbeafe;
            border-radius:999px;
            opacity:.5;
          "></div>

          <!-- HEADER -->

          <div style="
            position:relative;
            z-index:2;
            padding:28px;
            border-bottom:1px solid #f3f4f6;
            flex-shrink:0;
            background:white;
          ">

            <div style="
              font-size:28px;
              font-weight:800;
              color:#111827;
            ">
              ✏️ Chỉnh sửa
            </div>

            <div style="
              margin-top:8px;
              color:#94a3b8;
              font-size:14px;
              line-height:1.7;
            ">
              Cập nhật lại nội dung công việc
            </div>

          </div>

          <!-- BODY -->

          <div style="
            position:relative;
            z-index:2;
            padding:28px;
            overflow-y:auto;
            flex:1;
          ">

            <!-- CREATOR -->

            <div style="
              margin-bottom:18px;
            ">

              <div style="
                font-size:11px;
                color:#94a3b8;
                margin-bottom:10px;
                font-weight:700;
                letter-spacing:1px;
                text-transform:uppercase;
              ">
                Người tạo
              </div>

              <input
                id="creator"
                value="${task.creator}"
                placeholder="Nhập tên người tạo..."
                style="
                  width:100%;
                  height:58px;
                  border:none;
                  outline:none;
                  border-radius:20px;
                  background:#f8fafc;
                  border:1px solid #e5e7eb;
                  padding:0 18px;
                  font-size:16px;
                  color:#111827;
                  box-sizing:border-box;
                "
              />

            </div>

            <!-- TASK -->

            <div>

              <div style="
                font-size:11px;
                color:#94a3b8;
                margin-bottom:10px;
                font-weight:700;
                letter-spacing:1px;
                text-transform:uppercase;
              ">
                Nội dung công việc
              </div>

              <textarea
                id="task"
                placeholder="Nhập nội dung..."
                style="
                  width:100%;
                  min-height:220px;
                  max-height:400px;
                  border:none;
                  outline:none;
                  resize:vertical;
                  border-radius:24px;
                  background:#f8fafc;
                  border:1px solid #e5e7eb;
                  padding:18px;
                  font-size:16px;
                  line-height:1.7;
                  color:#111827;
                  box-sizing:border-box;
                  font-family:inherit;
                  overflow-y:auto;
                "
              ></textarea>

            </div>

          </div>

          <!-- FOOTER -->

          <div style="
            position:relative;
            z-index:2;
            padding:24px 28px 28px;
            background:white;
            border-top:1px solid #f3f4f6;
            flex-shrink:0;
          ">

            <div style="
              display:grid;
              grid-template-columns:1fr 1fr;
              gap:12px;
            ">

              <button
                id="cancelEdit"
                style="
                  height:56px;
                  border:none;
                  border-radius:20px;
                  background:#f3f4f6;
                  color:#374151;
                  font-size:15px;
                  font-weight:700;
                  cursor:pointer;
                "
              >
                Hủy
              </button>

              <button
                id="submitEdit"
                style="
                  height:56px;
                  border:none;
                  border-radius:20px;
                  background:linear-gradient(
                    135deg,
                    #3b82f6,
                    #6366f1
                  );
                  color:white;
                  font-size:15px;
                  font-weight:700;
                  cursor:pointer;
                  box-shadow:0 12px 30px rgba(59,130,246,.25);
                "
              >
                Lưu thay đổi
              </button>

            </div>

          </div>

        </div>
      `,

      didOpen: () => {
        const textarea =
          document.getElementById("task");

        if (textarea) {
          textarea.value = task.task || "";
        }

        document
          .getElementById("cancelEdit")
          ?.addEventListener("click", () => {
            Swal.close();
          });

        document
          .getElementById("submitEdit")
          ?.addEventListener("click", () => {
            Swal.clickConfirm();
          });
      },

      preConfirm: () => {
        const creator =
          document.getElementById("creator").value;

        const taskText =
          document.getElementById("task").value;

        if (
          !creator.trim() ||
          !taskText.trim()
        ) {
          Swal.showValidationMessage(
            "Vui lòng nhập đầy đủ thông tin"
          );

          return false;
        }

        return {
          creator,
          task: taskText,
        };
      },
    });

    if (!result.isConfirmed) return;

    onEdit(task, {
      creator: result.value.creator,
      task: result.value.task,
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
      {/* BG */}

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

        <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
          <FaClock className="text-orange-400" />

          <span>
            {task.createdAt
              ? new Date(
                  task.createdAt
                ).toLocaleDateString("vi-VN")
              : "Không có ngày"}
          </span>
        </div>
      </div>

      {/* ACTIONS */}

      <div className="relative z-10 grid grid-cols-4 gap-2 mt-5">
        {/* VIEW */}

        <button
          onClick={handleViewDetail}
          className="py-3 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center transition-all active:scale-95 shadow-md"
        >
          <FaEye />
        </button>

        {/* EDIT */}

        <button
          onClick={handleEditTask}
          className="py-3 rounded-2xl bg-yellow-500 hover:bg-yellow-600 text-white flex items-center justify-center transition-all active:scale-95 shadow-md"
        >
          <FaEdit />
        </button>

        {/* TOGGLE */}

        <button
          onClick={() => onToggle(task)}
          className={`py-3 rounded-2xl text-white flex items-center justify-center transition-all active:scale-95 shadow-md ${
            task.completed
              ? "bg-gray-400"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          <FaCheckCircle />
        </button>

        {/* DELETE */}

        <button
          onClick={() => onDelete(task.id)}
          className="py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-all active:scale-95 shadow-md"
        >
          <FaTrash />
        </button>
      </div>
    </motion.div>
  );
}