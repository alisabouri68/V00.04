import { ReactNode } from "react"

const Index = ({ children, floatMobileStyle }: { children: ReactNode, floatMobileStyle?: string }) => {
  return (
    <div className={floatMobileStyle}>
      {children}
    </div>
  )
}

export default Index