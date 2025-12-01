// types/flowbite-react.d.ts
declare module 'flowbite-react' {
  import { ComponentType, ReactNode, MouseEvent, ChangeEvent, HTMLAttributes } from 'react';
  
  export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    color?: 'blue' | 'gray' | 'red' | 'yellow' | 'green' | 'purple' | 'pink' | 'light' | 'dark' | 'failure' | 'success' | 'warning' | 'info';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    gradientDuoTone?: 'purpleToBlue' | 'cyanToBlue' | 'greenToBlue' | 'purpleToPink' | 'pinkToOrange' | 'tealToLime' | 'redToYellow';
    href?: string;
    target?: string;
    disabled?: boolean;
    className?: string;
  }
  
  export const Button: ComponentType<ButtonProps>;
  
  export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    horizontal?: boolean;
    className?: string;
  }
  
  export const Card: ComponentType<CardProps>;
  
  export interface ModalProps {
    show: boolean;
    onClose: () => void;
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';
    children?: ReactNode;
    className?: string;
  }
  
  export const Modal: ComponentType<ModalProps> & {
    Header: ComponentType<{ children?: ReactNode; className?: string; }>;
    Body: ComponentType<{ children?: ReactNode; className?: string; }>;
    Footer: ComponentType<{ children?: ReactNode; className?: string; }>;
  };
  
  export interface TableProps extends HTMLAttributes<HTMLTableElement> {
    hoverable?: boolean;
    className?: string;
  }
  
  export const Table: ComponentType<TableProps> & {
    Head: ComponentType<{ children?: ReactNode; className?: string; }>;
    Body: ComponentType<{ children?: ReactNode; className?: string; }>;
    Row: ComponentType<{ children?: ReactNode; className?: string; onClick?:()=>void}>;
    Cell: ComponentType<{ children?: ReactNode; className?: string; }>;
    HeadCell: ComponentType<{ children?: ReactNode; className?: string; }>;
  };
  
  export interface TextInputProps extends HTMLAttributes<HTMLInputElement> {
    value?: string;
    defaultValue?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    icon?: ComponentType<any>;
    className?: string;
  }
  
  export const TextInput: ComponentType<TextInputProps>;
  
  export interface SelectProps extends HTMLAttributes<HTMLSelectElement> {
    value?: string;
    onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
    icon?: ComponentType<any>;
    className?: string;
  }
  
  export const Select: ComponentType<SelectProps>;
  
  export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    color?: 'info' | 'gray' | 'red' | 'green' | 'yellow' | 'purple' | 'pink' | 'blue' | 'dark' | 'light' | 'success' | 'failure' | 'warning';
    size?: 'xs' | 'sm';
    icon?: ComponentType<any>;
    className?: string;
  }
  
  export const Badge: ComponentType<BadgeProps>;
  
  export interface TabsProps {
    children: ReactNode;
    'aria-label': string;
    style?: 'default' | 'underline' | 'pills' | 'fullWidth';
    onActiveTabChange?: (tabIndex: number) => void;
    className?: string;
  }
  
  export const Tabs: ComponentType<TabsProps> & {
    Group: ComponentType<TabsProps>;
    Item: ComponentType<{
      active?: boolean;
      title: string;
      icon?: ComponentType<any>;
      children?: ReactNode;
      className?: string;
    }>;
  };
  
  export interface SpinnerProps {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    color?: 'gray' | 'red' | 'green' | 'yellow' | 'purple' | 'pink' | 'blue';
    'aria-label'?: string;
    className?: string;
  }
  
  export const Spinner: ComponentType<SpinnerProps>;
  
  export interface AlertProps {
    color?: 'info' | 'gray' | 'red' | 'green' | 'yellow' | 'purple' | 'pink' | 'blue' | 'dark' | 'light' | 'success' | 'failure' | 'warning';
    icon?: ComponentType<any>;
    children?: ReactNode;
    className?: string;
  }
  
  export const Alert: ComponentType<AlertProps>;
}