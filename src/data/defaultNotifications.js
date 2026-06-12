const defaultNotifications = [
  {
    id: 1,
    title: "Cập nhật hệ thống",
    content: "Đã thêm tính năng chỉnh sửa công việc.",
    createdAt: new Date().toISOString(),
    read: false,
  },
  {
    id: 2,
    title: "Thông báo mới",
    content: "Bạn có 3 công việc chưa hoàn thành.",
    createdAt: new Date().toISOString(),
    read: false,
  },
];

export default defaultNotifications;