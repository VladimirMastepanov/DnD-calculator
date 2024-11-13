import PropTypes from "prop-types";
import { ComponentsMap, getComponentDimensions } from "../../assets/utils";
import './DropPreview.css'

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

DropPreview.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  componentType: PropTypes.string.isRequired,
};

export default DropPreview;
