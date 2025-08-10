import PanelMan from '../../ACTR/RACT_panelman/index';
export default function Index() {

  return (
    <PanelMan
      actionChild={<p>home</p>}
      assistantChild={<p>HOME</p>}
      console="HOME"
      auxilaryChild={<>HOME</>}
    />
  );
}