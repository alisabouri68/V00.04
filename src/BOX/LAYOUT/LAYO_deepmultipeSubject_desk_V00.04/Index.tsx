import { ReactNode } from "react"

const Index = ({ children, deepMMobileStyle }: { children: ReactNode, deepMMobileStyle?: string }) => {
  return (
    <div className={deepMMobileStyle}>
      {children}
    </div>
  )
}

export default Index