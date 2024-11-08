import { useCallback, useRef, useState, useMemo } from 'react';
import { useDrop } from 'react-dnd';
import { useAtom } from 'jotai';
import { droppedComponentsList, modeAtom, MODES } from '../../state/atoms.js';
import cn from 'classnames';
import getComponentDimensions from '../../assets/getComponentDimensions.js';
import detectCollision from '../../assets/detectCollision.js';
import getComponentRect from '../../assets/getComponentRect.js';
import Display from '../Display/Display.jsx';
import Operations from '../Operations/Operations.jsx';
import Numbers from '../Numbers/Numbers.jsx';
import Equal from '../Equal/Equal.jsx';
import './CalculatorArea.css';
import DraggableComponent from '../DraggableComponent.jsx';

// const ComponentsMap = {
//   Display,
//   Operations,
//   Numbers,
//   Equal,
// };

// const PANEL_PADDING = 20;
// const COMPONENT_GAP = 8;

// const DropPreview = ({ position, componentType }) => {
//   const Component = ComponentsMap[componentType];
//   // const dimensions = getComponentDimensions(componentType);

//   if (!Component || !position) return null;

//   return (
//     <div className='drop-preview' style={{
//       position: 'absolute',
//       top: position.y,
//       left: position.x,
//       width: '100%', // ширина по умолчанию, можно изменить
//       height: '2px', // минимальная высота для индикатора
//     }}>
//     </div>
//   );
// };

// const CalculatorArea = () => {
//   const [mode] = useAtom(modeAtom);
//   const [droppedComponents, setDroppedComponents] = useAtom(droppedComponentsList);
//   const dropRef = useRef(null);
//   const [previewPosition, setPreviewPosition] = useState(null);
//   const [previewComponent, setPreviewComponent] = useState(null);


//   const arrangeComponents = (components, activeComponentId = null, newPosition = null) => {
//     const arranged = [...components];

//     let activeComponent;
//     if (activeComponentId && newPosition) {
//       activeComponent = arranged.find((comp) => comp.id === activeComponentId);
//       if (activeComponent) {
//         activeComponent.position = newPosition;
//       }
//     }

//     arranged.sort((a, b) => a.position.y - b.position.y);

//     const result = [];
//     let nextY = PANEL_PADDING;
//     for (const component of arranged) {
//       const dimensions = getComponentDimensions(component.type);

//       let componentPosition;
//       if (component.id === activeComponentId) {
//         componentPosition = newPosition;
//       } else {
//         componentPosition = {
//           x: PANEL_PADDING,
//           y: nextY,
//         };

//         if (activeComponentId) {
//           const activeRect = getComponentRect(activeComponent?.position, activeComponent?.type);
//           const currentRect = getComponentRect(componentPosition, component.type);
  
//           if (detectCollision(activeRect, currentRect)) {
//             componentPosition.y = activeRect.bottom + COMPONENT_GAP;
//           }
//         }
//       }

//       componentPosition.y = Math.max(componentPosition.y, PANEL_PADDING);

//       result.push({
//         ...component,
//         position: componentPosition,
//       });

//       nextY = componentPosition.y + dimensions.height + COMPONENT_GAP;
//     }

//     return result;
//   };




//   const moveComponent = useCallback((id, position) => {
//     setDroppedComponents((components) => {
//       const updatedComponents = arrangeComponents(components, id, position);
//       return updatedComponents;
//     });
//   }, []);

//   const getRelativePosition = (clientOffset) => {
//     const dropTargetRect = dropRef.current?.getBoundingClientRect();
//     if (!dropTargetRect || !clientOffset) return null;

//     return {
//       x: PANEL_PADDING,
//       y: Math.max(PANEL_PADDING, Math.min(
//         clientOffset.y - dropTargetRect.top,
//         dropTargetRect.height - PANEL_PADDING
//       )),
//     };
//   };

//   const [{ isOver }, drop] = useDrop(() => ({
//     accept: ['COMPONENT', 'DROPPED_COMPONENT'],
//     canDrop: () => mode === MODES.CONSTRUCTOR,
//     hover: (item, monitor) => {
//       const offset = monitor.getClientOffset();
//       const position = getRelativePosition(offset);

//       if (position) {
//         setPreviewPosition(position);
//         setPreviewComponent(item.componentType);
//       }
//     },
//     drop: (item, monitor) => {
//       if (mode !== MODES.CONSTRUCTOR) return;

//       const offset = monitor.getClientOffset();
//       const position = getRelativePosition(offset);

//       if (!position) return;

//       if (item.isDropped) {
//         moveComponent(item.id, position);
//       } else {
//         const componentExist = droppedComponents.some(
//           comp => comp.type === item.componentType
//         );

//         if (!componentExist) {
//           const newComponent = {
//             id: item.componentType, //Math.random().toString(36).substr(2, 9)
//             type: item.componentType,
//             position,
//           };
//           setDroppedComponents((prev) => {
//             const newComponents = [...prev, newComponent];
//             return arrangeComponents(newComponents);
//           });
//         }
//       }

//       setPreviewPosition(null);
//       setPreviewComponent(null);
//     },
//     collect: (monitor) => ({
//       isOver: mode === MODES.CONSTRUCTOR && !!monitor.isOver(),
//     }),
//   }), [droppedComponents, mode, moveComponent]);

//   const renderComponent = useCallback((component) => {
//     const Component = ComponentsMap[component.type];
//     if (!Component) return null;
//     const dimensions = getComponentDimensions(component.type);

//     return (
//       <DraggableComponent
//         key={component.id}
//         componentType={component.type}
//         id={component.id}
//         isDropped={true}
//         style={{
//           position: 'absolute',
//           top: component.position.y,
//           left: component.position.x,
//           width: dimensions.width,
//           height: dimensions.height,
//         }}
//       >
//         <Component />
//       </DraggableComponent>

//     );
//   }, []);

//   const setRef = (element) => {
//     dropRef.current = element;
//     drop(element);
//   };

//   return (
//     <div
//       ref={setRef}
//       className={cn('calculator-panel', {
//         'calculator-panel-filled': droppedComponents.length > 0,
//         'hover': isOver,
//       })}
//     >
//       {droppedComponents.length === 0 ? (
//         <>
//           <p className="calculator-panel-title">Перетащите сюда</p>
//           <p className="calculator-panel-subtitle">любой элемент из левой панели</p>
//         </>
//       ) : (
//         droppedComponents.map(renderComponent)
//       )}
//       {isOver && previewPosition && (
//         <DropPreview position={previewPosition} componentType={previewComponent} />
//       )}
//     </div>
//   );
// };

// export default CalculatorArea;




const ComponentsMap = {
  Display,
  Operations,
  Numbers,
  Equal,
};

const PANEL_PADDING = 20;
const COMPONENT_GAP = 15;

const DropPreview = ({ position, componentType }) => {
  const Component = ComponentsMap[componentType];
  const dimensions = getComponentDimensions(componentType);

  if (!Component || !position || !dimensions) return null;

  return (
    <div className='drop-preview' style={{
      position: 'absolute',
      top: position.y,
      left: position.x,
      width: dimensions.width,
      height: 2, 
    }}>
    </div>
  );
};

const CalculatorArea = () => {
  const [mode] = useAtom(modeAtom);
  const [droppedComponents, setDroppedComponents] = useAtom(droppedComponentsList);
  const dropRef = useRef(null);
  const [previewPosition, setPreviewPosition] = useState(null);
  const [previewComponent, setPreviewComponent] = useState(null);

  // Оптимизация с useMemo: вычисляем компоненты только при изменении данных
  const arrangeComponents = (components, activeComponentId = null, newPosition = null) => {
    const arranged = [...components];

    let activeComponent;
    if (activeComponentId && newPosition) {
      activeComponent = arranged.find((comp) => comp.id === activeComponentId);
      if (activeComponent) {
        activeComponent.position = newPosition;
      }
    }

    arranged.sort((a, b) => a.position.y - b.position.y);

    const result = [];
    let nextY = PANEL_PADDING;
    for (const component of arranged) {
      const dimensions = getComponentDimensions(component.type);

      let componentPosition;
      if (component.id === activeComponentId) {
        componentPosition = newPosition;
      } else {
        componentPosition = {
          x: PANEL_PADDING,
          y: nextY,
        };

        if (activeComponentId) {
          const activeRect = getComponentRect(activeComponent?.position, activeComponent?.type);
          const currentRect = getComponentRect(componentPosition, component.type);
  
          if (detectCollision(activeRect, currentRect)) {
            componentPosition.y = activeRect.bottom + COMPONENT_GAP;
          }
        }
      }

      componentPosition.y = Math.max(componentPosition.y, PANEL_PADDING);

      result.push({
        ...component,
        position: componentPosition,
      });

      nextY = componentPosition.y + dimensions.height + COMPONENT_GAP;
    }

    return result;
  };

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
        const componentExist = droppedComponents.some(
          comp => comp.type === item.componentType
        );

        if (!componentExist) {
          const newComponent = {
            id: item.componentType, // генерируем уникальный ID
            type: item.componentType,
            position,
          };
          setDroppedComponents((prev) => {
            const newComponents = [...prev, newComponent];
            return arrangeComponents(newComponents); // вызываем arrangeComponents внутри setDroppedComponents
          });
        }
      }

      setPreviewPosition(null);
      setPreviewComponent(null);
    },
    collect: (monitor) => ({
      isOver: mode === MODES.CONSTRUCTOR && !!monitor.isOver(),
    }),
  }), [droppedComponents, mode]);

  const moveComponent = useCallback((id, position) => {
    setDroppedComponents((components) => {
      const updatedComponents = components.map((comp) => 
        comp.id === id ? { ...comp, position } : comp
      );
      return arrangeComponents(updatedComponents);
    });
  }, [arrangeComponents]);

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
    const dimensions = getComponentDimensions(component.type);

    return (
      <DraggableComponent
        key={component.id}
        componentType={component.type}
        id={component.id}
        isDropped={true}
        style={{
          position: 'absolute',
          top: component.position.y,
          left: component.position.x,
          width: dimensions.width,
          height: dimensions.height,
        }}
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
          <p className="calculator-panel-title">Перетащите сюда</p>
          <p className="calculator-panel-subtitle">любой элемент из левой панели</p>
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