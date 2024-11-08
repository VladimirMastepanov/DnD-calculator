import getComponentDimensions from "./getComponentDimensions.js"

const getComponentRect = (position, componentType) => {
  const {width, height} = getComponentDimensions(componentType);

  return {
    left: position.x,
    right: position.x + width,
    top: position.y,
    bottom: position.y + height,
    width,
    height,
  };
};

export default getComponentRect;
