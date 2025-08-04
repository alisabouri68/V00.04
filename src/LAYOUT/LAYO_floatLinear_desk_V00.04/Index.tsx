import { ReactNode } from "react"

const Index = ({ children, floatLDeskStyle }: { children: ReactNode, floatLDeskStyle?: string }) => {
  return (
    <div className={floatLDeskStyle}>
      {children}
    </div>
  )
}

export default Index