import { ReactNode } from "react"

const Index = ({ children,staticMobileStyle }: { children: ReactNode;staticMobileStyle:string }) => {
  return (
    <div className={staticMobileStyle}>
      {children}
    </div>
  )
}

export default Index
