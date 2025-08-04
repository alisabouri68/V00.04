import { ReactNode } from "react"

const Index = ({ children, deepSDeskStyle }: { children: ReactNode, deepSDeskStyle?: string }) => {
  return (
    <div className={deepSDeskStyle}>
      {children}
    </div>
  )
}

export default Index