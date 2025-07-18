import type { ReactNode } from "react";

export interface LayoutConfig {
  header?: boolean;
  aside?: boolean;
  screen?: boolean;
}
export interface RoutsType {
  id?: string;
  path?: string;
  element?: ReactNode;
  auth?: boolean;
  layout?: LayoutConfig;
  children?: RoutsType[];
}
export interface DataNav {
  id: string;
  title: string;
  icon: React.ReactNode;
  href: string;
}
export interface BasketItemType {
  id: string;
  title: string;
  items: DataNav[];
}
export interface HeaderProps {
  onSearch?: (query: string) => void;
  onFilterClick?: () => void;
  onCloseClick?: () => void;
  onViewChange?: (view: "grid" | "list") => void;
  title?: string;
  className?: string;
}
