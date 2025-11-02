import { ReactNode, useEffect } from "react"
import { motion } from "framer-motion"

function BOX_actionContent({ children }: { children: ReactNode }) {
  // 🔍 برای بررسی mount/unmount
  useEffect(() => {
    console.log("✅ BOX_actionContent mounted")
    return () => {
      console.log("🧹 BOX_actionContent unmounted")
    }
  }, [])

  return (
    <motion.div
      key="box-action-content"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1, transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] } }}
      exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.25 } }}
      className="w-full h-full flex items-center justify-center p-3"
    >
      {children ? (
        children
      ) : (
        <div className="text-gray-400 text-sm flex flex-col items-center gap-2">
          ⚙️ محتوای اکشن در دسترس نیست
        </div>
      )}
    </motion.div>
  )
}

export default BOX_actionContent
