import DraggableComponent from "./DraggableComponent.jsx";
import Display from "./Display/Display.jsx";
import Equal from "./Equal/Equal.jsx";
import Numbers from "./Numbers/Numbers.jsx";
import Operations from "./Operations/Operations.jsx";

const DraggableComponentsList = () => (
  <div>
    <DraggableComponent componentType='Display'>
      <Display />
    </DraggableComponent>
    <DraggableComponent componentType='Operations'>
      <Operations />
    </DraggableComponent>
    <DraggableComponent componentType='Numbers'>
      <Numbers />
    </DraggableComponent>
    <DraggableComponent componentType='Equal'>
      <Equal />
    </DraggableComponent>

  </div>
);

export default DraggableComponentsList;
