import { db } from "../firebase.config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useState, useEffect } from "react";

const useGetCategories = () => {
	const [categories, setCategories] = useState([]);
	const [refetch, setRefetch] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		const q = query(
			collection(db, "categories")
		);
		getDocs(q).then((data) => {
			const categories = data.docs.map((item) => item.data());
			setCategories(categories);
			setLoading(false);
		});
	}, [refetch]);

	return { categories: [{ id: '12345', name: 'All' }, ...categories], loading, refetch: setRefetch };
};
export default useGetCategories;