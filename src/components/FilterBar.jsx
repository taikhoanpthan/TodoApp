export default function FilterBar({
  filter,
  setFilter,
}) {
  return (
    <div className="flex gap-2 px-4 mt-4 overflow-auto pb-2">
      <button
        onClick={() =>
          setFilter("all")
        }
        className={`px-4 py-2 rounded-2xl whitespace-nowrap font-semibold ${
          filter === "all"
            ? "bg-blue-500 text-white"
            : "bg-white"
        }`}
      >
        Tất cả
      </button>

      <button
        onClick={() =>
          setFilter("pending")
        }
        className={`px-4 py-2 rounded-2xl whitespace-nowrap font-semibold ${
          filter === "pending"
            ? "bg-orange-500 text-white"
            : "bg-white"
        }`}
      >
        Chưa xong
      </button>

      <button
        onClick={() =>
          setFilter("completed")
        }
        className={`px-4 py-2 rounded-2xl whitespace-nowrap font-semibold ${
          filter === "completed"
            ? "bg-green-500 text-white"
            : "bg-white"
        }`}
      >
        Hoàn thành
      </button>
    </div>
  );
}