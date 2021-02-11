import { combineReducers } from "redux";
import userReducer from "./users/usersReducers";

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
