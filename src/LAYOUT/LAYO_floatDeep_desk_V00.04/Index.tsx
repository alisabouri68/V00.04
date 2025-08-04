import { ReactNode } from "react"

const Index = ({ children, floatDDeskStyle }: { children: ReactNode, floatDDeskStyle?: string }) => {
  return (
    <div className={floatDDeskStyle}>
      {children}
    </div>
  )
}

export default Index