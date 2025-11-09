import { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { initDyna } from "../../PLAY/RPLY_dynaCtrl_V00.04/dynaCtrl";

export default function ENVIDiagram() {
  const { envi, reconfig } = initDyna();
  const [currentAction, setCurrentAction] = useState("");
  const [gettingValue, setGettingValue] = useState(false);
  const [settingValue, setSettingValue] = useState(false);
  const [flowId, setFlowId] = useState(0);
  const [auto, setAuto] = useState(true);
  const [dark, setDark] = useState(false);
  const [currentValue, setCurrentValue] = useState("");
  const [updateCounter, setUpdateCounter] = useState(0);
  const [lastUpdate, setLastUpdate] = useState("");

  // Auto-update effects based on your actual ENVI structure
  useEffect(() => {
    if (!auto) return;
    
    const intervals = [
      setInterval(() => {
        // Auto role change
        const roles = ["user", "admin", "developer", "viewer", "editor"];
        const currentRole = envi.ENVI_Profile?.role || "user";
        const newRole = roles[(roles.indexOf(currentRole) + 1) % roles.length];
        
        setCurrentAction("Auto-updating user role...");
        setCurrentValue(`reconfig({ ENVI_Profile: { role: "${newRole}" } })`);
        setSettingValue(true);
        setFlowId((id) => id + 1);
        
        setTimeout(() => {
          reconfig({ 
            ENVI_Profile: { 
              ...envi.ENVI_Profile,
              role: newRole 
            } 
          });
          setSettingValue(false);
          setUpdateCounter(prev => prev + 1);
          setLastUpdate(`Role changed to: ${newRole}`);
        }, 800);
      }, 3000),
      
      setInterval(() => {
        // Auto displayName change
        const names = ["کاربر آزمایشی", "مدیر سیستم", "توسعه دهنده", "مهمان"];
        const currentName = envi.ENVI_Profile?.displayName || "کاربر";
        const newName = names[(names.indexOf(currentName) + 1) % names.length];
        
        setCurrentAction("Auto-updating display name...");
        setCurrentValue(`reconfig({ ENVI_Profile: { displayName: "${newName}" } })`);
        setSettingValue(true);
        setFlowId((id) => id + 1);
        
        setTimeout(() => {
          reconfig({ 
            ENVI_Profile: { 
              ...envi.ENVI_Profile,
              displayName: newName 
            } 
          });
          setSettingValue(false);
          setUpdateCounter(prev => prev + 1);
          setLastUpdate(`Display name changed to: ${newName}`);
        }, 800);
      }, 3500),
      
      setInterval(() => {
        // Auto token change
        const tokens = ["fake_token_ABC123456", "fake_token_DEF789012", "fake_token_GHI345678"];
        const currentToken = envi.ENVI_HYB?.token || "fake_token_ABC123456";
        const newToken = tokens[(tokens.indexOf(currentToken) + 1) % tokens.length];
        
        setCurrentAction("Auto-updating token...");
        setCurrentValue(`reconfig({ ENVI_HYB: { token: "${newToken}" } })`);
        setSettingValue(true);
        setFlowId((id) => id + 1);
        
        setTimeout(() => {
          reconfig({ 
            ENVI_HYB: { 
              ...envi.ENVI_HYB,
              token: newToken 
            } 
          });
          setSettingValue(false);
          setUpdateCounter(prev => prev + 1);
          setLastUpdate(`Token changed to: ${newToken.substring(0, 12)}...`);
        }, 800);
      }, 4000)
    ];

    // Auto GET operations
    const getInterval = setInterval(() => {
      const getActions = [
        {
          path: "envi.ENVI_Profile.role",
          value: envi.ENVI_Profile?.role || "user",
          message: "Auto-reading user role..."
        },
        {
          path: "envi.ENVI_Profile.displayName", 
          value: envi.ENVI_Profile?.displayName || "کاربر",
          message: "Auto-reading display name..."
        },
        {
          path: "envi.ENVI_HYB.token",
          value: (envi.ENVI_HYB?.token || "none").substring(0, 12) + "...",
          message: "Auto-reading token..."
        },
        {
          path: "envi.ENVI_Profile.username",
          value: envi.ENVI_Profile?.username || "user",
          message: "Auto-reading username..."
        }
      ];

      const action = getActions[Math.floor(Math.random() * getActions.length)];
      setCurrentAction(action.message);
      setCurrentValue(`${action.path} = ${action.value}`);
      setFlowId((id) => id + 1);
      setGettingValue(true);

      setTimeout(() => {
        setGettingValue(false);
      }, 600);
    }, 2000);

    return () => {
      intervals.forEach(clearInterval);
      clearInterval(getInterval);
    };
  }, [auto, envi, reconfig]);

  const triggerGetValue = () => {
    const getActions = [
      {
        path: "envi.ENVI_Profile.role",
        value: envi.ENVI_Profile?.role || "user",
        message: "Getting user role..."
      },
      {
        path: "envi.ENVI_Profile.displayName", 
        value: envi.ENVI_Profile?.displayName || "کاربر",
        message: "Getting display name..."
      },
      {
        path: "envi.ENVI_HYB.token",
        value: (envi.ENVI_HYB?.token || "none").substring(0, 12) + "...",
        message: "Getting token..."
      },
      {
        path: "envi.ENVI_Profile.email",
        value: envi.ENVI_Profile?.email || "none",
        message: "Getting email..."
      }
    ];

    const action = getActions[Math.floor(Math.random() * getActions.length)];
    setCurrentAction(action.message);
    setCurrentValue(`${action.path} = ${action.value}`);
    setFlowId((id) => id + 1);
    setGettingValue(true);

    setTimeout(() => {
      setGettingValue(false);
    }, 800);
  };

  const triggerSetValue = () => {
    const setActions = [
      {
        path: "ENVI_Profile.role",
        value: (envi.ENVI_Profile?.role === "admin" ? "user" : "admin"),
        message: "Setting user role...",
        code: `reconfig({ ENVI_Profile: { role: "${envi.ENVI_Profile?.role === "admin" ? "user" : "admin"}" } })`
      },
      {
        path: "ENVI_Profile.displayName",
        value: `کاربر ${Date.now().toString().slice(-4)}`,
        message: "Setting display name...", 
        code: `reconfig({ ENVI_Profile: { displayName: "کاربر ${Date.now().toString().slice(-4)}" } })`
      },
      {
        path: "ENVI_HYB.token",
        value: `fake_token_${Date.now().toString().slice(-9)}`,
        message: "Setting new token...",
        code: `reconfig({ ENVI_HYB: { token: "fake_token_${Date.now().toString().slice(-9)}" } })`
      }
    ];

    const action = setActions[Math.floor(Math.random() * setActions.length)];
    setCurrentAction(action.message);
    setCurrentValue(action.code);
    setFlowId((id) => id + 1);
    setSettingValue(true);

    setTimeout(() => {
      const updateData:any = {};
      const pathParts = action.path.split('.');
      
      if (pathParts.length === 2) {
        updateData[pathParts[0]] = {
          ...envi[pathParts[0]], // Keep existing properties
          [pathParts[1]]: action.value
        };
      }
      
      reconfig(updateData);
      setSettingValue(false);
      setUpdateCounter(prev => prev + 1);
      setLastUpdate(`${pathParts[1]} changed to: ${action.value}`);
    }, 800);
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
    <div className={`${dark ? "dark" : ""}`}>
      <div className="min-h-screen flex items-start justify-center bg-slate-50 dark:bg-slate-900 p-6 transition-colors duration-500">
        <div className="w-full max-w-5xl bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-slate-100 dark:border-slate-700 transition-colors duration-500">

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
              ENVI Context — Real Structure Demo
            </h2>
            <div className="flex gap-2 items-center">
              <div className="flex items-center gap-2">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Updates: <span className="font-mono">{updateCounter}</span>
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
                onClick={triggerGetValue}
                className="px-3 py-1 rounded-full bg-green-600 text-white text-sm shadow-sm hover:bg-green-700"
              >
                Get Value
              </button>
              <button
                onClick={triggerSetValue}
                className="px-3 py-1 rounded-full bg-blue-600 text-white text-sm shadow-sm hover:bg-blue-700"
              >
                Set Value
              </button>
              <button
                onClick={() => setDark((d) => !d)}
                className="px-3 py-1 rounded-full border text-sm dark:border-slate-600 dark:text-slate-200"
              >
                {dark ? "Light" : "Dark"}
              </button>
            </div>
          </div>

          {/* Status Bar */}
          <div className="mb-4 flex items-center justify-between">
            {lastUpdate && (
              <div className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full">
                Last update: {lastUpdate}
              </div>
            )}
            {auto && (
              <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Auto mode active - values changing automatically
              </div>
            )}
          </div>

          {/* Current Action Display */}
          {currentAction && (
            <div className="mb-4 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <div className={`w-2 h-2 rounded-full ${
                    gettingValue ? 'bg-green-500' : 'bg-blue-500'
                  } animate-pulse`}></div>
                  {currentAction}
                </div>
                <div className="text-xs font-mono text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800 px-2 py-1 rounded">
                  {currentValue}
                </div>
              </div>
            </div>
          )}

          {/* Diagram */}
          <div className="relative h-64 bg-gradient-to-b from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-lg border border-slate-100 dark:border-slate-700 p-4 overflow-hidden transition-colors">

            {/* Global ENVI State */}
            <div className="absolute left-6 top-12 w-56 h-44 rounded-2xl border-2 border-purple-500 bg-purple-50 dark:bg-purple-900/20 flex flex-col items-center justify-center p-4">
              <div className="text-sm font-medium text-purple-700 dark:text-purple-300 mb-2">
                ENVI Global State
              </div>
              <div className="text-xs text-purple-600 dark:text-purple-400 space-y-1">
                <div className="flex justify-between">
                  <span>ENVI_Profile.role:</span>
                  <span className="font-mono bg-white dark:bg-slate-800 px-1 rounded text-xs">
                    {envi.ENVI_Profile?.role || "user"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>ENVI_Profile.displayName:</span>
                  <span className="font-mono bg-white dark:bg-slate-800 px-1 rounded text-xs">
                    {envi.ENVI_Profile?.displayName || "کاربر"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>ENVI_HYB.token:</span>
                  <span className="font-mono bg-white dark:bg-slate-800 px-1 rounded text-xs">
                    {(envi.ENVI_HYB?.token || "none").substring(0, 12)}...
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>ENVI_Profile.username:</span>
                  <span className="font-mono bg-white dark:bg-slate-800 px-1 rounded text-xs">
                    {envi.ENVI_Profile?.username || "user"}
                  </span>
                </div>
              </div>
            </div>

            {/* Component using initDyna */}
            <div className="absolute right-6 top-12 w-52 h-40 rounded-2xl border-2 border-orange-500 bg-orange-50 dark:bg-orange-900/20 flex flex-col items-center justify-center p-4">
              <div className="text-sm font-medium text-orange-700 dark:text-orange-300 mb-2">
                React Component
              </div>
              <div className="text-xs text-orange-600 dark:text-orange-400 text-center font-mono bg-white dark:bg-slate-800 p-2 rounded">
                const {"{envi, reconfig}"} = initDyna()
              </div>
              <div className="mt-2 text-xs text-slate-600 dark:text-slate-400 text-center">
                Real ENVI structure • Live updates
              </div>
            </div>

            {/* Arrow for GET (ENVI → Component) */}
            <svg
              className="absolute left-72 top-24 w-32 h-20 pointer-events-none"
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

            {/* Arrow for SET (Component → ENVI) */}
            <svg
              className="absolute right-72 top-24 w-32 h-20 pointer-events-none"
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

            {/* Animated bubble - GET values */}
            <div className="absolute left-72 top-12 w-44 h-32 pointer-events-none">
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
                        envi.value
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Animated bubble - SET values */}
            <div className="absolute right-72 top-12 w-44 h-32 pointer-events-none">
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
                        reconfig()
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
                  <span>GET: Read values from ENVI</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>SET: Update values with reconfig</span>
                </div>
              </div>
            </div>
          </div>

          {/* Real ENVI Structure Info */}
          <div className="mt-6 p-4 border rounded-lg dark:border-slate-600 bg-blue-50 dark:bg-blue-900/20">
            <div className="text-sm font-semibold mb-2 text-blue-700 dark:text-blue-300">
              Working with Your Actual ENVI Structure
            </div>
            <div className="text-sm text-blue-600 dark:text-blue-400 space-y-2">
              <p>This diagram uses your real ENVI structure:</p>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <strong>ENVI_Profile</strong>
                  <ul className="list-disc ml-4 mt-1">
                    <li>role: {envi.ENVI_Profile?.role}</li>
                    <li>displayName: {envi.ENVI_Profile?.displayName}</li>
                    <li>username: {envi.ENVI_Profile?.username}</li>
                    <li>email: {envi.ENVI_Profile?.email}</li>
                  </ul>
                </div>
                <div>
                  <strong>ENVI_HYB</strong>
                  <ul className="list-disc ml-4 mt-1">
                    <li>token: {(envi.ENVI_HYB?.token || "").substring(0, 12)}...</li>
                    <li>environment: {envi.ENVI_HYB?.environment}</li>
                    <li>appVersion: {envi.ENVI_HYB?.appVersion}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Code Examples */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg dark:border-slate-600">
              <div className="text-sm font-semibold mb-2 text-slate-700 dark:text-slate-200 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                GET Values - Read from ENVI
              </div>
              <pre className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 p-3 rounded overflow-x-auto">
{`// Access your actual ENVI data
const userRole = envi.ENVI_Profile.role;
const displayName = envi.ENVI_Profile.displayName;
const token = envi.ENVI_HYB.token;
const username = envi.ENVI_Profile.username;

// Use in rendering
return (
  <div>
    <h1>Welcome {envi.ENVI_Profile.displayName}</h1>
    <p>Role: {envi.ENVI_Profile.role}</p>
    <p>Username: {envi.ENVI_Profile.username}</p>
  </div>
);`}
              </pre>
            </div>

            <div className="p-4 border rounded-lg dark:border-slate-600">
              <div className="text-sm font-semibold mb-2 text-slate-700 dark:text-slate-200 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                SET Values - Update with reconfig
              </div>
              <pre className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 p-3 rounded overflow-x-auto">
{`// Update user role
reconfig({ 
  ENVI_Profile: { 
    ...envi.ENVI_Profile,
    role: "admin" 
  } 
});

// Update display name
reconfig({
  ENVI_Profile: {
    ...envi.ENVI_Profile,
    displayName: "کاربر جدید"
  }
});

// Update token
reconfig({
  ENVI_HYB: {
    ...envi.ENVI_HYB,
    token: "new_fake_token_123"
  }
});`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}