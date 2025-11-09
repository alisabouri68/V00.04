import { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

export default function ParentChildDiagram() {
  const [childMessage, setChildMessage] = useState("");
  const [parentMessage, setParentMessage] = useState("");
  const [sendingToChild, setSendingToChild] = useState(false);
  const [sendingToParent, setSendingToParent] = useState(false);
  const [flowId, setFlowId] = useState(0);
  const [auto, setAuto] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => {
      triggerSendToChild();
    }, 2000);
    return () => clearInterval(t);
  }, [auto]);

  function triggerSendToChild() {
    const messages = [
      "Child: State updated!",
      "Child: New data received!",
      "Child: Processing complete!",
      "Child: Task finished!"
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    setChildMessage(randomMessage);
    setFlowId((id) => id + 1);
    setSendingToChild(true);
    setTimeout(() => setSendingToChild(false), 800);
  }

  function triggerSendToParent() {
    const messages = [
      "Parent: State updated!",
      "Parent: Data processed!",
      "Parent: Action completed!",
      "Parent: New state set!"
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    setParentMessage(randomMessage);
    setFlowId((id) => id + 1);
    setSendingToParent(true);
    setTimeout(() => setSendingToParent(false), 800);
  }

  const bubbleVariantsToChild: Variants = {
    initial: { opacity: 0, x: 0, y: 0, scale: 0.6 },
    animate: {
      opacity: 1,
      x: 220,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.6,
      transition: { duration: 0.25 },
    },
  };

  const bubbleVariantsToParent: Variants = {
    initial: { opacity: 0, x: 0, y: 0, scale: 0.6 },
    animate: {
      opacity: 1,
      x: -220,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.6,
      transition: { duration: 0.25 },
    },
  };

  return (
    <div className={`${dark ? "dark" : ""}`}>
      <div className="min-h-screen flex items-start justify-center bg-slate-50 dark:bg-slate-900 p-6 transition-colors duration-500">
        <div className="w-full max-w-4xl bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-slate-100 dark:border-slate-700 transition-colors duration-500">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
              SET (Without Props) — Diagram
            </h2>

            <div className="flex gap-2 items-center">
              <label className="text-sm text-slate-600 dark:text-slate-300">
                Auto send
              </label>
              <button
                onClick={() => setAuto((a) => !a)}
                className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                  auto
                    ? "bg-sky-600 text-white border-sky-600"
                    : "bg-white dark:bg-slate-700 dark:text-slate-200 text-slate-700 border-slate-300 dark:border-slate-600"
                }`}
              >
                {auto ? "On" : "Off"}
              </button>
              <button
                onClick={triggerSendToChild}
                className="px-3 py-1 rounded-full bg-indigo-600 text-white text-sm shadow-sm hover:bg-indigo-700"
              >
                Send to Child
              </button>
              <button
                onClick={triggerSendToParent}
                className="px-3 py-1 rounded-full bg-emerald-600 text-white text-sm shadow-sm hover:bg-emerald-700"
              >
                Send to Parent
              </button>
              <button
                onClick={() => {
                  setChildMessage("");
                  setParentMessage("");
                  setFlowId((i) => i + 1);
                }}
                className="px-3 py-1 rounded-full border text-sm dark:border-slate-600 dark:text-slate-200"
              >
                Reset
              </button>
              <button
                onClick={() => setDark((d) => !d)}
                className="px-3 py-1 rounded-full border text-sm dark:border-slate-600 dark:text-slate-200"
              >
                {dark ? "Light" : "Dark"}
              </button>
            </div>
          </div>

          {/* Diagram */}
          <div className="relative h-56 bg-gradient-to-b from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-lg border border-slate-100 dark:border-slate-700 p-4 overflow-hidden transition-colors">
            {/* Parent */}
            <div
              className="absolute left-6 top-10 w-40 h-28 rounded-2xl border-2 flex flex-col items-center justify-center transition-colors"
              style={{ borderColor: sendingToParent ? "#10b981" : undefined }}
            >
              <motion.div
                animate={{ scale: sendingToParent ? 1.03 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="text-center p-2"
              >
                <div className="text-sm text-slate-500 dark:text-slate-300">
                  Parent Component
                </div>
                <div className="mt-1 text-xs text-slate-400 dark:text-slate-400">
                  state / context
                </div>
                {parentMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="mt-2 px-2 py-1 bg-emerald-50 dark:bg-emerald-900/40 rounded-full text-sm font-medium border dark:border-emerald-700"
                  >
                    <span className="text-emerald-700 dark:text-emerald-300">
                      {parentMessage}
                    </span>
                  </motion.div>
                )}
              </motion.div>
            </div>

            {/* Child */}
            <div
              className="absolute right-6 top-10 w-40 h-28 rounded-2xl border-2 flex flex-col items-center justify-center transition-colors"
              style={{ borderColor: sendingToChild ? "#7c3aed" : undefined }}
            >
              <motion.div
                animate={{ scale: sendingToChild ? 1.03 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="text-center p-2"
              >
                <div className="text-sm text-slate-500 dark:text-slate-300">
                  Child Component
                </div>
                <div className="mt-1 text-xs text-slate-400 dark:text-slate-400">
                  state / context
                </div>
                {childMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="mt-2 px-2 py-1 bg-indigo-50 dark:bg-indigo-900/40 rounded-full text-sm font-medium border dark:border-indigo-700"
                  >
                    <span className="text-indigo-700 dark:text-indigo-300">
                      {childMessage}
                    </span>
                  </motion.div>
                )}
              </motion.div>
            </div>

            {/* Arrow to Child */}
            <svg
              className="absolute left-44 top-22 w-48 h-20 pointer-events-none"
              viewBox="0 0 220 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.95" />
                </linearGradient>
              </defs>
              <path
                d="M10 40 C70 10, 150 10, 210 40"
                stroke="url(#g1)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M200 36 L210 40 L200 44"
                stroke="url(#g1)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>

            {/* Arrow to Parent */}
            <svg
              className="absolute right-44 top-22 w-48 h-20 pointer-events-none"
              viewBox="0 0 220 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="g2" x1="1" y1="0" x2="0" y2="0">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.95" />
                </linearGradient>
              </defs>
              <path
                d="M210 40 C150 70, 70 70, 10 40"
                stroke="url(#g2)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20 36 L10 40 L20 44"
                stroke="url(#g2)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>

            {/* Animated bubble to Child */}
            <div className="absolute left-44 top-8 w-52 h-32 pointer-events-none">
              <AnimatePresence>
                {sendingToChild && (
                  <motion.div
                    key={`to-child-${flowId}`}
                    variants={bubbleVariantsToChild}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute left-0 top-8 rounded-full px-3 py-1 border shadow-sm bg-white/90 dark:bg-slate-700/90 backdrop-blur-sm flex items-center gap-2 dark:border-slate-600"
                  >
                    <div className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse" />
                    <div className="text-sm font-medium text-slate-700 dark:text-slate-100">
                      Parent → Child
                    </div>
                    <div className="text-xs text-slate-400 dark:text-slate-300">
                      Without Props
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Animated bubble to Parent */}
            <div className="absolute right-44 top-8 w-52 h-32 pointer-events-none">
              <AnimatePresence>
                {sendingToParent && (
                  <motion.div
                    key={`to-parent-${flowId}`}
                    variants={bubbleVariantsToParent}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute right-0 top-8 rounded-full px-3 py-1 border shadow-sm bg-white/90 dark:bg-slate-700/90 backdrop-blur-sm flex items-center gap-2 dark:border-slate-600"
                  >
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                    <div className="text-sm font-medium text-slate-700 dark:text-slate-100">
                      Child → Parent
                    </div>
                    <div className="text-xs text-slate-400 dark:text-slate-300">
                      Without Props
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Legend */}
            <div className="absolute left-6 bottom-4 text-xs text-slate-500 dark:text-slate-400">
              <div>
                Click the buttons to see the two-way communication between Parent and Child without using Props.
              </div>
            </div>
          </div>

          {/* Info Panels */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg dark:border-slate-600">
              <div className="text-sm font-semibold mb-2 text-slate-700 dark:text-slate-200">
                Communication Methods Without Props
              </div>
              <ol className="text-sm text-slate-600 dark:text-slate-300 list-decimal ml-4 space-y-1">
                <li>Using Context API for state sharing</li>
                <li>Using state management libraries like Redux</li>
                <li>Using event bus or pub/sub pattern</li>
                <li>Using callback functions through context</li>
                <li>Using custom hooks for shared state</li>
              </ol>
            </div>

            <div className="p-4 border rounded-lg dark:border-slate-600">
              <div className="text-sm font-semibold mb-2 text-slate-700 dark:text-slate-200">
                Benefits of Communication Without Props
              </div>
              <ul className="text-sm text-slate-600 dark:text-slate-300 list-disc ml-4 space-y-1">
                <li>Reduced complexity and prop drilling depth</li>
                <li>Fewer unnecessary re-renders</li>
                <li>Centralized state management</li>
                <li>Ability to use state in multiple components</li>
                <li>Easier code refactoring and maintenance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}