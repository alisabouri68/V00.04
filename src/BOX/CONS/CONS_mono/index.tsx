import PanelMan from '../../ACTR/RACT_panelman/index'

export default function index() {
  return (
    <PanelMan
      actionChild={<p>action child content MONO</p>}
      assistantChild={<p>assistant child content MONO</p>}
      console='MONO'
      auxilaryChild={<p>assistant child content MONO</p>} />
  )
}
