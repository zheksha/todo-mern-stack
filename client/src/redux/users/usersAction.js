import { LOGIN_USER, USER_ERROR } from "./usersTypes";
import axios from "axios";

export const loginUser = async (user) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:4000/user/login", user);
    dispatch({
      type: LOGIN_USER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: USER_ERROR,
      payload: console.log(error),
    });
  }
};
