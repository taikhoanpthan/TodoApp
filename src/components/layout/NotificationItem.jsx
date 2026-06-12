export default function NotificationItem({
  item,
}) {
  return (
    <div
      className="
      p-4
      border
      rounded-2xl
      bg-white
      mb-3
    "
    >
      <h3 className="font-bold text-gray-800">
        {item.title}
      </h3>

      <p className="text-sm text-gray-500 mt-1">
        {item.content}
      </p>
    </div>
  );
}D