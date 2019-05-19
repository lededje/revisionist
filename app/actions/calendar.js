const setFocus = ({ dateTime, type }) => ({
  type: 'SET_FOCUS',
  focusDateTime: dateTime,
  focusType: type,
});

const setRect = ({ rect }) => ({
  type: 'SET_RECT',
  rect,
});

export { setFocus, setRect };
