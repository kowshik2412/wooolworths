import axios from "axios";
import { BRAND_URL } from "../utils/urls";

export const getBrands = () => {
	return axios({
		method: "GET",
		url: BRAND_URL,
	});
};

export const createBrand = (data, accessToken) => {
	console.log("data", data);
	console.log("accessToken", accessToken);
	return axios({
		method: "POST",
		url: BRAND_URL,
		headers: {
			Authorization: `Bearer ${accessToken}`,
			'Content-Type': 'multipart/form-data'
		},
		data,
	});
};

