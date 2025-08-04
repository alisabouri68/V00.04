import PanelMan from '../../ACTR/RACT_panelman/index'

export default function index() {
  return (
    <PanelMan 
    actionChild={<p>action child content HOT</p>}
     assistantChild={<p>assistant child content HOT</p>}
      console='HOT'
       auxilaryChild={<p>assistant child content HOT</p>} />
  )
}
