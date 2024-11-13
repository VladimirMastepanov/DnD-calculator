import { useAtom } from "jotai";
import { modeAtom, MODES, COMPONENTS_TYPE } from "../../state/atoms.js";
import DraggableComponent from "../DraggableComponent/DraggableComponent.jsx";
import Display from "../Display/Display.jsx";
import Equal from "../Equal/Equal.jsx";
import Numbers from "../Numbers/Numbers.jsx";
import Operations from "../Operations/Operations.jsx";
import './DraggableComponentsList.css';

const DraggableComponentsList = () => {

  const [mode] = useAtom(modeAtom);

  if (mode === MODES.RUNTIME) {
    return null;
  }

  return (
    <div className="constructor-panel">
      <div>
        <DraggableComponent componentType={COMPONENTS_TYPE.DISPLAY}>
          <Display />
        </DraggableComponent>
        <DraggableComponent componentType={COMPONENTS_TYPE.OPERATIONS}>
          <Operations />
        </DraggableComponent>
        <DraggableComponent componentType={COMPONENTS_TYPE.NUMBERS}>
          <Numbers />
        </DraggableComponent>
        <DraggableComponent componentType={COMPONENTS_TYPE.EQUAL}>
          <Equal />
        </DraggableComponent>
      </div>
    </div>
  );
};

export default DraggableComponentsList;
