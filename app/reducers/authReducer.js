const initialState = {};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'REQUEST_LOGIN_SUCCESS': {
      return {
        code: action.payload.code,
      };
    }
    default: {
      return state;
    }
  }
};
