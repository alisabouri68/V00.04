import { ReactNode } from "react";

function BOX_assistantContent({ children }: { children: ReactNode }) {
  return (
    <div className="flex bg-white dark:bg-gray-800 min-w-full min-h-full">
      {children}
    </div>
  );
}

export default BOX_assistantContent;
