import { useCallback, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import { useAtom } from 'jotai';
import {
  droppedComponentsList,
  modeAtom,
  MODES,
  PANEL_PADDING,
  COMPONENT_GAP,
} from '../../state/atoms.js';
import cn from 'classnames';
import { ComponentsMap, getComponentDimensions } from '../../assets/utils.js';
import './CalculatorArea.css';
import DraggableComponent from '../DraggableComponent/DraggableComponent.jsx';
import DropPreview from '../DropPreview/DropPreview.jsx';


const CalculatorArea = () => {
  const [mode] = useAtom(modeAtom);
  const [droppedComponents, setDroppedComponents] = useAtom(droppedComponentsList);
  const dropRef = useRef(null);
  const [previewPosition, setPreviewPosition] = useState(null);
  const [previewComponent, setPreviewComponent] = useState(null);

  const arrangeComponents = useCallback((components) => {
    const arranged = [...components];
    arranged.sort((a, b) => a.position.y - b.position.y);

    const result = [];

    let nextY = PANEL_PADDING;
    for (const component of arranged) {
      const dimensions = getComponentDimensions(component.type);
      const componentPosition = {
        x: PANEL_PADDING,
        y: nextY,
      };
      result.push({
        ...component,
        position: componentPosition,
      });
      nextY = componentPosition.y + dimensions.height + COMPONENT_GAP;
    }
    return result;
  }, []);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ['COMPONENT', 'DROPPED_COMPONENT'],
    canDrop: () => mode === MODES.CONSTRUCTOR,
    hover: (item, monitor) => {
      const offset = monitor.getClientOffset();
      const position = getRelativePosition(offset);

      if (position) {
        setPreviewPosition(position);
        setPreviewComponent(item.componentType);
      }
    },
    drop: (item, monitor) => {
      if (mode !== MODES.CONSTRUCTOR) return;

      const offset = monitor.getClientOffset();
      const position = getRelativePosition(offset);

      if (!position) return;

      if (item.isDropped) {
        moveComponent(item.id, position);
      } else {
        const newComponent = {
          id: item.componentType,
          type: item.componentType,
          position,
        };
        setDroppedComponents((prev) => {
          const newComponents = [...prev, newComponent];
          return arrangeComponents(newComponents);
        });
      }

      setPreviewPosition(null);
      setPreviewComponent(null);
    },
    collect: (monitor) => ({
      canDrop: mode === MODES.CONSTRUCTOR && monitor.canDrop(),
      isOver: mode === MODES.CONSTRUCTOR && monitor.isOver(),
    }),
  }), [droppedComponents, mode]);

  const moveComponent = useCallback((id, position) => {
    setDroppedComponents((components) => {
      const updatedComponents = components.map((comp) =>
        comp.id === id ? { ...comp, position } : comp
      );
      return arrangeComponents(updatedComponents);
    });
  }, [arrangeComponents, setDroppedComponents]);

  const getRelativePosition = (clientOffset) => {
    const dropTargetRect = dropRef.current?.getBoundingClientRect();
    if (!dropTargetRect || !clientOffset) return null;

    return {
      x: PANEL_PADDING,
      y: Math.max(PANEL_PADDING, Math.min(
        clientOffset.y - dropTargetRect.top,
        dropTargetRect.height - PANEL_PADDING
      )),
    };
  };

  const renderComponent = useCallback((component) => {
    const Component = ComponentsMap[component.type];
    if (!Component) return null;

    return (
      <DraggableComponent
        key={component.id}
        componentType={component.type}
        id={component.id}
        isDropped={true}
      >
        <Component />
      </DraggableComponent>
    );
  }, []);

  const setRef = (element) => {
    dropRef.current = element;
    drop(element);
  };

  return (
    <div
      ref={setRef}
      className={cn('calculator-panel', {
        'calculator-panel-filled': droppedComponents.length > 0,
        'hover': isOver,
      })}
    >
      {droppedComponents.length === 0 ? (
        <>
          <p className="calculator-panel-title">Drag here</p>
          <p className="calculator-panel-subtitle">any element from the left panel</p>
        </>
      ) : (
        droppedComponents.map(renderComponent)
      )}
      {isOver && previewPosition && (
        <DropPreview position={previewPosition} componentType={previewComponent} />
      )}
    </div>
  );
};

export default CalculatorArea;
