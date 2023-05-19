import axios from "axios";

import { LOGIN_URL, REGISTER_URL } from "../utils/urls";

export const loginUser = (data) => {
  return axios({
    method: "POST",
    url: LOGIN_URL,
    data,
  });
};

export const registerUser = (data) => {
  return axios({
    method: "POST",
    url: REGISTER_URL,
    data,
  });
}
