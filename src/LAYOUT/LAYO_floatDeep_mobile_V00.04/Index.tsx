import { ReactNode } from "react"

const Index = ({ children, floatDMobilekStyle }: { children: ReactNode, floatDMobilekStyle?: string }) => {
  return (
    <div className={floatDMobilekStyle}>
      {children}
    </div>
  )
}

export default Index