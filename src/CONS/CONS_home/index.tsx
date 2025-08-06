import PanelMan from '../../ACTR/RACT_panelman/index';
import { useInputContext } from 'Context'

export default function Index() {
  const { value, onChange } = useInputContext();

  return (
    <PanelMan
      actionChild={<>
        <p>{value}</p>
        <input className='text-black rounded-lg' type="text" value={value} onChange={onChange} />
      </>}
      assistantChild={<p>{value}</p>}
      console={value}
      auxilaryChild={<>
        <p>{value}</p>
        <input className='text-black rounded-lg' type="text" value={value} onChange={onChange} />
      </>}
    />
  );
}