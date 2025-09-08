import { ReactNode } from "react";
import Jini from "./BOX_Jinni";
const BOX_actionn = ({ children }: { children?: ReactNode }) => {
  return (
    <div className=" flex flex-col w-9/12 h-full bg-light text-dark lg:rounded-md custom-scrollbar overflow-y-auto ">
      <Jini />
      {children}
    </div>
  );
};

export default BOX_actionn;
