import { motion } from "framer-motion";

export default function Dashboard({ total, completed, pending }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-4 mt-5"
    >
      <div className="grid grid-cols-3 gap-3">
        {/* BOX 1: TỔNG CÔNG VIỆC */}
        <div className="bg-white rounded-3xl p-4 shadow-md border border-gray-100 transition-all duration-500
          dark:bg-zinc-900/90 dark:border-zinc-800 dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
          <p className="text-xs text-gray-400 dark:text-zinc-500 font-medium">
            Tổng việc
          </p>
          <h2 className="text-3xl font-extrabold mt-1 text-slate-800 dark:text-zinc-100 tracking-tight">
            {total}
          </h2>
        </div>

        {/* BOX 2: ĐÃ HOÀN THÀNH (NEON LỤC BẢO) */}
        <div className="bg-green-500 rounded-3xl p-4 text-white shadow-lg shadow-green-500/20 transition-all duration-500
          dark:bg-zinc-900/90 dark:border dark:border-emerald-500/30 dark:shadow-[0_0_15px_rgba(16,185,129,0.15)]">
          <p className="text-xs opacity-90 dark:text-emerald-400 dark:opacity-100 font-semibold">
            Hoàn thành
          </p>
          <h2 className="text-3xl font-extrabold mt-1 text-white dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-emerald-400 dark:to-teal-400 tracking-tight">
            {completed}
          </h2>
        </div>

        {/* BOX 3: CHƯA XONG (NEON HỒNG CYBER) */}
        <div className="bg-orange-400 rounded-3xl p-4 text-white shadow-lg shadow-orange-400/20 transition-all duration-500
          dark:bg-zinc-900/90 dark:border dark:border-pink-500/30 dark:shadow-[0_0_15px_rgba(236,72,153,0.15)]">
          <p className="text-xs opacity-90 dark:text-pink-400 dark:opacity-100 font-semibold">
            Chưa xong
          </p>
          <h2 className="text-3xl font-extrabold mt-1 text-white dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-pink-400 dark:to-rose-500 tracking-tight">
            {pending}
          </h2>
        </div>
      </div>
    </motion.div>
  );
}