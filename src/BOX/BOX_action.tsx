import { ReactNode } from "react";
const BOX_actionn = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="flex items-center w-full h-full gap-1">
      {children}
    </div>
  );
};

export default BOX_actionn;
