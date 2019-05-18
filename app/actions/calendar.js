const setFocus = ({ dateTime, type, isDraggingOver }) => ({
  type: 'SET_FOCUS',
  focusDateTime: dateTime,
  focusType: type,
  isDraggingOver,
});

const setHeight = ({ height }) => ({
  type: 'SET_HEIGHT',
  height,
});

const setDayWidth = ({ dayWidth }) => ({
  type: 'SET_DAY_WIDTH',
  dayWidth,
});

export { setFocus, setHeight, setDayWidth };
