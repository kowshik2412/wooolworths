import { db } from "../firebase.config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useState, useEffect } from "react";

const useGetProducts = (category) => {
	const [products, setProducts] = useState([]);
	const [refetch, setRefetch] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);

		if (category !== 'All') {
			const q = query(
				collection(db, "products"),
				where("category", "==", category)
			);
			getDocs(q).then((data) => {
				const products = data.docs.map((item) => item.data());
				setProducts(products);
				setLoading(false);
			});
		} else {
			const q = query(
				collection(db, "products")
			);
			getDocs(q).then((data) => {
				const products = data.docs.map((item) => item.data());
				setProducts(products);
				setLoading(false);
			});
		}
	}, [refetch]);

	return { products, loading, refetch: setRefetch };
};
export default useGetProducts;