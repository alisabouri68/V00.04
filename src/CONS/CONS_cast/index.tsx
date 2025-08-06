import PanelMan from '../../ACTR/RACT_panelman/index';
import { useInputContext } from 'Context'

export default function Index() {
  const { value } = useInputContext();

  return (
    <PanelMan
      actionChild={<p>{value}</p>}
      assistantChild={<p>{value}</p>}
      console={value}
      auxilaryChild={<p>{value}</p>}
    />
  );
}