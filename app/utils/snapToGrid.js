const snapToGrid = (x, y, snapX, snapY = snapX) => {
  const snappedX = Math.round(x / snapX) * snapX;
  const snappedY = Math.round(y / snapY) * snapY;
  return [snappedX, snappedY];
};

export default snapToGrid;
