import { motion } from "framer-motion";

const filters = [
  {
    key: "all",
    label: "Tất cả",
    // Light mode: Xanh lam | Dark mode: Neon Cyan phát sáng rực rỡ
    color: "from-blue-500 to-indigo-500 dark:from-cyan-400 dark:to-blue-500",
    shadow: "dark:shadow-[0_0_15px_rgba(34,211,238,0.5)]",
  },
  {
    key: "pending",
    label: "Chưa xong",
    // Light mode: Cam | Dark mode: Neon Pink/Rose đậm chất Cyberpunk
    color: "from-orange-400 to-orange-500 dark:from-pink-500 dark:to-rose-600",
    shadow: "dark:shadow-[0_0_15px_rgba(244,63,94,0.5)]",
  },
  {
    key: "completed",
    label: "Hoàn thành",
    // Light mode: Xanh lá | Dark mode: Neon Lục Bảo (Emerald)
    color: "from-green-400 to-green-500 dark:from-emerald-400 dark:to-teal-500",
    shadow: "dark:shadow-[0_0_15px_rgba(52,211,153,0.5)]",
  },
];

export default function FilterBar({ filter, setFilter }) {
  return (
    <div className="px-4 mt-5">
      <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
        {filters.map((item) => {
          const active = filter === item.key;

          return (
            <motion.button
              key={item.key}
              onClick={() => setFilter(item.key)}
              whileTap={{ scale: 0.96 }}
              animate={{ scale: active ? 1 : 0.98 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              /* CẬP NHẬT GIAO DIỆN NÚT:
                 - Khi Chưa Active ở Dark mode: Nền tối zinc-900/90, viền xám đậm zinc-800, chữ zinc-400.
                 - Khi Active: Đổ bóng phát quang theo mã màu riêng biệt (item.shadow).
              */
              className={`relative px-5 py-3 rounded-2xl whitespace-nowrap font-bold text-sm overflow-hidden border flex-shrink-0 transition-all duration-300 will-change-transform cursor-pointer
                ${
                  active
                    ? `text-white border-transparent shadow-lg ${item.shadow}`
                    : "bg-white/80 text-gray-700 border-gray-200 shadow-sm dark:bg-zinc-900/90 dark:text-zinc-400 dark:border-zinc-800"
                }
              `}
              style={{
                WebkitTapHighlightColor: "transparent",
              }}
            >
              {/* ACTIVE GRADIENT BACKGROUND */}
              {active && (
                <motion.div
                  layoutId="activeFilter"
                  className={`absolute inset-0 bg-gradient-to-r ${item.color}`}
                  transition={{
                    type: "spring",
                    stiffness: 280,
                    damping: 26,
                  }}
                  style={{
                    borderRadius: 16,
                  }}
                />
              )}

              {/* CHỮ HIỂN THỊ */}
              <span className="relative z-10">
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}