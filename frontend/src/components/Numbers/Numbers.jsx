import { useAtom } from 'jotai';
import cn from 'classnames'
import './Numbers.css';
import { modeAtom } from '../../state/atoms';

const Numbers = () => {
  const [mode] = useAtom(modeAtom);

  const btnClass = cn({
    'btn-number': mode === 'runtime',
    'btn-number__constructor': mode === 'constructor'
  });

  return (
    <div className={cn('btn-numbers-group', {
      'btn-number-group__constructor': mode === 'constructor',
    })}>
      <button className={btnClass} >7</button>
      <button className={btnClass}>8</button>
      <button className={btnClass}>9</button>
      <button className={btnClass}>4</button>
      <button className={btnClass}>5</button>
      <button className={btnClass}>6</button>
      <button className={btnClass}>1</button>
      <button className={btnClass}>2</button>
      <button className={btnClass}>3</button>
      <button className={`btn-number__zero ${btnClass}`}>0</button>
      <button className={btnClass}>,</button>
    </div>
  )
};

export default Numbers;
