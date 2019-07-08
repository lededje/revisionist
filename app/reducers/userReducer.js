const initialState = {};

const userReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'UPDATE_USER_SUCCESS': {
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
