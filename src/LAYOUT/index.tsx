import HeaderBox from "../BOX/BOX_header";
import NavigatorVar2 from "../COMP/RCMP_navigator_VAR.02_V00.04";
import NavigatorVar1 from "../COMP/RCMP_navigator_VAR.01_V00.04";
import { ReactNode } from "react";

export default function index({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col w-full h-full overflow-hidden bg-gray-300 dark:bg-gray-500">
      <HeaderBox />
      <div className="w-full h-full flex flex-col 2xl:container 2xl:mx-auto overflow-hidden">
        <div className="flex items-center h-full w-full px-0.5 flex-1 overflow-hidden">
          <nav className="min-w-20 max-w-20 hidden lg:flex h-full px-0.5 py-1 ">
            <NavigatorVar1 />
          </nav>
          <div className="w-full h-full flex overflow-hidden g-1 p-1">{children}</div>
        </div>
        <nav className="w-full lg:hidden flex min-h-20 max-h-20">
          <NavigatorVar2 />
        </nav>
      </div>
    </div>
  );
}
