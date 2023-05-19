import axios from "axios";
import { PRODUCT_URL, REVIEW_URL } from "../utils/urls";

export const getProducts = (data) => {
	const { category } = data;
	var url = PRODUCT_URL;
	if (category && category !== "All" && category !== "0") {
		url = url + "?category=" + category;
	}
	return axios({
		method: "GET",
		url: url,
	});
};

export const getProduct = (data) => {
	const { id } = data;
	var url = PRODUCT_URL + id + '/';
	return axios({
		method: "GET",
		url: url,
	});
};

export const getProductReviews = (data) => {
	const { id } = data;
	var url = REVIEW_URL + '?product=' + id;
	return axios({
		method: "GET",
		url: url,
	});
};

export const postProductReview = (data, accessToken) => {
	const { product, user, rating, comment } = data;
	var url = REVIEW_URL;
	return axios({
		method: "POST",
		headers: {
			Authorization: "Bearer " + accessToken,
		},
		url: url,
		data: {
			product: product,
			user: user,
			rating: rating,
			comment: comment,
		},
	});
};
