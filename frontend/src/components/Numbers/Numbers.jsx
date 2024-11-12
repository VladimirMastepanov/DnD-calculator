import { memo } from 'react';
import { useAtom } from 'jotai';
import cn from 'classnames'
import './Numbers.css';
import { modeAtom, MODES, displayValueAtom } from '../../state/atoms';

const Numbers = () => {
  const [mode] = useAtom(modeAtom);
  const [displayValue, setDisplayValue] = useAtom(displayValueAtom);

  const btnClass = cn({
    'btn-number': mode === MODES.RUNTIME,
    'btn-number__constructor': mode === MODES.CONSTRUCTOR
  });

  const isOperators = (value) => ['+', '-', '*', '/'].includes(value);

  const displayMapping = (value) => {
    setDisplayValue((previousValue) => {
      if (previousValue === '0' && !isOperators(value)) {
        return value;
      }
      if (previousValue.length >= 15) {
        return previousValue;
      }
      return `${previousValue}${value}`;
    })
  };

  const pressNumber = (e) => {
    if (mode === MODES.RUNTIME && e.target.value && displayValue !== 'Bad idea') {
      const actualValue = e.target.value;
      displayMapping(actualValue);
    }
  };

  const handleClear = () => setDisplayValue('0');

  return (
    <div onClick={pressNumber} className={cn('btn-numbers-group', {
      'btn-number-group__constructor': mode === MODES.CONSTRUCTOR,
    })}>
      <button className={btnClass} value='7'>7</button>
      <button className={btnClass} value='8'>8</button>
      <button className={btnClass} value='9'>9</button>
      <button className={btnClass} value='4'>4</button>
      <button className={btnClass} value='5'>5</button>
      <button className={btnClass} value='6'>6</button>
      <button className={btnClass} value='1'>1</button>
      <button className={btnClass} value='2'>2</button>
      <button className={btnClass} value='3'>3</button>
      <button className={`btn-number__zero ${btnClass}`} value='0'>0</button>
      <button className={btnClass} onClick={handleClear} >AC</button>
    </div>
  )
};

export default memo(Numbers);
