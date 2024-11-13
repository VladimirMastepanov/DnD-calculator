import { memo } from 'react';
import './SwitchPanel.css';
import { useAtom } from 'jotai';
import cn from 'classnames';
import { modeAtom, MODES } from '../../state/atoms';
import ConstructorIcon from '../../icons/ConstructorIcon.jsx';
import CalculatorIcon from '../../icons/CalculatorIcon.jsx';

const SwitchPanel = () => {
  const [mode, setMode] = useAtom(modeAtom)

  const handleSetConstructorMode = () => setMode(MODES.CONSTRUCTOR);
  const handleSetRuntimeMode = () => setMode(MODES.RUNTIME);

  return (
    <div className="mode-switch-panel">

      <button onClick={handleSetConstructorMode} className={cn('mode-button-constructor', {
        'mode-button-constructor__selected': mode === MODES.CONSTRUCTOR,
      })}>
        <ConstructorIcon />
        Constructor
      </button>
      <button onClick={handleSetRuntimeMode} className={cn('mode-button-runtime', {
        'mode-button-runtime__selected': mode === MODES.RUNTIME,
      })}>
        <CalculatorIcon />
        Runtime
      </button>
    </div>
  )
};

export default memo(SwitchPanel);
