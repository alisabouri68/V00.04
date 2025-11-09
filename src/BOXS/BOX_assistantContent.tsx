import { ReactNode } from "react";

function BOX_assistantContent({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-center border-red-600 min-w-full min-h-full">
      {children}
    </div>
  );
}

export default BOX_assistantContent;
