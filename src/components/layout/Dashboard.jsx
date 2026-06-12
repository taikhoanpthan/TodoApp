import { motion } from "framer-motion";

export default function Dashboard({
  total,
  completed,
  pending,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="px-4 mt-5"
    >
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-3xl p-4 shadow-md">
          <p className="text-xs text-gray-400">
            Tổng việc
          </p>

          <h2 className="text-3xl font-bold">
            {total}
          </h2>
        </div>

        <div className="bg-green-500 rounded-3xl p-4 text-white">
          <p className="text-xs">
            Hoàn thành
          </p>

          <h2 className="text-3xl font-bold">
            {completed}
          </h2>
        </div>

        <div className="bg-orange-400 rounded-3xl p-4 text-white">
          <p className="text-xs">
            Chưa xong
          </p>

          <h2 className="text-3xl font-bold">
            {pending}
          </h2>
        </div>
      </div>
    </motion.div>
  );
}