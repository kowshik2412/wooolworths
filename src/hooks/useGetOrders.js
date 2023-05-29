import { db } from "../firebase.config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useState, useEffect } from "react";

const useGetOrders = (uid) => {
	const [orders, setOrders] = useState([]);
	const [refetch, setRefetch] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);

		if (uid) {
			const q = query(
				collection(db, "orders"),
				where("user_id", "==", uid)
			);
			getDocs(q).then((data) => {
				const orders = data.docs.map((item) => item.data());
				setOrders(orders);
				setLoading(false);
			});
		}
	}, [refetch]);

	return { orders, loading, refetch: setRefetch };
}

export default useGetOrders;
