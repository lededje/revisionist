const snap = (val, click) => Math.round(val / click) * click;

const snapToGrid = (x, y, snapX, snapY = snapX) => [
  typeof x === 'number' ? snap(x, snapX) : null,
  typeof y === 'number' ? snap(y, snapY) : null,
];

export default snapToGrid;
