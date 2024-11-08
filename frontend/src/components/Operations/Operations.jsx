import { useAtom } from 'jotai';
import { modeAtom, MODES } from '../../state/atoms';
import cn from 'classnames'
import './Operations.css';

const Operations = () => {
  const [mode] = useAtom(modeAtom);

  const btnClass = cn({
    'btn-operation': mode === MODES.RUNTIME,
    'btn-operation__constructor': mode === MODES.CONSTRUCTOR
  })
  return (
    <div className={cn('btn-operations-group', {
      'btn-operations-group__constructor': mode === MODES.CONSTRUCTOR,
    })} >
      <button className={btnClass} >/</button>
      <button className={btnClass} >x</button>
      <button className={btnClass} >-</button>
      <button className={btnClass} >+</button>
    </div>
  )
}

export default Operations;
