
interface BoxAssistantProps {
  children?: React.ReactNode;
  slots?: Record<string, React.ReactNode>;
}

function BOX_assistant({ children }: BoxAssistantProps) {
  return (
    <>

      {children}
    </>
  )
}

export default BOX_assistant










// import Button from 'COMP/RCMP_button_V00.04'
// import { ReactNode, useState } from 'react'
// import Envimng from "COMP/RCMP_envimngr_v00.04"
// import ParaAssigner from "COMP/RCMP_bioicon_V00.04/paraAssist"
// import ParaEditor from 'COMP/RCMP_bioicon_V00.04/paraEdit'
// import { initDyna } from 'PLAY/RPLY_dynaCtrl_V00.04/dynaCtrl'

// // تعریف اینترفیس برای پراپ‌ها
// interface AssistantProps {
//   children?: ReactNode;
//   geo?: any;
//   logic?: any;
//   meta?: any;
//   style?: any;
// }

// function BOX_assistant({ children, geo, logic, meta, style }: AssistantProps) {
//   const [isAssistant, setIsAssistant] = useState<boolean>(false)
//   const [isEditor, setIsEditor] = useState<boolean>(false)
//   const [parametr, setParametr] = useState<"meta" | "geo" | "log" | "style">("meta")
//   const { envi } = initDyna();
//   const currentId = envi?.ENVI_GLOB?.globalState?.assistant?.id;
//   const realData = currentId ? envi?.ENVI_GLOB?.globalState?.[currentId] : {};

//   // داده‌های نمونه برای تست - می‌توانید با داده‌های واقعی جایگزین کنید
//   const actualData = {
//     geo: geo || realData?.geo || { width: "100px", height: "100px" },
//     logic: logic || realData?.logic || { id: currentId || "no-id", isAssistant: true },
//     meta: meta || realData?.meta || { title: "Component", version: "1.0.0" },
//     style: style || realData?.style || { color: "#000", fontSize: "16px" }
//   }

//   return (
//     <>
//       <div className='flex gap-1 p-1'>
//         <Button
//           className='flex-1'
//           variant={isAssistant ? "outlined" : "filled"}
//           buttunTitle="ENVI manager"
//           onClick={() => setIsAssistant(!isAssistant)}
//         />
//         <Button
//           className='flex-1'
//           variant={isEditor ? "outlined" : "filled"}
//           buttunTitle="Editor"
//           onClick={() => setIsEditor(!isEditor)}
//         />
//       </div>

//       {
//         !isAssistant && (
//           <div className='flex items-center gap-1 px-1'>
//             <Button
//               variant={parametr === "meta" ? "filled" : 'outlined'}
//               buttunTitle="meta"
//               fullWidth
//               onClick={() => setParametr("meta")}
//             />
//             <Button
//               variant={parametr === "geo" ? "filled" : 'outlined'}
//               buttunTitle="geo"
//               fullWidth
//               onClick={() => setParametr("geo")}
//             />
//             <Button
//               variant={parametr === "log" ? "filled" : 'outlined'}
//               buttunTitle="logic"
//               fullWidth
//               onClick={() => setParametr("log")}
//             />
//             <Button
//               variant={parametr === "style" ? "filled" : 'outlined'}
//               buttunTitle="style"
//               fullWidth
//               onClick={() => setParametr("style")}
//             />
//           </div>
//         )
//       }

//       {/* نمایش کامپوننت‌ها بر اساس حالت */}
//       <div className='flex-1 p-1'>
//         {isAssistant ? (
//           <Envimng />
//         ) : isEditor ? (
//           <ParaEditor
//             selectedTab={parametr}
//             geo={actualData.geo}
//             logic={actualData.logic}
//             meta={actualData.meta}
//             style={actualData.style}
//           />
//         ) : (
//           <ParaAssigner logic={actualData.logic} />
//         )}
//       </div>

//       {children}

//     </>
//   )
// }

// export default BOX_assistant