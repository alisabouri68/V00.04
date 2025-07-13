// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Slider from "../COMP/RCMP_swiper/swiper";
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
    <Slider />
  </div>
  <div className="flex flex-col gap-2 p-2">
    {children}
  </div>
</div>

  );
}




export default Index;

//  {/* Buttons grid */}
//   <div className="flex items-center justify-around  w-full p-4">
//     <button>
//       <span>
//         <FontAwesomeIcon icon={faAngleLeft} className="text-lg" />
//       </span>
//     </button>
//     {Array(8)
//       .fill(null)
//       .map((_, i) => (
//         <button
//           key={i}
//           className="group flex items-center justify-between gap-2 p-1 px-3 border border-gray-200 rounded-lg
//                   hover:bg-gradient-to-r hover:bg-primary
//                   hover:text-white hover:shadow-lg hover:border-transparent
//                   transition-all duration-300 transform hover:-translate-y-1
//                   focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
//         >
//           <span className="text-gray-500 group-hover:text-white transition-colors">
//             <FontAwesomeIcon icon={faFile} className="text-lg" />
//           </span>
//           <span className="text-sm text-gray-600 group-hover:text-white font-medium transition-colors">
//             Content {i + 1}
//           </span>
//         </button>
//       ))}
//       <FontAwesomeIcon icon={faAngleRight} className="text-lg" />
//   </div>
