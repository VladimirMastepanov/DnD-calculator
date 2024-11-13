import Display from "../components/Display/Display.jsx";
import Operations from "../components/Operations/Operations.jsx";
import Numbers from "../components/Numbers/Numbers.jsx";
import Equal from "../components/Equal/Equal";

export const ComponentsMap = {
  Display,
  Operations,
  Numbers,
  Equal,
};

 export const getComponentDimensions = (componentType) => {
  const dimensions = {
    Display: {width: 240, height: 60},
    Operations: {width: 240, height: 56},
    Numbers: {width: 240, height: 224},
    Equal: {width: 240, height: 72},
  };
  return dimensions[componentType];
};

