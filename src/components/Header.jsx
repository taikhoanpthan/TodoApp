import {
  FaClipboardList,
  FaCalendarAlt,
  FaTasks,
} from "react-icons/fa";

import { motion } from "framer-motion";

export default function Header({
  totalTasks = 0,
}) {
  const today = new Date();

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="relative overflow-hidden bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 text-white px-5 pt-8 pb-8 rounded-b-[40px] shadow-2xl"
    >
      {/* BACKGROUND DECOR */}

      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />

      <div className="absolute bottom-0 -left-10 w-32 h-32 bg-white/10 rounded-full" />

      {/* TOP */}

      <div className="relative z-10 flex items-center justify-between">
        {/* LEFT */}

        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg">
            <FaClipboardList size={30} />
          </div>

          <div>
            <h1 className="text-3xl font-extrabold tracking-wide">
              TodoList
            </h1>

            <p className="text-sm opacity-90 mt-1">
              Yakiuo Ishikawa
            </p>
          </div>
        </div>
      </div>

      {/* DATE */}

      <div className="relative z-10 mt-7 flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl">
        <FaCalendarAlt />

        <span className="text-sm font-medium">
          {today.toLocaleDateString(
            "vi-VN",
            {
              weekday: "long",
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }
          )}
        </span>
      </div>

      {/* STATS */}

      
    </motion.div>
  );
}