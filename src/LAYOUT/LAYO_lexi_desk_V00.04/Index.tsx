import { ReactNode } from "react"

const Index = ({ children, lexideskStyle }: { children: ReactNode, lexideskStyle?: string }) => {
  return (
    <div className={lexideskStyle}>
      {children}
    </div>
  )
}

export default Index