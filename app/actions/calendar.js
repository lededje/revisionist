const setFocus = ({ dateTime, type }) => ({
  type: 'SET_FOCUS',
  focusDateTime: dateTime,
  focusType: type,
});

export { setFocus };
