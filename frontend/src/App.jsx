import './App.css'

const App = () => {

  return (
    <>
      <div className="app">
        <div className="mode-switch">
          <button className="mode-button active">
            <span className="icon">👁️</span> Runtime
          </button>
          <button className="mode-button">
            <span className="icon">💻</span> Constructor
          </button>
        </div>

        <div className="layout">

          <div className="calculator-panel">

            <div className='display-container'>
              <div className="display">0</div>
            </div>


            <div className='btn-operations'>
              <button className="operations">/</button>
              <button className="operations">x</button>
              <button className="operations">-</button>
              <button className="operations">+</button>
            </div>


            <div className="buttons">
              <button className="btn-numbers">7</button>
              <button className="btn-numbers">8</button>
              <button className="btn-numbers">9</button>
              <button className="btn-numbers">4</button>
              <button className="btn-numbers">5</button>
              <button className="btn-numbers">6</button>
              <button className="btn-numbers">1</button>
              <button className="btn-numbers">2</button>
              <button className="btn-numbers">3</button>
              <button className="btn-numbers zero">0</button>
              <button className="btn-numbers">,</button>
            </div>

            <div className='btn-equal'>
              <button className="equal">=</button>
            </div>

          </div>

          <div className="constructor-panel">
            <p className="panel-title">Перетащите сюда</p>
            <p className="panel-subtitle">любой элемент из левой панели</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
