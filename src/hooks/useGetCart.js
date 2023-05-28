import { db } from "../firebase.config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useState, useEffect } from "react";

const useGetCart = (uid) => {
	const [cart, setCart] = useState([]);
	const [refetch, setRefetch] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);

		if (uid) {
			const q = query(
				collection(db, "carts"),
				where("user_id", "==", uid)
			);
			getDocs(q).then((data) => {
				const cart = data.docs.map((item) => item.data());
				setCart(cart[0]['items']);
				setLoading(false);
			});
		}
	}, [refetch]);

	return { cart, loading, refetch: setRefetch };
};

export default useGetCart;
