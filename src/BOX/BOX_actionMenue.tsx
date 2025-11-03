// import BioIcon from "COMP/RCMP_bioicon_V00.04"
import { ReactNode } from "react"
// import { FaCog, FaHome, FaSearch } from "react-icons/fa"
// import { FaBell, FaUser } from "react-icons/fa6"

function BOX_actiomMenue({ children }: { children?: ReactNode }) {
  // const iconConfigs = [
  //   {
  //     id: "home-icon",
  //     icon: <FaHome />,
  //     title: "Home",
  //     geo: { width: "24px", height: "24px" },
  //     style: { fontSize: "20px", color: "#3b82f6", cursor: "pointer" }
  //   },
  //   {
  //     id: "search-icon", 
  //     icon: <FaSearch />,
  //     title: "Search",
  //     geo: { width: "24px", height: "24px" },
  //     style: { fontSize: "18px", color: "#10b981", cursor: "pointer" }
  //   },
  //   {
  //     id: "user-icon",
  //     icon: <FaUser />,
  //     title: "Profile",
  //     geo: { width: "24px", height: "24px" },
  //     style: { fontSize: "19px", color: "#8b5cf6", cursor: "pointer" }
  //   },
  //   {
  //     id: "settings-icon",
  //     icon: <FaCog />,
  //     title: "Settings",
  //     geo: { width: "24px", height: "24px" },
  //     style: { fontSize: "20px", color: "#f59e0b", cursor: "pointer" }
  //   },
  //   {
  //     id: "notifications-icon",
  //     icon: <FaBell />,
  //     title: "Notifications",
  //     geo: { width: "24px", height: "24px" },
  //     style: { fontSize: "18px", color: "#ef4444", cursor: "pointer" }
  //   }
  // ];

  return (
    // <div className="flex items-center justify-between gap-3 py-3 w-full ">

    //   <div className="flex items-center justify-between gap-4 p-4 bg-gray-50 rounded-lg w-full">
    //     {iconConfigs.map((config) => (
    //       <div key={config.id} className="flex flex-col items-center">
    //         <BioIcon
    //           geo={config.geo}
    //           logic={{ 
    //             onClick: 1, 
    //             id: config.id, 
    //             isAssistant: false, 
    //             addToLocall: false 
    //           }}
    //           style={config.style}
    //         >
    //           {config.icon}
    //         </BioIcon>
    //         <span className="text-xs mt-1 text-gray-600">{config.title}</span>
    //       </div>
    //     ))}
    //   </div> 

    //   {/* محتوای children */}
    //   <div className="flex-1">
    <>
      {children}
    </>
    //   </div>
    // </div>
  )
}

export default BOX_actiomMenue