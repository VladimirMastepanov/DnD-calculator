import './SwitchPanel.css';

const SwitchPanel = () => {
  return (
    <div className="mode-switch-panel">

      <button className="mode-button-constructor mode-button-constructor__selected">
        <span className="icon">💻</span> Constructor
      </button>
      <button className="mode-button-runtime">
        <span className="icon">👁️</span> Runtime
      </button>
    </div>
  )
};

export default SwitchPanel;
