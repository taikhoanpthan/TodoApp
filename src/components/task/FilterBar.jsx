  import { motion } from "framer-motion";

  const filters = [
    {
      key: "all",
      label: "Tất cả",
      color:
        "from-blue-500 to-indigo-500",
    },
    {
      key: "pending",
      label: "Chưa xong",
      color:
        "from-orange-400 to-orange-500",
    },
    {
      key: "completed",
      label:
        "Hoàn thành",
      color:
        "from-green-400 to-green-500",
    },
  ];

  export default function FilterBar({
    filter,
    setFilter,
  }) {
    return (
      <div className="px-4 mt-5">
        <div
          className="
            flex
            gap-3
            overflow-x-auto
            no-scrollbar
            py-1
          "
        >
          {filters.map((item) => {
            const active =
              filter === item.key;

            return (
              <motion.button
                key={item.key}
                onClick={() =>
                  setFilter(item.key)
                }
                whileTap={{
                  scale: 0.96,
                }}
                animate={{
                  scale: active
                    ? 1
                    : 0.98,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
                className={`
                  relative
                  px-5
                  py-3
                  rounded-2xl
                  whitespace-nowrap
                  font-semibold
                  text-sm
                  overflow-hidden
                  border
                  flex-shrink-0
                  transition-all
                  duration-300
                  will-change-transform
                  ${
                    active
                      ? "text-white border-transparent shadow-lg"
                      : "bg-white/80 text-gray-700 border-gray-200 shadow-sm"
                  }
                `}
                style={{
                  WebkitTapHighlightColor:
                    "transparent",
                }}
              >
                {/* ACTIVE BG */}

                {active && (
                  <motion.div
                    layoutId="activeFilter"
                    className={`
                      absolute
                      inset-0
                      bg-gradient-to-r
                      ${item.color}
                    `}
                    transition={{
                      type: "spring",
                      stiffness: 280,
                      damping: 26,
                    }}
                    style={{
                      borderRadius: 18,
                    }}
                  />
                )}

                {/* TEXT */}

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
