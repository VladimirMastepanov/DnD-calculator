const getComponentDimensions = (componentType) => {

  const dimensions = {
    Display: {width: 240, height: 60},
    Operations: {width: 240, height: 56},
    Numbers: {width: 240, height: 224},
    Equal: {width: 240, height: 72},
  };
  return dimensions[componentType];
};

export default getComponentDimensions;
