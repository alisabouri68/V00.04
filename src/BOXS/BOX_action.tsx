import { ReactNode } from "react";
const BOX_action = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 overflow-y-auto custom-scrollbar w-full h-full rounded-md ">
      {children}
    </div>
  );
};

export default BOX_action;
