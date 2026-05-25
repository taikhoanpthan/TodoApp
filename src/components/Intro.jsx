// Intro.jsx

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Intro({ onFinish }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);

      setTimeout(() => {
        onFinish();
      }, 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[999999] bg-[#050816] flex items-center justify-center"
        >
          <div className="flex flex-col items-center gap-6">
            {/* LOGO */}
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
                ease: "linear",
              }}
              className="w-14 h-14 rounded-full border-4 border-blue-500 border-t-transparent"
            />

            {/* TEXT */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-white text-xl font-semibold tracking-wide"
            >
              Loading...
            </motion.h1>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
