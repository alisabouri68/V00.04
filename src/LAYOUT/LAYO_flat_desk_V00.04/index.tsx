import { ReactNode } from "react"

const Index = ({ children, flatDeskStyle }: { children: ReactNode, flatDeskStyle?: string }) => {
  return (
    <div className={flatDeskStyle}>
      {children}
    </div>
  )
}

export default Index