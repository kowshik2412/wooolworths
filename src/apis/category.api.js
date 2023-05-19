import axios from "axios";
import { CATEGORY_URL, SUBCATEGORY_URL } from "../utils/urls";

export const getCategories = () => {
  return axios({
    method: "GET",
    url: CATEGORY_URL,
  });
};

export const createCategory = (data, accessToken) => {
  return axios({
    method: "POST",
    url: CATEGORY_URL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'multipart/form-data'
    },
    data,
  });
};


export const getSubCategories = (data) => {
  const { category } = data;
  var url = SUBCATEGORY_URL;
  if (category && category !== 0 && category !== "0") {
    url = url + "?category=" + category;
  }
  return axios({
    method: "GET",
    url: url,
  });
};

export const createSubCategory = (data, accessToken) => {
  return axios({
    method: "POST",
    url: SUBCATEGORY_URL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'multipart/form-data'
    },
    data,
  });
};
