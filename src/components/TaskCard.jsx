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
          border-radius:36px;

          background:rgba(255,255,255,.82);

          backdrop-filter:blur(30px);
          -webkit-backdrop-filter:blur(30px);

          box-shadow:
            0 25px 60px rgba(0,0,0,0.12),
            inset 0 1px 0 rgba(255,255,255,.7);

          text-align:left;

          width:100%;
          max-height:85vh;

          display:flex;
          flex-direction:column;

          border:1px solid rgba(255,255,255,.5);
        ">

          <!-- LIQUID BG -->

          <div style="
            position:absolute;
            top:-120px;
            right:-120px;
            width:260px;
            height:260px;

            background:
              radial-gradient(
                circle,
                rgba(59,130,246,.35),
                transparent 70%
              );

            border-radius:999px;

            filter:blur(20px);

            opacity:.8;
          "></div>

          <!-- HEADER -->

          <div style="
            position:relative;
            z-index:2;

            padding:30px;

            border-bottom:1px solid rgba(255,255,255,.45);

            flex-shrink:0;
          ">

            <div style="
              display:flex;
              justify-content:space-between;
              align-items:flex-start;
              gap:16px;
            ">

              <div>

                <div style="
                  font-size:30px;
                  font-weight:800;
                  color:#111827;
                  line-height:1.2;
                  letter-spacing:-1px;
                ">
                  Công việc
                </div>

                <div style="
                  margin-top:10px;
                  color:#6b7280;
                  font-size:14px;
                  font-weight:500;
                  font-style:italic;
                  letter-spacing:.3px;
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

                font-size:13px;
                font-weight:700;

                white-space:nowrap;

                box-shadow:
                  0 10px 25px rgba(0,0,0,.12);
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
              margin-bottom:24px;
            ">

              <!-- USER -->

              <div style="
                background:rgba(255,255,255,.55);

                backdrop-filter:blur(18px);

                border:1px solid rgba(255,255,255,.5);

                border-radius:24px;

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

                  font-style:italic;
                  letter-spacing:.3px;
                ">
                  ${task.creator}
                </div>

              </div>

              <!-- DATE -->

              <div style="
                background:rgba(255,255,255,.55);

                backdrop-filter:blur(18px);

                border:1px solid rgba(255,255,255,.5);

                border-radius:24px;

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

                  font-style:italic;
                  letter-spacing:.3px;
                ">
                  ${new Date(
                    task.createdAt
                  ).toLocaleString("vi-VN")}
                </div>

              </div>

            </div>

            <!-- TASK -->

            <div style="
              background:rgba(255,255,255,.6);

              backdrop-filter:blur(20px);

              border:1px solid rgba(255,255,255,.55);

              border-radius:28px;

              padding:22px;

              box-shadow:
                0 15px 35px rgba(0,0,0,.05);
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

                  border-radius:24px;

                  background:rgba(248,250,252,.8);

                  backdrop-filter:blur(12px);

                  border:1px solid rgba(255,255,255,.6);

                  padding:20px;

                  font-size:16px;

                  line-height:2;

                  color:#111827;

                  box-sizing:border-box;

                  overflow-y:auto;

                  font-style:italic;

                  letter-spacing:.3px;

                  font-weight:500;

                  font-family:
                    -apple-system,
                    BlinkMacSystemFont,
                    'SF Pro Display',
                    sans-serif;
                "
              >${task.task}</textarea>

            </div>

          </div>

          <!-- FOOTER -->

          <div style="
            position:relative;
            z-index:2;

            padding:24px 28px 28px;

            border-top:1px solid rgba(255,255,255,.45);

            flex-shrink:0;
          ">

            <button
              id="closeTaskDetail"
              style="
                width:100%;

                border:none;

                padding:17px;

                border-radius:24px;

                background:
                  linear-gradient(
                    135deg,
                    #3b82f6,
                    #6366f1
                  );

                color:white;

                font-size:16px;

                font-weight:700;

                cursor:pointer;

                box-shadow:
                  0 15px 35px rgba(59,130,246,.3);
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
          border-radius:36px;

          background:rgba(255,255,255,.82);

          backdrop-filter:blur(30px);
          -webkit-backdrop-filter:blur(30px);

          box-shadow:
            0 25px 60px rgba(0,0,0,.12),
            inset 0 1px 0 rgba(255,255,255,.7);

          text-align:left;

          width:100%;

          display:flex;
          flex-direction:column;

          border:1px solid rgba(255,255,255,.5);
        ">

          <div style="
            padding:30px;
            border-bottom:1px solid rgba(255,255,255,.45);
          ">

            <div style="
              font-size:30px;
              font-weight:800;
              color:#111827;
            ">
              ✏️ Chỉnh sửa
            </div>

            <div style="
              margin-top:10px;
              color:#6b7280;
              font-size:14px;
              font-style:italic;
            ">
              Cập nhật lại công việc của bạn
            </div>

          </div>

          <div style="
            padding:28px;
          ">

            <!-- CREATOR -->

            <div style="margin-bottom:18px;">

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
                style="
                  width:100%;
                  height:58px;

                  border:none;
                  outline:none;

                  border-radius:22px;

                  background:rgba(248,250,252,.8);

                  border:1px solid rgba(255,255,255,.7);

                  padding:0 18px;

                  font-size:16px;

                  font-style:italic;

                  letter-spacing:.3px;

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
                style="
                  width:100%;
                  min-height:220px;

                  border:none;
                  outline:none;

                  resize:none;

                  border-radius:24px;

                  background:rgba(248,250,252,.8);

                  border:1px solid rgba(255,255,255,.7);

                  padding:20px;

                  font-size:16px;

                  line-height:2;

                  color:#111827;

                  box-sizing:border-box;

                  overflow-y:auto;

                  font-style:italic;

                  letter-spacing:.3px;

                  font-weight:500;

                  font-family:
                    -apple-system,
                    BlinkMacSystemFont,
                    'SF Pro Display',
                    sans-serif;
                "
              >${task.task}</textarea>

            </div>

          </div>

          <!-- FOOTER -->

          <div style="
            padding:24px 28px 28px;

            border-top:1px solid rgba(255,255,255,.45);
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

                  border-radius:22px;

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

                  border-radius:22px;

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

                  box-shadow:
                    0 12px 30px rgba(59,130,246,.25);
                "
              >
                Lưu thay đổi
              </button>

            </div>

          </div>

        </div>
      `,

      didOpen: () => {
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
          document.getElementById("creator")
            .value;

        const taskText =
          document.getElementById("task")
            .value;

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
        type: "spring",
        stiffness: 180,
        damping: 18,
      }}

      whileHover={{
        y: -4,
      }}

      className={`
        relative
        overflow-hidden
        rounded-[32px]
        p-5

        backdrop-blur-2xl

        border

        shadow-xl

        transition-all

        ${
          task.completed
            ? `
              bg-green-50/80
              border-green-100
            `
            : `
              bg-white/75
              border-white/60
            `
        }
      `}
    >
      {/* BG */}

      <div className="absolute -bottom-14 -right-14 w-40 h-40 bg-blue-300/20 rounded-full blur-3xl pointer-events-none z-0" />

      {/* STATUS */}

      <div className="absolute top-4 right-4 z-10">
        {task.completed ? (
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
            Hoàn thành
          </div>
        ) : (
          <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
            Đang làm
          </div>
        )}
      </div>

      {/* CONTENT */}

      <div className="relative z-10">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <FaUser className="text-blue-500" />

          <span className="font-semibold italic tracking-wide">
            {task.creator}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
          <FaClock className="text-orange-400" />

          <span className="italic tracking-wide">
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
          className="
            py-3
            rounded-2xl

            bg-gradient-to-r
            from-blue-500
            to-indigo-500

            text-white

            flex
            items-center
            justify-center

            active:scale-95

            shadow-lg

            transition-all
            duration-300
          "
        >
          <FaEye />
        </button>

        {/* EDIT */}

        <button
          onClick={handleEditTask}
          className="
            py-3
            rounded-2xl

            bg-gradient-to-r
            from-yellow-400
            to-orange-400

            text-white

            flex
            items-center
            justify-center

            active:scale-95

            shadow-lg

            transition-all
            duration-300
          "
        >
          <FaEdit />
        </button>

        {/* TOGGLE */}

        <button
          onClick={() => onToggle(task)}
          className={`
            py-3
            rounded-2xl

            text-white

            flex
            items-center
            justify-center

            active:scale-95

            shadow-lg

            transition-all
            duration-300

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
          onClick={() => onDelete(task.id)}
          className="
            py-3
            rounded-2xl

            bg-gradient-to-r
            from-red-500
            to-pink-500

            text-white

            flex
            items-center
            justify-center

            active:scale-95

            shadow-lg

            transition-all
            duration-300
          "
        >
          <FaTrash />
        </button>
      </div>
    </motion.div>
  );
}