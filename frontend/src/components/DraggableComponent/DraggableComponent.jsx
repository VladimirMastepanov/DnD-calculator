import { useDrag } from "react-dnd";
import { useAtom } from "jotai";
import cn from 'classnames';
import { droppedComponentsList, modeAtom, MODES } from "../../state/atoms";
import './DraggableComponent.css';

const DraggableComponent = ({ componentType, children, isDropped = false, id = null }) => {
  const [mode] = useAtom(modeAtom);
  const [droppedComponents] = useAtom(droppedComponentsList);

  const isAlreadyDropped = droppedComponents.some((comp) => comp.type === componentType);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: isDropped ? 'DROPPED_COMPONENT' : 'COMPONENT',
    item: { componentType, isDropped, id },
    canDrag: mode === MODES.CONSTRUCTOR && (!isAlreadyDropped || isDropped),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [componentType, mode, isAlreadyDropped, isDropped, id]);

  if (mode === MODES.RUNTIME) {
    return children;
  }

  const componentClass = cn('draggable-component', {
    'is-dragging': isDragging,
    'is-dropped': isDropped,
    'not-allowed': isAlreadyDropped && !isDropped
  });

  return (
    <div ref={drag} className={componentClass}>
      {children}
    </div>
  )
};

export default DraggableComponent;
