import { ReactNode } from "react"

const Index = ({ children, monoDeskStyle }: { children: ReactNode, monoDeskStyle?: string }) => {
    return (
        <div className={monoDeskStyle}>
            {children}
        </div>
    )
}

export default Index