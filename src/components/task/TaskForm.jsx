import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaPlus,
  FaUser,
  FaClipboardList,
} from "react-icons/fa";

export default function TaskForm({ onAdd }) {
  const [creator, setCreator] = useState("");
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!creator || !task) return;

    onAdd({
      creator,
      task,
      createdAt: new Date().toISOString(),
      completed: false,
    });

    setCreator("");
    setTask("");
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      /* SỬA KHUNG FORM:
        - Dark mode: Đổi thành màu xám đen mờ (zinc-900/90), viền Tím Neon mờ ảo, đổ bóng sâu đặc trưng Cyberpunk.
      */
      className="mx-4 mt-4 p-5 rounded-[28px] bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-white/50 dark:border-purple-500/30 shadow-[0_10px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_rgba(168,85,247,0.15)] transition-all duration-500"
    >
      {/* Tiêu đề chữ Đen -> Chữ Trắng có ánh Neon Cyan */}
      <h2 className="text-lg font-bold text-slate-800 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-zinc-100 dark:to-cyan-300 mb-5">
        Tạo công việc mới
      </h2>

      <div className="space-y-4">
        {/* INPUT 1: NGƯỜI TẠO */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-zinc-400 mb-2">
            <FaUser size={12} className="dark:text-purple-400" />
            Người tạo
          </label>

          {/* SỬA INPUT:
            - Dark mode: Nền đen sâu (zinc-950), chữ sáng (zinc-100).
            - Hiệu ứng Focus: Bung viền và đổ bóng phát quang Neon Cyan rực rỡ.
          */}
          <input
            type="text"
            placeholder="Nhập tên người tạo..."
            value={creator}
            onChange={(e) => setCreator(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 outline-none text-slate-800 transition-all duration-300
              focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100
              dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-600
              dark:focus:border-cyan-400 dark:focus:bg-zinc-950 dark:focus:ring-0 dark:focus:[box-shadow:0_0_15px_rgba(34,211,238,0.4)]"
          />
        </div>

        {/* INPUT 2: CÔNG VIỆC */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-zinc-400 mb-2">
            <FaClipboardList size={12} className="dark:text-purple-400" />
            Công việc
          </label>

          {/* SỬA TEXTAREA: Đồng bộ hiệu ứng phát quang Neon Cyan */}
          <textarea
            placeholder="Mô tả công việc cần thực hiện..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 outline-none text-slate-800 resize-none min-h-[120px] transition-all duration-300
              focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100
              dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-600
              dark:focus:border-cyan-400 dark:focus:bg-zinc-950 dark:focus:ring-0 dark:focus:[box-shadow:0_0_15px_rgba(34,211,238,0.4)]"
          />
        </div>

        {/* NÚT BẤM GỬI FORM (SUBMIT) */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.01 }}
          /* SỬA NÚT BẤM:
            - Dark mode: Chuyển sang dải màu Hồng cánh sen -> Tím Cyber cực kỳ nổi bật.
            - Hiệu ứng đổ bóng phát quang Neon Tím đồng điệu.
          */
          className="w-full mt-2 py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30
            dark:from-fuchsia-500 dark:to-purple-600 dark:shadow-[0_5px_20px_rgba(168,85,247,0.4)] transition-all duration-500 cursor-pointer"
        >
          <FaPlus />
          Tạo công việc
        </motion.button>
      </div>
    </motion.form>
  );
}