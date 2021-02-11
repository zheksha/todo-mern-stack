import { LOGIN_USER } from "./usersTypes";

const initialState = { user: "", loading: true };

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default userReducer;
