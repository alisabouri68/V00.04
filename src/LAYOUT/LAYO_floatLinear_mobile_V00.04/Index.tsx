import { ReactNode } from "react"

const Index = ({ children, floatLMobileStyle }: { children: ReactNode, floatLMobileStyle?: string }) => {
  return (
    <div className={floatLMobileStyle}>
      {children}
    </div>
  )
}

export default Index