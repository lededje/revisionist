const initialState = {};

const userReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'UPDATE_USER_SUCCESS': {
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
        verified: action.payload.verified,
      };
    }
    case 'LOGOUT_SUCCESS': {
      return initialState;
    }
    default:
      return state;
  }
};

export default userReducer;
