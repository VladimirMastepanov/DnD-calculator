import './SwitchPanel.css';
import { useAtom } from 'jotai';
import cn from 'classnames';
import { modeAtom } from '../../state/atoms';

const SwitchPanel = () => {
const [mode, setMode] = useAtom(modeAtom)

const handleSetConstructorMode = () => setMode('constructor')

const handleSetRuntimeMode = () => setMode('runtime')

  return (
    <div className="mode-switch-panel">

      <button onClick={handleSetConstructorMode} className={cn('mode-button-constructor', {
        'mode-button-constructor__selected': mode === 'constructor',
      })}>
        <span className="icon">💻</span> Constructor
      </button>
      <button onClick={handleSetRuntimeMode} className={cn('mode-button-runtime', {
        'mode-button-runtime__selected': mode === 'runtime',
      })}>
        <span className="icon">👁️</span> Runtime
      </button>
    </div>
  )
};

export default SwitchPanel;
