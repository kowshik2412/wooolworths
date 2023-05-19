import { db } from "../firebase.config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useState, useEffect } from "react";

const useGetProduct = (productId) => {
	const [product, setProduct] = useState({});
	const [refetch, setRefetch] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const q = query(
			collection(db, "products"),
			where("id", "==", productId)
		);
		getDocs(q).then((data) => {
			const product = data.docs.map((item) => item.data());
			setProduct(product[0]);
			if (product.length > 0) {
				setLoading(false);
			}
		});
	}, [refetch, productId]);

	return { product, loading, refetch: setRefetch };
};
export default useGetProduct;