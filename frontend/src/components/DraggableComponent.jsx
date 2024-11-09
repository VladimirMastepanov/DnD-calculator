import { useDrag } from "react-dnd";
import { useAtom } from "jotai";
import { droppedComponentsList, modeAtom, MODES } from "../state/atoms";

const DraggableComponent = ({ componentType, children, style, isDropped = false, id = null }) => {
  const [mode] = useAtom(modeAtom);
  const [droppedComponents] = useAtom(droppedComponentsList);

  const isAlreadyDropped = droppedComponents.some((comp) => comp.type === componentType && !isDropped);

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

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: isAlreadyDropped && !isDropped ? 'not-allowed' : 'move',
        position: isDropped ? 'absolute' : 'relative',
        zIndex: isDragging ? 1000 : 'auto',
        ...style,
      }}
    >
      {children}
    </div>
  )
};

export default DraggableComponent;
