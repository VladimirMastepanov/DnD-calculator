import { useAtom } from 'jotai';
import { modeAtom, MODES } from '../../state/atoms';
import cn from 'classnames'
import './Equal.css';

const Equal = () => {
const [mode] = useAtom(modeAtom);

  return (
    <div className={cn('btn-equal', {
      'btn-equal__constructor': mode === MODES.CONSTRUCTOR,
    })}>
      <button className={cn('equal', {
        'equal__constructor': mode === MODES.CONSTRUCTOR,
      })}>=</button>
    </div>
  )
};

export default Equal;
