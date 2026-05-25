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
      }, 1200);
    }, 4200);

    return () =>
      clearTimeout(timer);
  }, []);

  const loadingTexts = [
    "Initializing workspace...",
    "Loading tasks...",
    "Preparing dashboard...",
    "Almost ready...",
  ];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: "blur(12px)",
          }}
          transition={{
            duration: 1,
          }}
          className="fixed inset-0 z-[999999] overflow-hidden bg-[#050816] flex items-center justify-center"
        >
          {/* MESH BACKGROUND */}

          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-indigo-500/10 to-violet-500/20" />

          {/* BLUR CIRCLES */}

          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              x: [0, 40, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
            }}
            className="absolute top-[-120px] right-[-120px] w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-3xl"
          />

          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              x: [0, -30, 0],
              y: [0, 40, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
            }}
            className="absolute bottom-[-150px] left-[-150px] w-[520px] h-[520px] rounded-full bg-violet-500/20 blur-3xl"
          />

          {/* PARTICLES */}

          {[...Array(18)].map(
            (_, index) => (
              <motion.div
                key={index}
                animate={{
                  y: [
                    0,
                    -80,
                    0,
                  ],
                  opacity: [
                    0.2,
                    1,
                    0.2,
                  ],
                }}
                transition={{
                  duration:
                    3 +
                    index * 0.2,
                  repeat: Infinity,
                  delay:
                    index * 0.15,
                }}
                className="absolute rounded-full bg-white"
                style={{
                  width:
                    Math.random() *
                      6 +
                    2,
                  height:
                    Math.random() *
                      6 +
                    2,
                  left: `${
                    Math.random() *
                    100
                  }%`,
                  top: `${
                    Math.random() *
                    100
                  }%`,
                  opacity: 0.4,
                }}
              />
            )
          )}

          {/* MAIN CARD */}

          <motion.div
            initial={{
              opacity: 0,
              y: 40,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 1,
              type: "spring",
            }}
            className="relative z-20 w-[92%] max-w-xl"
          >
            <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/10 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.45)] p-10">
              {/* GLOW */}

              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

              {/* LOGO */}

              <motion.div
                initial={{
                  rotate: -180,
                  scale: 0,
                }}
                animate={{
                  rotate: 0,
                  scale: 1,
                }}
                transition={{
                  duration: 1,
                  type: "spring",
                }}
                className="relative mx-auto w-28 h-28 rounded-[30px] bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-[0_10px_40px_rgba(59,130,246,.5)]"
              >
                <motion.div
                  animate={{
                    rotate: [
                      0,
                      10,
                      -10,
                      0,
                    ],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 5,
                  }}
                  className="text-5xl"
                >
                  📋
                </motion.div>
              </motion.div>

              {/* TITLE */}

              <motion.h1
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.5,
                }}
                className="mt-8 text-center text-5xl font-black tracking-tight text-white"
              >
                Task Manager
              </motion.h1>

              {/* SUB */}

              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: 0.8,
                }}
                className="mt-4 text-center text-gray-300 leading-8 text-lg"
              >
                Modern workspace for
                productivity & focus ✨
              </motion.p>

              {/* LOADING TEXT */}

              <div className="mt-10 space-y-4">
                {loadingTexts.map(
                  (
                    text,
                    index
                  ) => (
                    <motion.div
                      key={text}
                      initial={{
                        opacity: 0,
                        x: -20,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay:
                          1 +
                          index * 0.4,
                      }}
                      className="flex items-center gap-4"
                    >
                      <motion.div
                        animate={{
                          scale: [
                            1,
                            1.4,
                            1,
                          ],
                        }}
                        transition={{
                          repeat:
                            Infinity,
                          duration: 1,
                          delay:
                            index * 0.2,
                        }}
                        className="w-3 h-3 rounded-full bg-blue-400"
                      />

                      <span className="text-gray-200 text-sm tracking-wide">
                        {text}
                      </span>
                    </motion.div>
                  )
                )}
              </div>

              {/* LOADING BAR */}

              <div className="mt-10 h-3 rounded-full overflow-hidden bg-white/10">
                <motion.div
                  initial={{
                    width: 0,
                  }}
                  animate={{
                    width: "100%",
                  }}
                  transition={{
                    duration: 3.5,
                    ease: "easeInOut",
                  }}
                  className="h-full rounded-full bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400"
                />
              </div>

              {/* FOOTER */}

              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: 2,
                }}
                className="mt-8 text-center text-xs tracking-[4px] text-gray-400 uppercase"
              >
                Premium Productivity
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}