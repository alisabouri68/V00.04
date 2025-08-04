import { ReactNode } from "react"

const Index = ({ children , staticDeskStyle }: { children: ReactNode,staticDeskStyle?:string }) => {
  return (
    <div className={staticDeskStyle}>
      {children}
    </div>
  )
}

export default Index
