import { memo } from 'react';
import { useAtom } from 'jotai';
import { modeAtom, MODES, displayValueAtom } from '../../state/atoms';
import cn from 'classnames'
import './Operations.css';

const Operations = () => {
  const [mode] = useAtom(modeAtom);
  const [displayValue, setDisplayValue] = useAtom(displayValueAtom);

  const getButtonClassName = cn({
    'btn-operation': mode === MODES.RUNTIME,
    'btn-operation__constructor': mode === MODES.CONSTRUCTOR
  })

  const operators = ['+', '-', '*', '/'];

  const displayMapping = (value) => {
    if (
      displayValue !== '0'
      && !operators.includes(displayValue.slice(-1))
      && displayValue.length < 15
    ) {
      setDisplayValue(`${displayValue}${value}`);
    } 
  };

  const pressOperator = (e) => {
    if (mode === MODES.RUNTIME && e.target.value && displayValue !== 'Bad idea') {
      displayMapping(e.target.value);
    }
  };

  return (
    <div onClick={pressOperator} className={cn('btn-operations-group', {
      'btn-operations-group__constructor': mode === MODES.CONSTRUCTOR,
    })} >
      <button className={getButtonClassName} value='/'>/</button>
      <button className={getButtonClassName} value='*'>x</button>
      <button className={getButtonClassName} value='-'>-</button>
      <button className={getButtonClassName} value='+'>+</button>
    </div>
  )
}

export default memo(Operations);
