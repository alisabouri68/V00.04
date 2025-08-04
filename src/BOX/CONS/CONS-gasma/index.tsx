import { FC } from 'react'
import PanelMan from '../../ACTR/RACT_panelman/index'
import Desktop_Flat from '../../LAYOUT/LAYO_flat_mobile_V00.04'
import ServicePicker from '../../COMP/RCMP_servicePicker_VAR.01_V00.04'
import BundelWraper from "../../BNDL/WRAP_gasma/index"

const ContentActionGasma: FC = () => (
  <>
    <Desktop_Flat>
      <ServicePicker />
    </Desktop_Flat>
    <Desktop_Flat>
      <BundelWraper />
    </Desktop_Flat>

  </>
)
const Index: FC = () => {
  return (
    <PanelMan
      actionChild={<ContentActionGasma />}
      assistantChild={<p>assistant child content GASMA</p>}
      console='GASMA'
      auxilaryChild={<p>assistant child content GASMA</p>}
    />
  )
}

export default Index