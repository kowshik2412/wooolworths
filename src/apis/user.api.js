import axios from "axios";
import { USER_URL } from "../utils/urls";

export const getUsers = (accessToken) => {
  return axios({
    method: "GET",
    url: USER_URL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getSingleUser = (id, accessToken) => {
  return axios({
    method: "GET",
    url: USER_URL + id + "/",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
