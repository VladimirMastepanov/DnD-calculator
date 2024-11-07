import { useAtom } from 'jotai';
import { modeAtom } from '../../state/atoms';
import cn from 'classnames'
import './Equal.css';

const Equal = () => {
const [mode] = useAtom(modeAtom);

  return (
    <div className={cn('btn-equal', {
      'btn-equal__constructor': mode === 'constructor',
    })}>
      <button className={cn('equal', {
        'equal__constructor': mode === 'constructor',
      })}>=</button>
    </div>
  )
};

export default Equal;
