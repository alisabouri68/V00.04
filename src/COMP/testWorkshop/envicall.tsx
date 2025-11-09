import { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { initDyna } from "../../PLAY/RPLY_dynaCtrl_V00.04/dynaCtrl";

export default function ENVIProfileDiagram() {
  const { envi, reconfigDyna } = initDyna();
  const [currentAction, setCurrentAction] = useState("");
  const [gettingValue, setGettingValue] = useState(false);
  const [settingValue, setSettingValue] = useState(false);
  const [flowId, setFlowId] = useState(0);
  const [auto, setAuto] = useState(true);
  const [updateCounter, setUpdateCounter] = useState(0);
  const [isDark, setIsDark] = useState(false);

  // Auto-detect system theme
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDark(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Auto-update only on ENVI_Profile
  useEffect(() => {
    if (!auto) return;
    
    const interval = setInterval(() => {
      changeAllProfileValues();
    }, 3000);

    return () => clearInterval(interval);
  }, [auto, envi]);

  const changeAllProfileValues = () => {
    const newProfile = {
      username: `user_${Math.random().toString(36).substring(2, 8)}`,
      displayName: `User ${Math.floor(Math.random() * 1000)}`,
      role: ["admin", "user", "editor", "viewer"][Math.floor(Math.random() * 4)],
      email: `user${Math.floor(Math.random() * 1000)}@example.com`,
      lastLogin: new Date().toISOString()
    };

    setCurrentAction("Changing all ENVI_Profile values...");
    setSettingValue(true);
    setFlowId((id) => id + 1);

    setTimeout(() => {
      reconfigDyna({
        ENVI_Profile: newProfile
      });
      setSettingValue(false);
      setUpdateCounter(prev => prev + 1);
    }, 800);
  };

  const triggerGetProfile = () => {
    setCurrentAction("Reading all ENVI_Profile values...");
    setGettingValue(true);
    setFlowId((id) => id + 1);

    setTimeout(() => {
      setGettingValue(false);
    }, 800);
  };

  const triggerSetProfile = () => {
    changeAllProfileValues();
  };

  const getBubbleVariants: Variants = {
    initial: { opacity: 0, x: 0, y: 0, scale: 0.6 },
    animate: {
      opacity: 1,
      x: 220,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.6,
      transition: { duration: 0.2 },
    },
  };

  const setBubbleVariants: Variants = {
    initial: { opacity: 0, x: 0, y: 0, scale: 0.6 },
    animate: {
      opacity: 1,
      x: -220,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.6,
      transition: { duration: 0.2 },
    },
  };

  return (
    <div>
      <div className="min-h-screen flex items-start justify-center bg-slate-50 dark:bg-gray-800 p-6">
        <div className="w-full max-w-4xl bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-slate-100 dark:border-slate-700 transition-colors duration-500">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
              ENVI_Profile — Change All Values
            </h2>
            <div className="flex gap-2 items-center">
              <div className="flex items-center gap-2">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Changes: <span className="font-mono">{updateCounter}</span>
                </div>
                <label className="text-sm text-slate-600 dark:text-slate-300">
                  Auto mode
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
              </div>
              <button
                onClick={triggerGetProfile}
                className="px-3 py-1 rounded-full bg-green-600 text-white text-sm shadow-sm hover:bg-green-700"
              >
                Read Values
              </button>
              <button
                onClick={triggerSetProfile}
                className="px-3 py-1 rounded-full bg-blue-600 text-white text-sm shadow-sm hover:bg-blue-700"
              >
                Change Values
              </button>
            </div>
          </div>

          {/* Status */}
          {auto && (
            <div className="mb-4 flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Auto mode active - values change every 3 seconds
            </div>
          )}

          {/* Current Action */}
          {currentAction && (
            <div className="mb-4 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <div className={`w-2 h-2 rounded-full ${
                    gettingValue ? 'bg-green-500' : 'bg-blue-500'
                  } animate-pulse`}></div>
                  {currentAction}
                </div>
              </div>
            </div>
          )}

          {/* Diagram */}
          <div className="relative h-80 bg-gradient-to-b from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-lg border border-slate-100 dark:border-slate-700 p-4 overflow-hidden transition-colors">

            {/* Global ENVI State */}
            <div className="absolute left-6 top-8 w-64 h-64 rounded-2xl border-2 border-purple-500 bg-purple-50 dark:bg-purple-900/20 flex flex-col items-center justify-center p-4">
              <div className="text-sm font-medium text-purple-700 dark:text-purple-300 mb-3">
                ENVI_Profile State
              </div>
              <div className="text-xs text-purple-600 dark:text-purple-400 space-y-2 w-full">
                {envi.ENVI_Profile ? (
                  Object.entries(envi.ENVI_Profile).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="font-medium">{key}:</span>
                      <span className="font-mono bg-white dark:bg-slate-800 px-2 py-1 rounded text-xs max-w-[120px] truncate">
                        {String(value)}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-purple-400 dark:text-purple-500">
                    ENVI_Profile does not exist
                  </div>
                )}
              </div>
            </div>

            {/* Component */}
            <div className="absolute right-6 top-8 w-48 h-40 rounded-2xl border-2 border-orange-500 bg-orange-50 dark:bg-orange-900/20 flex flex-col items-center justify-center p-4">
              <div className="text-sm font-medium text-orange-700 dark:text-orange-300 mb-2">
                Component
              </div>
              <div className="text-xs text-orange-600 dark:text-orange-400 text-center font-mono bg-white dark:bg-slate-800 p-2 rounded">
                const {"{envi, reconfigDyna}"} = initDyna()
              </div>
            </div>

            {/* Arrow for GET */}
            <svg
              className="absolute left-80 top-24 w-40 h-20 pointer-events-none"
              viewBox="0 0 180 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="getGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.95" />
                </linearGradient>
              </defs>
              <path
                d="M10 40 C50 10, 130 10, 170 40"
                stroke="url(#getGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M160 36 L170 40 L160 44"
                stroke="url(#getGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>

            {/* Arrow for SET */}
            <svg
              className="absolute right-60 top-24 w-40 h-20 pointer-events-none"
              viewBox="0 0 180 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="setGradient" x1="1" y1="0" x2="0" y2="0">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.95" />
                </linearGradient>
              </defs>
              <path
                d="M170 40 C130 70, 50 70, 10 40"
                stroke="url(#setGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20 36 L10 40 L20 44"
                stroke="url(#setGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>

            {/* Animated bubble - GET */}
            <div className="absolute left-80 top-8 w-44 h-32 pointer-events-none">
              <AnimatePresence>
                {gettingValue && (
                  <motion.div
                    key={`get-${flowId}`}
                    variants={getBubbleVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute left-0 top-8 rounded-full px-3 py-2 border shadow-sm bg-white/90 dark:bg-slate-700/90 backdrop-blur-sm flex items-center gap-2 dark:border-slate-600"
                  >
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                    <div>
                      <div className="text-sm font-medium text-slate-700 dark:text-slate-100">
                        GET
                      </div>
                      <div className="text-xs text-slate-400 dark:text-slate-300">
                        ENVI_Profile.*
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Animated bubble - SET */}
            <div className="absolute right-60 top-8 w-44 h-32 pointer-events-none">
              <AnimatePresence>
                {settingValue && (
                  <motion.div
                    key={`set-${flowId}`}
                    variants={setBubbleVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute right-0 top-8 rounded-full px-3 py-2 border shadow-sm bg-white/90 dark:bg-slate-700/90 backdrop-blur-sm flex items-center gap-2 dark:border-slate-600"
                  >
                    <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
                    <div>
                      <div className="text-sm font-medium text-slate-700 dark:text-slate-100">
                        SET
                      </div>
                      <div className="text-xs text-slate-400 dark:text-slate-300">
                        reconfigDyna()
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Legend */}
            <div className="absolute left-6 bottom-4 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex gap-4">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Read all ENVI_Profile values</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Change all ENVI_Profile values</span>
                </div>
              </div>
            </div>
          </div>

          {/* Current Values Table */}
          <div className="mt-6 p-4 border rounded-lg bg-slate-50 dark:bg-slate-700/50">
            <div className="text-sm font-semibold mb-3 text-slate-700 dark:text-slate-200">
              Current ENVI_Profile Values
            </div>
            <div className="grid grid-cols-2 gap-4">
              {envi.ENVI_Profile ? (
                Object.entries(envi.ENVI_Profile).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-2 bg-white dark:bg-slate-800 rounded border dark:border-slate-600">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{key}:</span>
                    <span className="text-sm font-mono text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">
                      {String(value)}
                    </span>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center text-slate-500 dark:text-slate-400 py-4">
                  ENVI_Profile does not exist
                </div>
              )}
            </div>
          </div>

          {/* Code Example */}
          <div className="mt-6 p-4 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
            <div className="text-sm font-semibold mb-2 text-blue-700 dark:text-blue-300">
              Sample Code for Changing ENVI_Profile
            </div>
            <pre className="text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 p-3 rounded overflow-x-auto">
{`// Change all ENVI_Profile values
reconfigDyna({
  ENVI_Profile: {
    username: "user_new",
    displayName: "New User", 
    role: "admin",
    email: "new@example.com",
    lastLogin: new Date().toISOString()
  }
});

// Or change a specific value
reconfigDyna({
  ENVI_Profile: {
    role: "editor"
  }
});`}
            </pre>
          </div>

        </div>
      </div>
    </div>
  );
}