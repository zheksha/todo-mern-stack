import { LOGIN_USER } from "./usersTypes";
import axios from "axios";

export const loginUser = async (user) => {
  let data = "";
  try {
    data = await axios.post("http://localhost:4000/user/login", user);
    localStorage.setItem("token", data.token);

    setTimeout(() => window.location.replace("/todos"), 500);
  } catch (error) {
    console.error(error);
  }

  return {
    type: LOGIN_USER,
    payload: { data },
  };
};
