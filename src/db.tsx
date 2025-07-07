import { LiaHomeSolid } from "react-icons/lia";
import { LiaPhoneVolumeSolid } from "react-icons/lia";
import { TbCurrentLocation } from "react-icons/tb";
import { IoBriefcaseOutline } from "react-icons/io5";
import { RiVoiceprintFill } from "react-icons/ri";
interface DataNav {
id:string
title:string
icon:React.ReactNode
  href:string
  isActive?:boolean
}
export const dataNav: DataNav[] = [
  {
    id: '1',
    title: 'home',
    icon: <LiaHomeSolid />,
    href: '/',
    
  },
  {
    id: '2',
    title: 'comm',
    icon: <LiaPhoneVolumeSolid />,
    href: '/comm',
  },
  {
    id: '3',
    title: 'desk',
    icon: <IoBriefcaseOutline />,
    href: '/desk',
  },
  {
    id: '4',
    title: 'cast',
    icon: <RiVoiceprintFill />,
    href: '/cast',
  },
  {
    id: '5',
    title: 'hot',
    icon: <TbCurrentLocation />,
    href: '/hot',
  },
];
