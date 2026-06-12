import {
  FaClipboardList,
  FaCalendarAlt,
  FaSyncAlt,
  FaBell,
} from "react-icons/fa";

import { motion } from "framer-motion";
import Swal from "sweetalert2";

import useNotifications from "../../hooks/useNotifications";

export default function Header({
  totalTasks = 0,
}) {
  const today = new Date();

  const {
    notifications,
    unreadCount,
    addNotification,
    clearNotifications,
  } = useNotifications();

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleNotification = () => {
    Swal.fire({
      width: 650,
      showConfirmButton: false,
      background: "transparent",

      html: `
        <div
          style="
            background:white;
            border-radius:28px;
            overflow:hidden;
            text-align:left;
            box-shadow:0 20px 50px rgba(0,0,0,.15);
          "
        >

          <div
            style="
              padding:22px;
              background:linear-gradient(
                135deg,
                #3b82f6,
                #6366f1
              );
              color:white;
            "
          >
            <h2
              style="
                margin:0;
                font-size:24px;
                font-weight:700;
              "
            >
              🔔 Thông báo
            </h2>

            <p
              style="
                margin-top:8px;
                opacity:.9;
              "
            >
              Tổng cộng ${notifications.length} thông báo
            </p>
          </div>

          <div
            style="
              max-height:400px;
              overflow-y:auto;
              padding:20px;
            "
          >

            ${
              notifications.length > 0
                ? notifications
                    .map(
                      (item) => `
                  <div
                    style="
                      border:1px solid #e5e7eb;
                      border-radius:18px;
                      padding:16px;
                      margin-bottom:12px;
                    "
                  >
                    <div
                      style="
                        font-size:16px;
                        font-weight:700;
                        color:#111827;
                      "
                    >
                      ${item.title}
                    </div>

                    <div
                      style="
                        margin-top:6px;
                        color:#6b7280;
                        font-size:14px;
                      "
                    >
                      ${item.content}
                    </div>

                    <div
                      style="
                        margin-top:8px;
                        color:#9ca3af;
                        font-size:12px;
                      "
                    >
                      ${new Date(
                        item.createdAt
                      ).toLocaleString(
                        "vi-VN"
                      )}
                    </div>
                  </div>
                `
                    )
                    .join("")
                : `
                  <div
                    style="
                      text-align:center;
                      color:#9ca3af;
                      padding:40px;
                    "
                  >
                    Chưa có thông báo nào
                  </div>
                `
            }

          </div>

          <div
            style="
              display:grid;
              grid-template-columns:
                1fr 1fr 1fr;
              gap:10px;
              padding:20px;
              border-top:1px solid #e5e7eb;
            "
          >

            <button
              id="addNotification"
              style="
                height:50px;
                border:none;
                border-radius:14px;
                background:#3b82f6;
                color:white;
                font-weight:700;
                cursor:pointer;
              "
            >
              ➕ Thêm
            </button>

            <button
              id="clearNotification"
              style="
                height:50px;
                border:none;
                border-radius:14px;
                background:#ef4444;
                color:white;
                font-weight:700;
                cursor:pointer;
              "
            >
              🗑 Xóa hết
            </button>

            <button
              id="closeNotification"
              style="
                height:50px;
                border:none;
                border-radius:14px;
                background:#f3f4f6;
                color:#374151;
                font-weight:700;
                cursor:pointer;
              "
            >
              Đóng
            </button>

          </div>

        </div>
      `,

      didOpen: () => {
        document
          .getElementById(
            "closeNotification"
          )
          ?.addEventListener(
            "click",
            () => Swal.close()
          );

        document
          .getElementById(
            "clearNotification"
          )
          ?.addEventListener(
            "click",
            () => {
              clearNotifications();

              Swal.close();
            }
          );

        document
          .getElementById(
            "addNotification"
          )
          ?.addEventListener(
            "click",
            async () => {
              const result =
                await Swal.fire({
                  title:
                    "Tạo thông báo",

                  html: `
                    <input
                      id="notiTitle"
                      class="swal2-input"
                      placeholder="Tiêu đề"
                    />

                    <textarea
                      id="notiContent"
                      class="swal2-textarea"
                      placeholder="Nội dung"
                    ></textarea>
                  `,

                  showCancelButton: true,

                  confirmButtonText:
                    "Thêm",

                  cancelButtonText:
                    "Hủy",

                  preConfirm: () => ({
                    title:
                      document.getElementById(
                        "notiTitle"
                      ).value,

                    content:
                      document.getElementById(
                        "notiContent"
                      ).value,
                  }),
                });

              if (
                result.isConfirmed &&
                result.value.title &&
                result.value.content
              ) {
                addNotification({
                  title:
                    result.value.title,
                  content:
                    result.value.content,
                });

                Swal.fire({
                  icon: "success",
                  title:
                    "Đã thêm thông báo",
                  timer: 1200,
                  showConfirmButton: false,
                });
              }
            }
          );
      },
    });
  };

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
      transition={{
        duration: 0.5,
      }}
      className="
        relative
        overflow-hidden
        bg-gradient-to-br
        from-blue-500
        via-indigo-500
        to-purple-600
        text-white
        px-5
        pb-8
        rounded-b-[40px]
        shadow-2xl
      "
      style={{
        paddingTop:
          "calc(env(safe-area-inset-top) + 20px)",
      }}
    >
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />

      <div className="absolute bottom-0 -left-10 w-32 h-32 bg-white/10 rounded-full" />

      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg">
            <FaClipboardList size={30} />
          </div>

          <div>
            <h1 className="text-3xl font-extrabold tracking-wide">
              TodoList
            </h1>

            <p className="text-sm opacity-90 mt-1">
              {totalTasks} công việc
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{
              scale: 1.08,
            }}
            whileTap={{
              scale: 0.92,
            }}
            onClick={
              handleNotification
            }
            className="
              relative
              w-12
              h-12
              rounded-2xl
              bg-white/15
              backdrop-blur-md
              border
              border-white/20
              flex
              items-center
              justify-center
              shadow-lg
            "
          >
            <FaBell size={18} />

            {unreadCount > 0 && (
              <span
                className="
                  absolute
                  -top-1
                  -right-1
                  w-5
                  h-5
                  rounded-full
                  bg-red-500
                  text-white
                  text-[10px]
                  font-bold
                  flex
                  items-center
                  justify-center
                "
              >
                {unreadCount}
              </span>
            )}
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.08,
              rotate: 180,
            }}
            whileTap={{
              scale: 0.92,
            }}
            onClick={handleRefresh}
            className="
              w-12
              h-12
              rounded-2xl
              bg-white/15
              backdrop-blur-md
              border
              border-white/20
              flex
              items-center
              justify-center
              shadow-lg
            "
          >
            <FaSyncAlt size={18} />
          </motion.button>
        </div>
      </div>

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
    </motion.div>
  );
}