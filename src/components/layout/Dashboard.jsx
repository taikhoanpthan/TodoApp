import { motion } from "framer-motion";
import { FaCheckCircle, FaClipboardList, FaRegClock } from "react-icons/fa";

export default function Dashboard({ total, completed, pending }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-4 mt-5"
    >
      <div className="grid grid-cols-3 gap-3">
        {/* BOX 1: TỔNG CÔNG VIỆC */}
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/80 transition-all dark:bg-zinc-900 dark:ring-zinc-800">
          <FaClipboardList className="mb-3 text-blue-600 dark:text-blue-400" />
          <p className="text-xs font-medium text-slate-500 dark:text-zinc-400">
            Tổng việc
          </p>
          <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 dark:text-zinc-50">
            {total}
          </h2>
        </div>

        {/* BOX 2: ĐÃ HOÀN THÀNH (NEON LỤC BẢO) */}
        <div className="rounded-2xl bg-emerald-500 p-4 text-white shadow-lg shadow-emerald-500/20 transition-all dark:bg-emerald-600">
          <FaCheckCircle className="mb-3 text-emerald-100" />
          <p className="text-xs font-medium text-emerald-50">
            Hoàn thành
          </p>
          <h2 className="mt-1 text-3xl font-bold tracking-tight text-white">
            {completed}
          </h2>
        </div>

        {/* BOX 3: CHƯA XONG (NEON HỒNG CYBER) */}
        <div className="rounded-2xl bg-amber-400 p-4 text-white shadow-lg shadow-amber-400/20 transition-all dark:bg-amber-500">
          <FaRegClock className="mb-3 text-amber-50" />
          <p className="text-xs font-medium text-amber-50">
            Chưa xong
          </p>
          <h2 className="mt-1 text-3xl font-bold tracking-tight text-white">
            {pending}
          </h2>
        </div>
      </div>
    </motion.div>
  );
}
