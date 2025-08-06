import PanelMan from '../../ACTR/RACT_panelman/index';
import { useInputContext } from 'Context'

export default function Index() {
  const { value,onChange } = useInputContext();

  return (
    <PanelMan
      actionChild={<p>{value}</p>}
      assistantChild={<>
        <p>{value}</p>
        <input className='text-black rounded-lg' type="text" value={value} onChange={onChange} />
      </>}
      console={value}
      auxilaryChild={<p>{value}</p>}
    />
  );
}