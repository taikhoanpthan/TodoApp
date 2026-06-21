import { useState, useEffect } from "react";
import {
  FaClipboardList,
  FaCalendarAlt,
  FaBell,
  FaSyncAlt,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useNotifications from "../../hooks/useNotifications";

// IMPORT ẢNH TRỰC TIẾP ĐỂ VERCEL ĐỊNH VỊ CHÍNH XÁC KHI BUILD
import todo1 from "../../assets/todo1.jpg";
import todo2 from "../../assets/todo2.jpg";
import lich from "../../assets/lich.jpg";
export default function Header({ totalTasks = 0 }) {
  const today = new Date();
  const { unreadCount } = useNotifications();

  // Khởi tạo trạng thái Dark Mode từ localStorage
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Cập nhật class 'dark' vào thẻ html (Kích hoạt @variant dark của Tailwind v4)
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Hàm xử lý nút Tải lại trang
  const handleRefresh = () => {
    window.location.reload();
  };

  // Hàm xử lý hiển thị form ảnh thông báo rộng rãi, UX sáng/tối tự động
  const handleNotification = () => {
const images = [lich, todo1, todo2];    let currentIndex = 0;
    let startX = 0;

    const updateSlider = () => {
      const img = document.getElementById("sliderImage");

      if (img) {
        img.style.opacity = "0";

        setTimeout(() => {
          img.src = images[currentIndex];
          img.style.opacity = "1";
        }, 150);
      }

      for (let i = 0; i < images.length; i++) {
        const dot = document.getElementById(`dot${i}`);

        if (dot) {
          dot.style.background =
            i === currentIndex ? "#ffffff" : "rgba(255,255,255,0.35)";
        }
      }
    };

    Swal.fire({
      width: "95vw",
      showConfirmButton: false,
      background: "transparent",
      html: `
      <div
        style="
          position:relative;
          border-radius:20px;
          overflow:hidden;
          background:#111827;
        "
      >
        <button
          id="closeSwalBtn"
          style="
            position:absolute;
            top:10px;
            right:10px;
            z-index:99;
            width:36px;
            height:36px;
            border:none;
            border-radius:50%;
            background:rgba(0,0,0,.5);
            color:white;
            cursor:pointer;
          "
        >
          ✕
        </button>

        <img
          id="sliderImage"
          src="${images[0]}"
          style="
            width:100%;
            max-height:80vh;
            object-fit:contain;
            display:block;
            transition:opacity .3s ease;
            user-select:none;
            touch-action:pan-y;
          "
        />

        <div
          style="
            position:absolute;
            bottom:15px;
            left:50%;
            transform:translateX(-50%);
            display:flex;
            gap:8px;
            z-index:10;
          "
        >
          <span id="dot0"
            style="width:10px;height:10px;border-radius:50%;background:white;">
          </span>

          <span id="dot1"
            style="width:10px;height:10px;border-radius:50%;background:rgba(255,255,255,.35);">
          </span>

          <span id="dot2"
            style="width:10px;height:10px;border-radius:50%;background:rgba(255,255,255,.35);">
          </span>
        </div>
      </div>
    `,
      didOpen: () => {
        const img = document.getElementById("sliderImage");

        document
          .getElementById("closeSwalBtn")
          ?.addEventListener("click", () => Swal.close());

        // Vuốt trên điện thoại
        img?.addEventListener("touchstart", (e) => {
          startX = e.touches[0].clientX;
        });

        img?.addEventListener("touchend", (e) => {
          const endX = e.changedTouches[0].clientX;
          const distance = startX - endX;

          if (Math.abs(distance) < 50) return;

          if (distance > 0) {
            currentIndex =
              currentIndex === images.length - 1 ? 0 : currentIndex + 1;
          } else {
            currentIndex =
              currentIndex === 0 ? images.length - 1 : currentIndex - 1;
          }

          updateSlider();
        });

        // Kéo chuột trên PC
        let mouseDownX = 0;

        img?.addEventListener("mousedown", (e) => {
          mouseDownX = e.clientX;
        });

        img?.addEventListener("mouseup", (e) => {
          const distance = mouseDownX - e.clientX;

          if (Math.abs(distance) < 50) return;

          if (distance > 0) {
            currentIndex =
              currentIndex === images.length - 1 ? 0 : currentIndex + 1;
          } else {
            currentIndex =
              currentIndex === 0 ? images.length - 1 : currentIndex - 1;
          }

          updateSlider();
        });
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 dark:from-fuchsia-600 dark:via-purple-900 dark:to-cyan-600 text-white px-5 pb-6 rounded-b-[40px] shadow-2xl dark:shadow-[0_10px_30px_rgba(168,85,247,0.3)] border-b dark:border-cyan-400/40 transition-all duration-500"
      style={{ paddingTop: "calc(env(safe-area-inset-top) + 20px)" }}
    >
      {/* Background Neon Blur Shapes */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 dark:bg-cyan-400/20 dark:blur-xl rounded-full" />
      <div className="absolute bottom-0 -left-10 w-32 h-32 bg-white/10 dark:bg-fuchsia-400/20 dark:blur-xl rounded-full" />

      {/* =======================================================
          TẦNG 1: LOGO VÀ NÚT ĐỔI THEO DÕI SÁNG / TỐI CHÍNH
          ======================================================= */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/20 dark:bg-zinc-950/40 dark:border dark:border-fuchsia-400/40 dark:shadow-[0_0_15px_rgba(232,121,249,0.3)] backdrop-blur-md flex items-center justify-center shadow-lg">
            <FaClipboardList size={26} className="dark:text-fuchsia-300" />
          </div>

          <div>
            <h1 className="text-2xl font-extrabold tracking-wide dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:to-cyan-200">
              TodoList
            </h1>
            <p className="text-xs opacity-80 mt-0.5 dark:text-cyan-300 font-medium">
              Mỹ đẹp trai
            </p>
          </div>
        </div>

        {/* Nút Light/Dark Mode độc lập nổi bật */}
        <motion.button
          whileHover={{
            scale: 1.08,
            rotate: 180,
            boxShadow: isDarkMode
              ? "0 0 15px rgba(234,179,8,0.6)"
              : "0 0 15px rgba(96,165,250,0.6)",
          }}
          whileTap={{ scale: 0.92 }}
          onClick={toggleDarkMode}
          className="w-11 h-11 rounded-xl bg-white/15 dark:bg-zinc-950/50 dark:border dark:border-purple-500/50 backdrop-blur-md flex items-center justify-center shadow-lg text-yellow-300 dark:text-fuchsia-400 transition-all duration-300"
          title={
            isDarkMode
              ? "Chuyển sang giao diện sáng"
              : "Chuyển sang giao diện tối"
          }
        >
          {isDarkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
        </motion.button>
      </div>

      {/* =======================================================
          TẦNG 2: THANH LỊCH VÀ CÁC NÚT PHỤ (ĐÃ TÁCH BIỆT RỘNG RÃI)
          ======================================================= */}
      <div className="relative z-10 mt-5 flex items-center justify-between gap-4">
        {/* Góc trái: Lịch ngày tháng */}
        <div className="flex flex-1 items-center gap-2.5 bg-white/10 dark:bg-zinc-950/40 dark:border dark:border-cyan-500/20 backdrop-blur-md px-4 py-2.5 rounded-xl dark:text-cyan-300">
          <FaCalendarAlt className="dark:text-cyan-400 text-sm" />
          <span className="text-xs font-semibold tracking-wide">
            {today.toLocaleDateString("vi-VN", {
              weekday: "short",
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </span>
        </div>

        {/* Góc phải: Cụm nút phụ được giải phóng không gian */}
        <div className="flex items-center gap-2">
          {/* Nút Thông báo */}
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: isDarkMode ? "0 0 15px rgba(34,211,238,0.5)" : "none",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNotification}
            className="relative w-10 h-10 rounded-xl bg-white/10 dark:bg-zinc-950/50 dark:border dark:border-cyan-500/40 backdrop-blur-md flex items-center justify-center shadow-md text-white dark:text-cyan-400 transition-all duration-300"
          >
            <FaBell size={15} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-red-500 dark:bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center dark:shadow-[0_0_8px_#f43f5e]">
                {unreadCount}
              </span>
            )}
          </motion.button>

          {/* Nút Tải lại trang */}
          <motion.button
            whileHover={{
              scale: 1.05,
              rotate: 180,
              boxShadow: isDarkMode ? "0 0 15px rgba(168,85,247,0.5)" : "none",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            className="w-10 h-10 rounded-xl bg-white/10 dark:bg-zinc-950/50 dark:border dark:border-emerald-500/40 backdrop-blur-md flex items-center justify-center shadow-md text-white dark:text-emerald-400 transition-all duration-300"
            title="Tải lại trang"
          >
            <FaSyncAlt size={14} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
