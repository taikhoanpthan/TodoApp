import { FaClipboard } from "react-icons/fa";

export default function EmptyState() {
  return (
    <div className="mx-4 mt-8 flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white/70 px-4 py-14 text-center text-slate-500 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-400">
      <div className="mb-4 rounded-2xl bg-blue-50 p-5 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
        <FaClipboard size={32} />
      </div>

      <h2 className="text-xl font-bold text-slate-800 dark:text-zinc-100">
        Chưa có công việc
      </h2>

      <p className="mt-2 text-sm">
        Hãy tạo công việc đầu tiên
      </p>
    </div>
  );
}
