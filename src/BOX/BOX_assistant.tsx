
import Button from 'COMP/RCMP_button_V00.04'
import { ReactNode, useState } from 'react'
import Envimng from "COMP/RCMP_envimngr_v00.04"
import ParaAssigner from "COMP/RCMP_bioicon_V00.04/paraAssist"
function BOX_assistant({ children }: { children?: ReactNode }) {
  const [isAssistant, setIsAssistant] = useState<boolean>(false)
  return (
    <div className='flex flex-col w-3/12 h-full bg-light text-dark overflow-y-auto custom-scrollbar  rounded-md gap-1'>
      <Button className='my-1 mx-2' variant={isAssistant ? "outlined" : "filled"} buttunTitle="ENVI maneger" onClick={() => setIsAssistant(!isAssistant)} />
      {isAssistant ? <Envimng />:<ParaAssigner/>}
      {children}
    </div>
  )
}

export default BOX_assistant