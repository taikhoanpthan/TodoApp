import { useState } from "react";
import defaultNotifications from "../data/defaultNotifications";

export default function useNotifications() {
  const [notifications, setNotifications] =
    useState(defaultNotifications);

  const addNotification = (
    title,
    content
  ) => {
    const newItem = {
      id: Date.now(),
      title,
      content,
      createdAt:
        new Date().toISOString(),
      read: false,
    };

    setNotifications((prev) => [
      newItem,
      ...prev,y
    ]);
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              read: true,
            }
          : item
      )
    );
  };

  const unreadCount =
    notifications.filter(
      (item) => !item.read
    ).length;

  return {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
  };
}