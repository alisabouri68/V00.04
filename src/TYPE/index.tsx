import type { ReactNode } from "react";

export interface LayoutConfig {
    header?: boolean;
    aside?: boolean;
    action?: boolean;
    auxilary?: boolean;
    jini?: boolean;
}
export interface RoutsType {
    id?: string;
    path?: string;
    element?: ReactNode;
    auth?: boolean;
    layout?: LayoutConfig;
    children?: RoutsType[];
}
