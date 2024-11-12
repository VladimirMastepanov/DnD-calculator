import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css'
import SwitchPanel from './components/SwitchPanel/SwitchPanel.jsx';
import CalculatorArea from './components/CalculatorArea/CalculatorArea.jsx';
import DraggableComponentsList from './components/DraggebleComponentsList.jsx';



const App = () => {

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div className="app">
          <SwitchPanel />
          <div className="layout">
            <div className="constructor-panel">
              <DraggableComponentsList />
            </div>
            <CalculatorArea />
          </div>
        </div>
      </DndProvider>
    </>
  )
};

export default App;
