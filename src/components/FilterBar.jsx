import { motion } from "framer-motion";

const filters = [
  {
    key: "all",
    label: "Tất cả",
    color: "bg-blue-500",
  },
  {
    key: "pending",
    label: "Chưa xong",
    color: "bg-orange-500",
  },
  {
    key: "completed",
    label: "Hoàn thành",
    color: "bg-green-500",
  },
];

export default function FilterBar({
  filter,
  setFilter,
}) {
  return (
    <div className="px-4 mt-5">
      <div className="relative flex gap-2 overflow-x-auto pb-2">
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
                scale: 0.92,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 18,
              }}
              className={`
                relative
                px-5
                py-2.5
                rounded-2xl
                whitespace-nowrap
                font-semibold
                overflow-hidden
                backdrop-blur-xl
                border
                transition-all
                duration-300
                shadow-sm
                ${
                  active
                    ? "text-white border-white/20"
                    : "bg-white/70 text-gray-700 border-white/40"
                }
              `}
            >
              {/* Liquid Background */}
              {active && (
                <motion.div
                  layoutId="liquidFilter"
                  className={`
                    absolute
                    inset-0
                    ${item.color}
                  `}
                  transition={{
                    type: "spring",
                    bounce: 0.28,
                    duration: 0.6,
                  }}
                  style={{
                    borderRadius: 18,
                  }}
                />
              )}

              {/* Glow */}
              {active && (
                <motion.div
                  layoutId="glow"
                  className="absolute inset-0 opacity-40 blur-xl bg-white"
                />
              )}

              {/* Text */}
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