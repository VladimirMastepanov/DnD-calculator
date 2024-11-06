import { useState } from "react";
import { useDrag } from "react-dnd";

const DraggableComponent = ({ componentType, children, style }) => {

  const [isDragged, setIsDragged] = useState(false);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'COMPONENT',
    item: { componentType, setDragged: setIsDragged },
    canDrag: !isDragged,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: isDragged ? 'not-allowed' : 'move',
        ...style,
      }}
    >
      {children}
    </div>
  )
};

export default DraggableComponent;
