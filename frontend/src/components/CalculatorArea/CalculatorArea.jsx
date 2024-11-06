import { useDrop } from 'react-dnd';
import { useAtom } from 'jotai';
import { droppedComponentsList } from '../../state/atoms.js';
import Display from '../Display/Display.jsx';
import Operations from '../Operations/Operations.jsx';
import Numbers from '../Numbers/Numbers.jsx';
import Equal from '../Equal/Equal.jsx';
import './CalculatorArea.css';

const CalculatorArea = () => {
  const [droppedComponents, setComponents] = useAtom(droppedComponentsList);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'COMPONENT',
    drop: (item) => {
      let component;
      switch (item.componentType) {
        case 'Display':
          component = <Display key='Display' />;
          break;
        case 'Operations':
          component = <Operations key='Operations' />;
          break;
        case 'Numbers':
          component = <Numbers key='Numbers' />;
          break;
        case 'Equal':
          component = <Equal key='Equal' />;
          break;
        default:
          return;
      }
      setComponents((prev) => [...prev, component]);
      item.setDragged(true);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));



  return (
    <div
      ref={drop}
      className={`calculator-panel ${isOver ? 'hover' : ''}`}
    >
      {droppedComponents.length === 0 ? (
        <>
          <p className="calculator-panel-title">Перетащите сюда</p>
          <p className="calculator-panel-subtitle">любой элемент из левой панели</p>
        </>
      ) : (
        droppedComponents
      )}
    </div>
  );
};

export default CalculatorArea;
