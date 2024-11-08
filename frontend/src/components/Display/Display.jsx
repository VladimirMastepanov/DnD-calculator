import './Display.css';
import { useAtom } from 'jotai';
import { displayValueAtom, modeAtom, MODES } from '../../state/atoms.js';
import cn from 'classnames';

const Display = () => {
const [displayValue] = useAtom(displayValueAtom);
const [mode] = useAtom(modeAtom);



  return (
    <div className={cn('display-container', {
      'display-container__constructor': mode === MODES.CONSTRUCTOR,
    })}>
      <div className="display">{displayValue}</div>
    </div>
  )
};

export default Display;
