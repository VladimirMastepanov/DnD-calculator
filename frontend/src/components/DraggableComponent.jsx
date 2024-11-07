import { useDrag } from "react-dnd";
import { useAtom } from "jotai";
import { droppedComponentsList, modeAtom, MODES } from "../state/atoms";

const DraggableComponent = ({ componentType, children, style }) => {
  const [mode] = useAtom(modeAtom);
  const [droppedComponents] = useAtom(droppedComponentsList);

  const isAlreadyDropped = droppedComponents.some(
    comp => comp.type === componentType
  );

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'COMPONENT',
    item: { componentType },
    canDrag: mode === MODES.CONSTRUCTOR && !isAlreadyDropped,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [componentType, mode, isAlreadyDropped]);

  if (mode === MODES.RUNTIME) {
    return children;
  }

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging || isAlreadyDropped ? 0.5 : 1,
        cursor: isAlreadyDropped ? 'not-allowed' : 'move',
        ...style,
      }}
    >
      {children}
    </div>
  )
};

export default DraggableComponent;
