import PanelMan from '../../ACTR/RACT_panelman/index'

export default function index() {
  return (
    <PanelMan
      actionChild={<p>action child content HOME</p>}
      assistantChild={<p>assistant child content HOME</p>}
      console='HOME'
      auxilaryChild={<p>assistant child content HOME</p>} />
  )
}
