import {
  FaClipboardList,
  FaCalendarAlt,
  FaSyncAlt,
  FaBell,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useNotifications from "../../hooks/useNotifications";

export default function Header({ totalTasks = 0 }) {
  const today = new Date();
  const { unreadCount } = useNotifications();

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleNotification = () => {
    const images = [
      "src/assets/todo1.jpg", // Đường dẫn hình ảnh 1
      "src/assets/todo2.jpg", // Đường dẫn hình ảnh 2
    ];
    let currentIndex = 0;

    Swal.fire({
      width: "96vw", // Chiếm gần như trọn vẹn bề ngang màn hình thiết bị
      customClass: {
        popup: "max-w-[1300px]", // SỬA CHÍNH: Tăng giới hạn từ 1100px lên 1300px giúp ảnh to rộng hơn nữa
      },
      showConfirmButton: false,
      background: "transparent",
      html: `
        <style>
          .custom-nav-btn {
            opacity: 0.15 !important;
            transition: all 0.3s ease !important;
          }
          .custom-nav-btn:hover {
            opacity: 0.9 !important;
            background: #ffffff !important;
          }
          .close-swal-btn {
            opacity: 0.3 !important;
            transition: all 0.3s ease !important;
          }
          .close-swal-btn:hover {
            opacity: 1 !important;
          }
        </style>

        <div
          style="
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 25px 60px rgba(0,0,0,.35);
            position: relative;
            width: 100%;
          "
        >
          <button 
            id="closeSwalBtn"
            class="close-swal-btn"
            style="
              position: absolute;
              top: 15px;
              right: 15px;
              background: rgba(0, 0, 0, 0.6);
              color: white;
              border: none;
              border-radius: 50%;
              width: 42px;
              height: 42px;
              cursor: pointer;
              font-size: 20px;
              font-weight: bold;
              z-index: 30;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 4px 10px rgba(0,0,0,0.2);
            "
          >
            ✕
          </button>

          <div style="position: relative; width: 100%; background: #ffffff; padding: 0; overflow: hidden;">
            
            <div style="width: 100%; height: auto; overflow: hidden; display: flex; justify-content: center; align-items: center;">
              <img 
                id="sliderImage" 
                src="${images[currentIndex]}" 
                style="
                  width: 100%; 
                  height: auto; 
                  display: block; 
                  margin: 0 auto;
                  transform: scale(1.15); 
                  transform-origin: center center;
                  padding: 15px 0; /* Thu nhỏ khoảng cách đệm để ảnh chiếm không gian tốt hơn */
                " 
                alt="Notification"
              />
            </div>

            <button 
              id="prevImgBtn"
              class="custom-nav-btn"
              style="
                position: absolute;
                top: 50%;
                left: 20px;
                transform: translateY(-50%);
                background: rgba(255, 255, 255, 0.6);
                color: #000000;
                border: 1px solid #e5e7eb;
                border-radius: 50%;
                width: 55px;
                height: 55px;
                cursor: pointer;
                box-shadow: 0 4px 15px rgba(0,0,0,0.15);
                font-size: 26px;
                font-weight: bold;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 20;
              "
            >
              ❮
            </button>

            <button 
              id="nextImgBtn"
              class="custom-nav-btn"
              style="
                position: absolute;
                top: 50%;
                right: 20px;
                transform: translateY(-50%);
                background: rgba(255, 255, 255, 0.6);
                color: #000000;
                border: 1px solid #e5e7eb;
                border-radius: 50%;
                width: 55px;
                height: 55px;
                cursor: pointer;
                box-shadow: 0 4px 15px rgba(0,0,0,0.15);
                font-size: 26px;
                font-weight: bold;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 20;
              "
            >
              ❯
            </button>

            <div 
              style="
                position: absolute;
                bottom: 15px;
                left: 50%;
                transform: translateX(-50%);
                display: flex;
                gap: 10px;
                background: rgba(0, 0, 0, 0.5);
                padding: 6px 14px;
                border-radius: 20px;
                z-index: 20;
              "
            >
              <span id="dot0" style="width: 10px; height: 10px; border-radius: 50%; background: white; transition: background 0.3s;"></span>
              <span id="dot1" style="width: 10px; height: 10px; border-radius: 50%; background: rgba(255,255,255,0.4); transition: background 0.3s;"></span>
            </div>

          </div>
        </div>
      `,
      didOpen: () => {
        const imgElement = document.getElementById("sliderImage");
        const dot0 = document.getElementById("dot0");
        const dot1 = document.getElementById("dot1");

        const updateSlider = () => {
          if (imgElement) imgElement.src = images[currentIndex];
          
          if (dot0 && dot1) {
            dot0.style.background = currentIndex === 0 ? "white" : "rgba(255,255,255,0.4)";
            dot1.style.background = currentIndex === 1 ? "white" : "rgba(255,255,255,0.4)";
          }
        };

        document.getElementById("prevImgBtn")?.addEventListener("click", () => {
          currentIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
          updateSlider();
        });

        document.getElementById("nextImgBtn")?.addEventListener("click", () => {
          currentIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
          updateSlider();
        });

        document.getElementById("closeSwalBtn")?.addEventListener("click", () => {
          Swal.close();
        });
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 text-white px-5 pb-8 rounded-b-[40px] shadow-2xl"
      style={{ paddingTop: "calc(env(safe-area-inset-top) + 20px)" }}
    >
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
      <div className="absolute bottom-0 -left-10 w-32 h-32 bg-white/10 rounded-full" />

      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg">
            <FaClipboardList size={30} />
          </div>

          <div>
            <h1 className="text-3xl font-extrabold tracking-wide">TodoList</h1>
            <p className="text-sm opacity-90 mt-1">{totalTasks} công việc</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={handleNotification}
            className="relative w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg"
          >
            <FaBell size={18} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.08, rotate: 180 }}
            whileTap={{ scale: 0.92 }}
            onClick={handleRefresh}
            className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg"
          >
            <FaSyncAlt size={18} />
          </motion.button>
        </div>
      </div>

      <div className="relative z-10 mt-7 flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl">
        <FaCalendarAlt />
        <span className="text-sm font-medium">
          {today.toLocaleDateString("vi-VN", {
            weekday: "long",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </span>
      </div>
    </motion.div>
  );
}