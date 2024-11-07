import { useAtom } from 'jotai';
import { modeAtom } from '../../state/atoms';
import cn from 'classnames'
import './Operations.css';

const Operations = () => {
const [mode] = useAtom(modeAtom);

const btnClass = cn({
  'btn-operation': mode === 'runtime',
  'btn-operation__constructor': mode === 'constructor'
})
  return (
    <div className={cn('btn-operations-group',{
      'btn-operations-group__constructor': mode === 'constructor',
    })} >
    <button className={btnClass}>/</button>
    <button className={btnClass}>x</button>
    <button className={btnClass}>-</button>
    <button className={btnClass}>+</button>
  </div>
  )
}

export default Operations;
