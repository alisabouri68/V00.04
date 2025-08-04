import { ReactNode } from "react"

const Index = ({ children, monoMobileStyle }: { children: ReactNode, monoMobileStyle?: string }) => {
  return (
    <div className={monoMobileStyle}>
      {children}
    </div>
  )
}

export default Index