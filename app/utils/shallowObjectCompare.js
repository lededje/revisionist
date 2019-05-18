const shallowCompare = (obj1, obj2) => {
  if (!obj1 || !obj2) return false;
  return (
    Object.keys(obj1).length === Object.keys(obj2).length
    && Object.keys(obj1).every(key => obj1[key] === obj2[key])
  );
};

export default shallowCompare;
