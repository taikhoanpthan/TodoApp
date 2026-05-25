// Intro.jsx

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  useEffect,
  useState,
} from "react";

export default function Intro({
  onFinish,
}) {
  const [show, setShow] =
    useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);

      setTimeout(() => {
        onFinish();
      }, 600);
    }, 3000);

    return () =>
      clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="fixed inset-0 z-[999999] flex items-center justify-center bg-[#050816]"
        >
          {/* BACKGROUND GLOW */}

          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-violet-500/10 to-indigo-500/10" />

          {/* LOADER */}

          <div className="relative z-10 flex flex-col items-center">
            
            {/* TEXT */}

            <motion.p
              animate={{
                x: [0, 20, 32, 0],
                letterSpacing: [
                  "1px",
                  "2px",
                  "1px",
                  "2px",
                  "1px",
                ],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mb-6 text-sm tracking-[2px] text-violet-300 uppercase"
            >
              Loading
            </motion.p>

            {/* BAR */}

            <div className="relative w-24 h-4 overflow-hidden rounded-full bg-violet-300/10">
              
              {/* MAIN LOAD */}

              <motion.div
                animate={{
                  width: [
                    "16px",
                    "100%",
                    "16px",
                    "100%",
                    "16px",
                  ],
                  x: [0, 0, 64, 0, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-0 left-0 h-4 rounded-full bg-violet-500"
              >
                {/* INNER LIGHT */}

                <motion.div
                  animate={{
                    width: [
                      "16px",
                      "80%",
                      "100%",
                      "80%",
                      "16px",
                    ],
                    x: [0, 0, 0, 15, 0],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="h-full rounded-full bg-violet-200"
                />
              </motion.div>
            </div>

            {/* SUBTEXT */}

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
                delay: 0.3,
              }}
              className="mt-8 text-xs tracking-[4px] text-gray-500 uppercase"
            >
              Preparing Workspace
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
