import { FaClipboard } from "react-icons/fa";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center mt-20 text-gray-400 px-4 text-center">
      <div className="bg-white p-6 rounded-full shadow-lg mb-4">
        <FaClipboard size={40} />
      </div>

      <h2 className="text-xl font-bold">
        Chưa có công việc
      </h2>

      <p className="mt-2 text-sm">
        Hãy tạo công việc đầu tiên
      </p>
    </div>
  );
}