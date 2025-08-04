import { ReactNode } from "react"

const Index = ({ children, lexiMobilekStyle }: { children: ReactNode, lexiMobilekStyle?: string }) => {
  return (
    <div className={lexiMobilekStyle}>
      {children}
    </div>
  )
}

export default Index