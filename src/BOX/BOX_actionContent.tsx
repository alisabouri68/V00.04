import { ReactNode } from "react"
function BOX_actiomContent({ children }: { children: ReactNode }) {
    return (
        <div className="w-full h-full flex items-center justify-center p-3">
            {children}
        </div>
    )
}

export default BOX_actiomContent
