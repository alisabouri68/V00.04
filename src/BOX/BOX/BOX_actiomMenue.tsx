import { ReactNode } from "react"
function BOX_actiomMenue({ children }: { children: ReactNode }) {
    return (
        <div className="flex items-center justify-center py-3">
            {children}
        </div>
    )
}

export default BOX_actiomMenue
