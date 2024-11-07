import './Display.css';
import { useAtom } from 'jotai';
import { displayValueAtom, modeAtom } from '../../state/atoms.js';
import cn from 'classnames';

const Display = () => {
const [displayValue] = useAtom(displayValueAtom);
const [mode] = useAtom(modeAtom);



  return (
    <div className={cn('display-container', {
      'display-container__constructor': mode === 'constructor',
    })}>
      <div className="display">{displayValue}</div>
    </div>
  )
};

export default Display;
