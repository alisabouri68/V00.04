// /******************************************
// Component service picker

// Last Update:    2025.07.29
// By:             APPS.68

// Description:  
// ******************************************/

// import Button from "COMP/RCMP_button_V00.04";
// import Text from "COMP/RCMP_text_VAR.01_v00.04";
// import { useMemo, useState } from "react";
// import { BsDownload } from "react-icons/bs";
// import { CgMoreVertical } from "react-icons/cg";
// import { CiFileOn, CiSquarePlus } from "react-icons/ci";
// import { HiOutlineCube } from "react-icons/hi2";
// import { IoSaveOutline } from "react-icons/io5";
// import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
// import { JSX } from "react/jsx-runtime";

// /*------------------------------------------------------------
// Meta Data

// ID:             RCMP_servicePicker
// Title:          Component Template - React Version
// Version:        V00.04
// VAR:            03 

// last-update:    D2025.07.29
// owner:          APPS.68

// Description:    

// ------------------------------------------------------------*/
// export interface ServiceItems {
//     id: string;
//     title: string;
//     icon: JSX.Element;
// }
// export interface ServiceItem {
//     id: string;
//     title: string;
//     icon: JSX.Element;
//     children: ServiceItems;
// }
// /**************************************
//  * Step 01 import dependencies - kernels
//  **************************************/
// /**************************************
//  * Step 06 - Class Component should be defined
//  *
//  **************************************/
// export default function index() {

//     const count = 6
//     const [isOpen, setIsOpen] = useState<boolean>(false);                     // Toggle dropdown
//     const [startIndex, setStartIndex] = useState<number>(0);                // Start index of visible carousel
//     const [endIndex, setEndIndex] = useState<number>(count);                    // End index of visible carousel
//     const [selectItem, setSelectItem] = useState<number>(1);
//     const allServices = useMemo(() =>
//         Array.from({ length: 3 }, (_, i) => ({
//             id: `Content-${i + 1}`,
//             title: `Content ${i + 1}`,
//             icon: <CiFileOn size={16} />,
//             children: Array.from({ length: 10 }, (_, index) => ({
//                 id: `content${i + 1} _ ${index + 1}`,
//                 title: `Content ${i + 1} _ ${index + 1}`,
//                 icon: <CiFileOn size={16} />,
//             }))
//         })),
//         []
//     );           // Currently selected item ID

//     const prevCount = startIndex;
//     const nextCount = allServices.length - endIndex;

//     const services: ServiceItems[] = useMemo(
//         () => allServices[selectItem].children.slice(startIndex, endIndex),
//         [startIndex, endIndex, allServices]
//     );

//     return (
//         <div className="w-full flex items-center">
//             <div className="border border-red-500 flex items-center justify-between grow">
//                 <Button
//                     variant="text"
//                     disabled={!prevCount}
//                     // onClick={preveSlide}
//                     size="sm"
//                     aria-label="Previous item"
//                     leftIcon={<MdKeyboardArrowLeft />}
//                     className="text-gray-700 hover:bg-gray-200 dark:hover:bg-gray-900 p-2 rounded-full transition-all duration-300 disabled:opacity-30"
//                 />

//                 {/* Middle Items */}
//                 <div className="flex items-center w-full relative">
//                     {allServices.map((service,index) => (
//                         <div key={service.id} className="grow px-0.5">
//                             <Button
//                                 size='sm'
//                                 variant={selectItem === index ? "filled" : "outlined"}
//                                 // onClick={() => selectItemHandler(index)}
//                                 leftIcon={service.icon}
//                                 title={service.title}
//                                 className="w-full text-xs truncate text-ellipsis overflow-hidden whitespace-nowrap transition-all duration-300 text-gray-500 dark:text-gray-400"
//                             >
//                                 {service.title}
//                             </Button>
//                         </div>
//                     ))}
//                 </div>


//                 <div className="flex items-center gap-1">
//                     <Button
//                         onClick={(e) => {
//                             e.stopPropagation()
//                             setIsOpen(prev => !prev);
//                         }}
//                         variant="outlined"
//                         size="xs"
//                         aria-label="More options"
//                         leftIcon={<CgMoreVertical className="text-sm" />}
//                         className={`${isOpen ? "pointer-events-none" : ""} text-gray-600 hover:bg-gray-200 p-2 rounded-full transition-all duration-300`}
//                     />
//                     <Text
//                         className={`${nextCount > 0 ? "opacity-100 visible text-white" : "opacity-0 invisible !text-transparent"
//                             } text-xs bg-primary rounded-full w-6 h-6 flex items-center justify-center shadow-sm`}>
//                         {nextCount}
//                     </Text>

//                     <Button
//                         variant="text"
//                         disabled={!nextCount}
//                         // onClick={nextSlide}
//                         size="sm"
//                         aria-label="Next item"
//                         leftIcon={<MdKeyboardArrowRight />}
//                         className="text-gray-700 hover:bg-gray-200 dark:hover:bg-gray-900 p-2 rounded-full transition-all duration-300 disabled:opacity-30"
//                     />
//                 </div>
//                 <div className="border border-red-500 flex items-center justify-evenly">
//                     <Button leftIcon={<CiSquarePlus />} variant='text' />
//                     <Button leftIcon={<HiOutlineCube />} variant='text' />
//                     <Button leftIcon={<BsDownload />} variant='text' />
//                     <Button leftIcon={<IoSaveOutline />} variant='text' /></div>
//             </div>
//         </div>
//     )
// }
