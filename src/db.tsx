import { LiaHomeSolid } from "react-icons/lia";
import { LiaPhoneVolumeSolid } from "react-icons/lia";
import { TbCurrentLocation } from "react-icons/tb";
import { IoBriefcaseOutline } from "react-icons/io5";
import { RiVoiceprintFill } from "react-icons/ri";
import { DataNav } from "TYPE";
import { BasketItemType } from "TYPE";
import { BiMessageSquareAdd } from "react-icons/bi";
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

export const basketItem: BasketItemType[] = [
  {
    id: "1", title: "Quick Access", items: [{
      id: '1',
      title: 'home',
      icon: <LiaHomeSolid />,
      href: '/',
    },
    {
      id: '2',
      title: 'hot',
      icon: <TbCurrentLocation />,
      href: '/hot',
    },
    {
      id: '3',
      title: '',
      icon: <BiMessageSquareAdd />,
      href: '',
    },
    {
      id: '4',
      title: '',
      icon: <BiMessageSquareAdd />,
      href: '',
    },
    {
      id: '5',
      title: '',
      icon: <BiMessageSquareAdd />,
      href: '',
    },
    {
      id: '6',
      title: '',
      icon: <BiMessageSquareAdd />,
      href: '',
    },
    {
      id: '7',
      title: '',
      icon: <BiMessageSquareAdd />,
      href: '',
    },
    {
      id: '8',
      title: '',
      icon: <BiMessageSquareAdd />,
      href: '',
    },
    ],
  },
  { id: "2", title: "Community", items: dataNav, },
  { id: "3", title: "Mono Services", items: dataNav, },
  { id: "4", title: "Generals", items: dataNav, },
]