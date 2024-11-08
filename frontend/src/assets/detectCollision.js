const detectCollision = (rect1, rect2, gap = 8) => {
  return !(
    rect1.right + gap < rect2.left ||
    rect1.left > rect2.right + gap ||
    rect1.bottom + gap < rect2.top ||
    rect1.top > rect2.bottom + gap
  );
};

export default detectCollision;
