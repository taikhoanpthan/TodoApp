import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Intro({ onFinish }) {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Giả lập thanh loading chạy từ 0 -> 100% thật mượt trong 1.5 giây
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 25);

    // Sau khi chạy xong loading, đợi hiệu ứng hoàn tất rồi tắt Intro
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(() => onFinish(), 800); // Đợi hiệu ứng exit hoàn thành mới xóa component
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onFinish]);

  // Biến hỗ trợ tách từng chữ cái của subtext để làm hiệu ứng bay lên
  const brandText = "Yakiuo Ishikawa Saigon";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[999999] flex items-center justify-center bg-[#07070c] overflow-hidden"
        >
          {/* BACKGROUND MATRIX GLOW */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15)_0%,transparent_65%)]" />
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-950/20 via-transparent to-pink-950/20" />

          {/* TRUNG TÂM LOADER */}
          <div className="relative z-10 flex flex-col items-center w-full max-w-xs px-4">
            
            {/* CHỮ LOADING NHẤP NHÁY LED */}
            <motion.p
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="mb-3 text-xs tracking-[0.4em] text-cyan-400 font-extrabold uppercase drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]"
            >
              System Initializing... {progress}%
            </motion.p>

            {/* THANH THỜI GIAN CYBERPUNK CHẠY ĐẦY */}
            <div className="relative w-full h-[6px] rounded-full bg-zinc-900 border border-zinc-800/80 p-[1px] overflow-hidden shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]">
              <motion.div 
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 shadow-[0_0_12px_rgba(168,85,247,0.8)] relative"
              >
                {/* Điểm sáng quét đầu thanh năng lượng */}
                <div className="absolute right-0 top-0 bottom-0 w-2 bg-white rounded-full animate-pulse" />
              </motion.div>
            </div>

            {/* TÊN THƯƠNG HIỆU BAY TỪNG CHỮ CỰC ĐẸP */}
            <div className="mt-6 flex overflow-hidden">
              {brandText.split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: index * 0.03,
                    type: "spring",
                    stiffness: 100,
                    damping: 10,
                  }}
                  className={`text-[10px] font-bold tracking-[0.2em] uppercase ${
                    char === " " ? "mx-1" : "text-zinc-500 dark:text-zinc-400"
                  }`}
                >
                  {char}
                </motion.span>
              ))}
            </div>

          </div>

          {/* ĐƯỜNG CẮT QUÉT GIAO DIỆN (DECORATION) */}
          <div className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent top-1/2 -translate-y-1/2 opacity-30 pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}