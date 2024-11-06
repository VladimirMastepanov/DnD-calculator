import './Display.css';
import { useAtom } from 'jotai';
import { displayValueAtom } from '../../state/atoms.js';


const Display = () => {
const [displayValue] = useAtom(displayValueAtom);

  return (
    <div className='display-container'>
      <div className="display">{displayValue}</div>
    </div>
  )
};

export default Display;
