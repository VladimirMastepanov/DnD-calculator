import { memo } from 'react';
import './SwitchPanel.css';
import { useAtom } from 'jotai';
import cn from 'classnames';
import { modeAtom, MODES } from '../../state/atoms';

const SwitchPanel = () => {
const [mode, setMode] = useAtom(modeAtom)

const handleSetConstructorMode = () => setMode(MODES.CONSTRUCTOR);


const handleSetRuntimeMode = () => setMode(MODES.RUNTIME);

  return (
    <div className="mode-switch-panel">

      <button onClick={handleSetConstructorMode} className={cn('mode-button-constructor', {
        'mode-button-constructor__selected': mode === MODES.CONSTRUCTOR,
      })}>
        <span className="icon">💻</span> Constructor
      </button>
      <button onClick={handleSetRuntimeMode} className={cn('mode-button-runtime', {
        'mode-button-runtime__selected': mode === MODES.RUNTIME,
      })}>
        <span className="icon">👁️</span> Runtime
      </button>
    </div>
  )
};

export default memo(SwitchPanel);
