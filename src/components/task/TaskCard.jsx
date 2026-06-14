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

export default function TaskCard({ task, onDelete, onToggle, onEdit }) {
  
  // =========================
  // VIEW DETAIL (POPUP XEM)
  // =========================
  const handleViewDetail = () => {
    // Kiểm tra xem hệ thống có đang bật Dark Mode không
    const isDark = document.documentElement.classList.contains("dark");

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
          background:${isDark ? "rgba(9,9,11,.95)" : "rgba(255,255,255,.82)"};
          backdrop-filter:blur(30px);
          -webkit-backdrop-filter:blur(30px);
          box-shadow: ${isDark ? "0 25px 60px rgba(0,0,0,0.5)" : "0 25px 60px rgba(0,0,0,0.12)"};
          text-align:left;
          width:100%;
          max-height:85vh;
          display:flex;
          flex-direction:column;
          border:1px solid ${isDark ? "rgba(168,85,247,.3)" : "rgba(255,255,255,.5)"};
        ">
          <div style="
            position:absolute;
            top:-120px;
            right:-120px;
            width:260px;
            height:260px;
            background: radial-gradient(circle, ${task.completed ? "rgba(16,185,129,.25)" : "rgba(34,211,238,.25)"}, transparent 70%);
            border-radius:999px;
            filter:blur(20px);
            opacity:.8;
          "></div>

          <div style="position:relative; z-index:2; padding:30px; border-bottom:1px solid ${isDark ? "rgba(63,63,70,.4)" : "rgba(255,255,255,.45)"}; flex-shrink:0;">
            <div style="display:flex; justify-content:between; align-items:center; gap:16px;">
              <div style="flex:1;">
                <div style="font-size:26px; font-weight:800; color:${isDark ? "#f4f4f5" : "#111827"}; line-height:1.2; tracking:-0.5px;">
                  Thông tin công việc
                </div>
                <div style="margin-top:6px; color:${isDark ? "#a1a1aa" : "#6b7280"}; font-size:14px; font-weight:500;">
                  ${task.completed ? "Hệ thống ghi nhận: Đã xong" : "Hệ thống ghi nhận: Đang chạy"}
                </div>
              </div>
              <div style="
                background:${task.completed ? "linear-gradient(135deg,#10b981,#059669)" : "linear-gradient(135deg,#f43f5e,#e11d48)"};
                color:white; padding:8px 16px; border-radius:999px; font-size:13px; font-weight:700; white-space:nowrap;
                box-shadow: ${task.completed ? "0 0 15px rgba(16,185,129,0.4)" : "0 0 15px rgba(244,63,94,0.4)"};
              ">
                ${task.completed ? "Hoàn thành" : "Đang làm"}
              </div>
            </div>
          </div>

          <div style="position:relative; z-index:2; padding:28px; overflow-y:auto; flex:1;">
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:24px;">
              <div style="background:${isDark ? "rgba(24,24,27,.7)" : "rgba(255,255,255,.55)"}; border:1px solid ${isDark ? "rgba(63,63,70,.5)" : "rgba(255,255,255,.5)"}; border-radius:24px; padding:18px;">
                <div style="font-size:11px; color:#94a3b8; margin-bottom:6px; font-weight:700; letter-spacing:1px; text-transform:uppercase;">Người tạo</div>
                <div style="font-size:16px; color:${isDark ? "#e4e4e7" : "#111827"}; font-weight:700;">${task.creator}</div>
              </div>
              <div style="background:${isDark ? "rgba(24,24,27,.7)" : "rgba(255,255,255,.55)"}; border:1px solid ${isDark ? "rgba(63,63,70,.5)" : "rgba(255,255,255,.5)"}; border-radius:24px; padding:18px;">
                <div style="font-size:11px; color:#94a3b8; margin-bottom:6px; font-weight:700; letter-spacing:1px; text-transform:uppercase;">Ngày tạo</div>
                <div style="font-size:14px; color:${isDark ? "#e4e4e7" : "#111827"}; font-weight:600;">${new Date(task.createdAt).toLocaleString("vi-VN")}</div>
              </div>
            </div>

            <div style="background:${isDark ? "rgba(24,24,27,.4)" : "rgba(255,255,255,.6)"}; border:1px solid ${isDark ? "rgba(63,63,70,.3)" : "rgba(255,255,255,.55)"}; border-radius:28px; padding:22px;">
              <div style="font-size:11px; color:#94a3b8; margin-bottom:12px; font-weight:700; letter-spacing:1px; text-transform:uppercase;">Nội dung chi tiết</div>
              <textarea readonly style="
                width:100%; min-height:160px; border:none; outline:none; resize:none; border-radius:20px;
                background:${isDark ? "#09090b" : "rgba(248,250,252,.8)"}; border:1px solid ${isDark ? "#27272a" : "rgba(255,255,255,.6)"};
                padding:16px; font-size:15px; line-height:1.8; color:${isDark ? "#f4f4f5" : "#111827"}; box-sizing:border-box;
              ">${task.task}</textarea>
            </div>
          </div>

          <div style="position:relative; z-index:2; padding:24px 28px 28px; border-top:1px solid ${isDark ? "rgba(63,63,70,.4)" : "rgba(255,255,255,.45)"}; flex-shrink:0;">
            <button id="closeTaskDetail" style="
              width:100%; border:none; padding:15px; border-radius:22px;
              background:${isDark ? "linear-gradient(135deg,#a855f7,#7c3aed)" : "linear-gradient(135deg,#3b82f6,#6366f1)"};
              color:white; font-size:15px; font-weight:700; cursor:pointer;
              box-shadow: ${isDark ? "0 0 20px rgba(168,85,247,0.4)" : "0 15px 35px rgba(59,130,246,.3)"};
            ">Đóng giao diện</button>
          </div>
        </div>
      `,
      didOpen: () => {
        document.getElementById("closeTaskDetail")?.addEventListener("click", () => Swal.close());
      },
    });
  };

  // =========================
  // EDIT TASK (POPUP SỬA)
  // =========================
  const handleEditTask = async () => {
    const isDark = document.documentElement.classList.contains("dark");

    const result = await Swal.fire({
      width: 560,
      showConfirmButton: false,
      background: "transparent",
      padding: 12,
      scrollbarPadding: false,
      html: `
        <div style="
          position:relative; overflow:hidden; border-radius:36px;
          background:${isDark ? "rgba(9,9,11,.95)" : "rgba(255,255,255,.82)"};
          backdrop-filter:blur(30px); -webkit-backdrop-filter:blur(30px);
          box-shadow: ${isDark ? "0 25px 60px rgba(0,0,0,0.5)" : "0 25px 60px rgba(0,0,0,0.12)"};
          text-align:left; width:100%; display:flex; flex-direction:column;
          border:1px solid ${isDark ? "rgba(34,211,238,.3)" : "rgba(255,255,255,.5)"};
        ">
          <div style="padding:30px; border-bottom:1px solid ${isDark ? "rgba(63,63,70,.4)" : "rgba(255,255,255,.45)"};">
            <div style="font-size:26px; font-weight:800; color:${isDark ? "#f4f4f5" : "#111827"};">✏️ Hiệu chỉnh tác vụ</div>
            <div style="margin-top:6px; color:#6b7280; font-size:14px;">Thay đổi thông tin nhiệm vụ trong danh sách</div>
          </div>

          <div style="padding:28px;">
            <div style="margin-bottom:18px;">
              <div style="font-size:11px; color:#94a3b8; margin-bottom:8px; font-weight:700; letter-spacing:1px; text-transform:uppercase;">Người đảm nhận</div>
              <input id="creator" value="${task.creator}" style="
                width:100%; height:54px; border:none; outline:none; border-radius:18px;
                background:${isDark ? "#09090b" : "rgba(248,250,252,.8)"};
                border:1px solid ${isDark ? "#27272a" : "rgba(255,255,255,.7)"};
                padding:0 18px; font-size:15px; color:${isDark ? "#f4f4f5" : "#111827"}; box-sizing:border-box;
              " />
            </div>

            <div>
              <div style="font-size:11px; color:#94a3b8; margin-bottom:8px; font-weight:700; letter-spacing:1px; text-transform:uppercase;">Nội dung công việc</div>
              <textarea id="task" style="
                width:100%; min-height:160px; border:none; outline:none; resize:none; border-radius:20px;
                background:${isDark ? "#09090b" : "rgba(248,250,252,.8)"};
                border:1px solid ${isDark ? "#27272a" : "rgba(255,255,255,.7)"};
                padding:16px; font-size:15px; line-height:1.8; color:${isDark ? "#f4f4f5" : "#111827"}; box-sizing:border-box;
              ">${task.task}</textarea>
            </div>
          </div>

          <div style="padding:24px 28px 28px; border-top:1px solid ${isDark ? "rgba(63,63,70,.4)" : "rgba(255,255,255,.45)"};">
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
              <button id="cancelEdit" style="height:50px; border:none; border-radius:18px; background:${isDark ? "#27272a" : "#f3f4f6"}; color:${isDark ? "#e4e4e7" : "#374151"}; font-size:15px; font-weight:700; cursor:pointer;">Hủy</button>
              <button id="submitEdit" style="
                height:50px; border:none; border-radius:18px;
                background:${isDark ? "linear-gradient(135deg,#06b6d4,#3b82f6)" : "linear-gradient(135deg,#3b82f6,#6366f1)"};
                color:white; font-size:15px; font-weight:700; cursor:pointer;
                box-shadow: ${isDark ? "0 0 15px rgba(6,182,212,0.4)" : "0 12px 30px rgba(59,130,246,.25)"};
              ">Cập nhật</button>
            </div>
          </div>
        </div>
      `,
      didOpen: () => {
        document.getElementById("cancelEdit")?.addEventListener("click", () => Swal.close());
        document.getElementById("submitEdit")?.addEventListener("click", () => Swal.clickConfirm());
      },
      preConfirm: () => {
        const creator = document.getElementById("creator").value;
        const taskText = document.getElementById("task").value;

        if (!creator.trim() || !taskText.trim()) {
          Swal.showValidationMessage("Vui lòng không bỏ trống thông tin!");
          return false;
        }
        return { creator, task: taskText };
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
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 180, damping: 18 }}
      whileHover={{ y: -4 }}
      /* STYLE CHO CARD CHÍNH:
         - Light mode: Giữ nguyên màu nền kính mờ.
         - Dark mode: Đổi nền zinc-900 mờ ảo, viền ánh Neon Cyan (đang làm) hoặc Neon Lá cây (khi hoàn thành).
      */
      className={`relative overflow-hidden rounded-[32px] p-5 backdrop-blur-2xl border shadow-xl transition-all duration-500
        ${
          task.completed
            ? "bg-green-50/80 border-green-100 dark:bg-emerald-950/20 dark:border-emerald-500/30"
            : "bg-white/75 border-white/60 dark:bg-zinc-900/90 dark:border-cyan-500/20"
        }
      `}
    >
      {/* GLOW DECORATION BACKGROUND */}
      <div className="absolute -bottom-14 -right-14 w-40 h-40 bg-blue-300/20 dark:bg-purple-500/10 rounded-full blur-3xl pointer-events-none z-0" />

      {/* BADGE TRẠNG THÁI GÓC TRÊN NỀN CYBER */}
      <div className="absolute top-4 right-4 z-10">
        {task.completed ? (
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 dark:from-emerald-500 dark:to-teal-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg dark:shadow-emerald-500/20">
            Hoàn thành
          </div>
        ) : (
          <div className="bg-gradient-to-r from-orange-400 to-orange-500 dark:from-pink-500 dark:to-rose-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg dark:shadow-pink-500/20">
            Đang làm
          </div>
        )}
      </div>

      {/* THÔNG TIN NGƯỜI TẠO & THỜI GIAN CHỮ ĐỔI MÀU SÁNG TRONG TỐI */}
      <div className="relative z-10">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-zinc-400">
          <FaUser className="text-blue-500 dark:text-cyan-400" />
          <span className="font-bold italic tracking-wide">{task.creator}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-zinc-500 mt-2">
          <FaClock className="text-orange-400 dark:text-pink-400" />
          <span className="italic tracking-wide">
            {task.createdAt ? new Date(task.createdAt).toLocaleDateString("vi-VN") : "Không có ngày"}
          </span>
        </div>
      </div>

      {/* HỆ THỐNG 4 NÚT HÀNH ĐỘNG (DƯỚI CARD) */}
      <div className="relative z-10 grid grid-cols-4 gap-2 mt-5">
        {/* NÚT XEM CHI TIẾT (CYAN -> BLUE) */}
        <button
          onClick={handleViewDetail}
          className="py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-cyan-500 dark:to-blue-600 text-white flex items-center justify-center active:scale-95 shadow-md dark:shadow-cyan-500/10 transition-all duration-300 cursor-pointer"
        >
          <FaEye size={15} />
        </button>

        {/* NÚT CHỈNH SỬA (VÀNG -> TÍM CYBER TRONG TỐI) */}
        <button
          onClick={handleEditTask}
          className="py-3 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-400 dark:from-amber-400 dark:to-orange-500 text-white flex items-center justify-center active:scale-95 shadow-md dark:shadow-orange-500/10 transition-all duration-300 cursor-pointer"
        >
          <FaEdit size={15} />
        </button>

        {/* NÚT CHECK HOÀN THÀNH (ĐỔI SANG GRADIENT XÁM HOẶC XANH LỤC BẢO) */}
        <button
          onClick={() => onToggle(task)}
          className={`py-3 rounded-2xl text-white flex items-center justify-center active:scale-95 shadow-md transition-all duration-300 cursor-pointer
            ${
              task.completed
                ? "bg-gradient-to-r from-gray-400 to-gray-500 dark:from-zinc-700 dark:to-zinc-800"
                : "bg-gradient-to-r from-green-500 to-emerald-500 dark:from-emerald-500 dark:to-teal-500 dark:shadow-emerald-500/20"
            }
          `}
        >
          <FaCheckCircle size={15} />
        </button>

        {/* NÚT XÓA (ĐỎ -> HỒNG NEON) */}
        <button
          onClick={() => onDelete(task.id)}
          className="py-3 rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 dark:from-rose-500 dark:to-red-600 text-white flex items-center justify-center active:scale-95 shadow-md dark:shadow-rose-500/20 transition-all duration-300 cursor-pointer"
        >
          <FaTrash size={15} />
        </button>
      </div>
    </motion.div>
  );
}