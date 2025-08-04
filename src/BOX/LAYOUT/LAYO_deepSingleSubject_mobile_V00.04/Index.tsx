import { ReactNode } from "react"

const Index = ({ children, deepSMobileStyle }: { children: ReactNode, deepSMobileStyle?: string }) => {
  return (
    <div className={deepSMobileStyle}>
      {children}
    </div>
  )
}

export default Index