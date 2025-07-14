// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Slider from "../COMP/old/RCMP_swiper/swiper";
// import {
//   faAngleLeft,
//   faAngleRight,
//   faFile,
// } from "@fortawesome/free-solid-svg-icons";
import { ReactNode } from "react";
function Index({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-[calc(100vh-80px)] overflow-y-auto flex flex-col my-custom-card custom-scrollbar">
      <div className="h-48 w-full shrink-0 overflow-hidden">
        {/* <Slider /> */}
      </div>
      <div className="flex flex-col gap-2 p-2">{children}</div>
    </div>
  );
}

export default Index;
