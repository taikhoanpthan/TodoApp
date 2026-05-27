
import {
  FaTrash,
  FaCheckCircle,
  FaClock,
  FaUser,
  FaEye,
  FaEdit,
} from "react-icons/fa";

import { motion } from "framer-motion";
import Swal from "sweetalert2";

export default function TaskCard({
  task,
  onDelete,
  onToggle,
  onEdit,
}) {
  // =========================
  // VIEW DETAIL
  // =========================

  const handleViewDetail = () => {
    Swal.fire({
      width: 560,

      showConfirmButton: false,

      background: "transparent",

      padding: 12,

      scrollbarPadding: false,

      html: `
        <div style="
          position:relative;
          overflow:hidden;
          border-radius:36px;
