import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} from "../services/api";

export default function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] =
    useState(false);

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const data =
        await getTasks();

      setTasks(
        data.reverse()
      );
    } catch {
      toast.error(
        "Không tải được dữ liệu"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    setTasks,
    loading,
    fetchTasks,
  };
}