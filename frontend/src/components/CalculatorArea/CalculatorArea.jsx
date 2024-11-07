import { useCallback, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { useAtom } from 'jotai';
import { droppedComponentsList, modeAtom, MODES } from '../../state/atoms.js';
import cn from 'classnames'
import Display from '../Display/Display.jsx';
import Operations from '../Operations/Operations.jsx';
import Numbers from '../Numbers/Numbers.jsx';
import Equal from '../Equal/Equal.jsx';
import './CalculatorArea.css';

const ComponentsMap = {
  Display,
  Operations,
  Numbers,
  Equal,
}

const CalculatorArea = () => {
  const [mode] = useAtom(modeAtom);
  const [droppedComponents, setDroppedComponents] = useAtom(droppedComponentsList);
  const dropRef = useRef(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'COMPONENT',
    canDrop: () => mode === MODES.CONSTRUCTOR,
    drop: (item, monitor) => {
      if (mode !== MODES.CONSTRUCTOR) return;

      const offset = monitor.getClientOffset();
      if (!offset) return;

      const dropTargetRect = dropRef.current?.getBoundingClientRect();
      if (!dropTargetRect) return;

      const relativePosition = {
        x: offset.x - dropTargetRect.left,
        y: offset.y - dropTargetRect.top,
      };

      const componentExist = droppedComponents.some(
        comp => comp.type === item.componentType
      );

      if (!componentExist) {
        const newComponent = {
          id: item.id,
          type: item.componentType,
          position: relativePosition,
        };
        setDroppedComponents((prev) => [...prev, newComponent]);
      }
    },
    collect: (monitor) => ({
      isOver: mode === MODES.CONSTRUCTOR && !!monitor.isOver(),
    }),
  }), [droppedComponents, mode]);

  const renderComponent = useCallback((component) => {
    const Component = ComponentsMap[component.type];
    if (!Component) return null;

    return (
      <Component
      key={component.type}
      style={{
        position: 'absolute',
        top: component.position.y,
        left: component.position.x,
      }}
      />
    );
  }, []);

  const setRef = (element) => {
    dropRef.current = element;
    drop(element);
  };

  return (
    <div
      ref={setRef}
      className={cn({
        'calculator-panel-filled': droppedComponents.length > 0,
        'calculator-panel': droppedComponents.length === 0,
        'hover': isOver,
      })}
    >
      {droppedComponents.length === 0 ? (
        <>
          <p className="calculator-panel-title">Перетащите сюда</p>
          <p className="calculator-panel-subtitle">любой элемент из левой панели</p>
        </>
      ) : (
        droppedComponents.map(renderComponent)
      )}
    </div>
  );
};

export default CalculatorArea;
