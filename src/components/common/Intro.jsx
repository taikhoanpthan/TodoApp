import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Intro({ onFinish }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
<<<<<<< HEAD
=======
      setTimeout(() => onFinish(), 800); // Đợi hiệu ứng exit hoàn thành mới xóa component
    }, 1000);
>>>>>>> fa7b4fb5300a8d5195ff3748558abd4e03828960

      setTimeout(() => {
        onFinish();
      }, 1000);
    }, 700);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#0b0b0b] overflow-hidden"
        >
          {/* Background Glow */}{" "}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.08)_0%,transparent_70%)]" />
          ```
          {/* Brand Name */}
          <motion.h1
            initial={{
              opacity: 0,
              y: 20,
              letterSpacing: "0.5em",
            }}
            animate={{
              opacity: 1,
              y: 0,
              letterSpacing: "0.18em",
            }}
            transition={{
              duration: 1.6,
              ease: "easeOut",
            }}
            className="
          text-[24px]
          md:text-[34px]
          font-light
          uppercase
          text-[#f2f2f2]
          text-center
          px-6
        "
          >
            Yakiuo Ishikawa Saigon
          </motion.h1>
          {/* Divider */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{
              width: 180,
              opacity: 1,
            }}
            transition={{
              duration: 1,
              delay: 0.5,
            }}
            className="h-[1px] bg-gradient-to-r from-transparent via-[#c5a059] to-transparent mt-6"
          />
          {/* Subtitle */}
          <motion.p
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 1,
              duration: 1,
            }}
            className="
          mt-6
          text-[10px]
          md:text-xs
          uppercase
          tracking-[0.45em]
          text-[#c5a059]
          text-center
        "
          >
            Service Team
          </motion.p>
          {/* Slogan */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            transition={{
              delay: 1.4,
              duration: 1,
            }}
            className="
          mt-3
          text-[11px]
          text-zinc-500
          tracking-[0.18em]
          text-center
        "
          >
            Omotenashi • Precision • Teamwork
          </motion.p>
          {/* Decorative Bottom Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{
              delay: 1.8,
              duration: 1,
            }}
            className="
          absolute
          bottom-10
          text-[9px]
          tracking-[0.3em]
          uppercase
          text-zinc-600
        "
          >
            Delivering Exceptional Hospitality
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
