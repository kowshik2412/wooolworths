import { db } from "../firebase.config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useState, useEffect } from "react";

const useGetAddresses = (userId) => {
	const [addresses, setAddresses] = useState([]);
	const [refetch, setRefetch] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		const q = query(
			collection(db, "addresses"),
			where("user_id", "==", userId)
		);
		getDocs(q).then((data) => {
			const addresses = data.docs.map((item) => item.data());
			setAddresses(addresses);
			setLoading(false);
		});
	}, [refetch]);

	return { addresses, loading, refetch: setRefetch };
};
export default useGetAddresses;