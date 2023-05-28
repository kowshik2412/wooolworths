import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import './homePage.scss';
import { loadStorage } from "../../utils/persistLocalStorage";
import Carousal from '../../components/carousalHome/Carousal';
import Header from "../../components/header/Header";
import useGetCategories from "../../hooks/useGetCategories";
import useGetProducts from "../../hooks/useGetProducts";
import { db } from "../../firebase.config";
import UseAuth from "../../hooks/useAuth";
import { addDoc, collection, getDocs, doc, query, updateDoc, where } from "firebase/firestore";

function HomePage() {
	const user = UseAuth();

	const { categories, loading: categoryLoading, refetch: categoryRefetch } = useGetCategories();
	const [categoryActive, setCategoryActive] = useState('All');
	const { products, loading: productLoading, refetch: productRefetch } = useGetProducts(categoryActive);

	const addToCart = async (product) => {
		try {
			const q = query(
				collection(db, "carts"),
				where("user_id", "==", user.uid)
			);
			const initialQuerySnapshot = await getDocs(q);

			if (initialQuerySnapshot.docs.length === 0) {
				// create a new cart
				const cartRef = collection(db, "carts");
				const docRef = await addDoc(cartRef, {
					user_id: user.uid,
					items: [],
				});

				const cartItem = {
					product_id: product.id,
					product_name: product.name,
					product_price: product.price,
					product_image: product.image,
					quantity: 1, // You can customize the quantity as needed
				};

				// update docRef with the new cart item
				updateDoc(docRef, {
					items: [cartItem],
				});

				console.log('Product added to cart successfully!');
			} else {
				// add to existing cart
				const cartDoc = initialQuerySnapshot.docs[0];

				const items = cartDoc.data().items;

				const itemsRef = doc(db, 'carts', cartDoc.id);
				console.log('itemsRef', itemsRef);

				if (items.length > 0) {
					const productQuerySnapshot = items.filter(item => item.product_id === product.id);

					if (productQuerySnapshot.length > 0) {
						// if product already exists in cart, update the quantity
						const itemDoc = productQuerySnapshot[0];
						console.log('itemDoc', itemDoc);

						await updateDoc(itemsRef, {
							items: items.map(item => {
								if (item.product_id === product.id) {
									return {
										...item,
										quantity: item.quantity + 1,
									}
								}
								return item;
							}),
						});

						console.log('Product quantity updated successfully!');
					} else {
						// else add the product to cart
						const cartItem = {
							product_id: product.id,
							product_name: product.name,
							product_price: product.price,
							product_image: product.image,
							quantity: 1, // You can customize the quantity as needed
						};

						await updateDoc(itemsRef, {
							items: [...items, cartItem],
						});

						console.log('Product added to cart successfully!');
					}
				}
			}
		} catch (error) {
			console.error('Error adding product to cart:', error);
		}
	};

	return (
		<>
			<Header />
			<Carousal />
			<div className="page_container">
				<div className="pls_container">
					<div className="product-list-small-top">
						<h1>Products</h1>
						<div className="product-list-small-top__category">
							{categories.map((category) => (
								<motion.div
									key={category.id}
									className={
										category.name === categoryActive
											? "product-list-small-top__category-btn product-list-small-top__category-btn--active"
											: "product-list-small-top__category-btn"
									}
									onClick={() => {
										setCategoryActive(
											category.name === categoryActive ? "" : category.name
										)
										productRefetch(prev => !prev);
									}
									}
								>
									{category.name}
								</motion.div>
							))}
						</div>
					</div>
					<div className="product-list-small">
						{products?.map((product, index) => (
							<div key={index} className="product_card">
								<div className="product">
									<img src={product.image || "https://organic1.storola.net/image/organic1.storola.net/cache/catalog/products/new_img/01_01-212x212.png"} alt={product.name} />
								</div>
								<div className="product_info">
									<Link to={`/product/${product.id}`} className="link">{product.name}</Link>
									<p>Available Stock {product.stock}</p>
									<p>Price {product.price} AUD</p>
									<p>
										{/* {
										[...Array(parseInt(product.avg_rating))].map((star, index) => (
											<i className="fas fa-star" key={index}></i>
										))
									}
									{
										parseInt(product.avg_rating) < 5 &&
										[...Array(5 - parseInt(product.avg_rating))].map((star, index) => (
											<i className="far fa-star" key={index}></i>
										))

									} */}


										{/* full star */}
										{'⭐'.repeat(product.avg_rating)}
										{/* half star */}
										{product.avg_rating % 1 !== 0 && '✬'}
										{/* empty star */}
										{'☆'.repeat(5 - product.avg_rating)}
									</p>
								</div>
								<div className="product-actions">
									{/* <i className="far fa-heart"></i> */}
									<span onClick={() => addToCart(product)}>
										<i
											className="fas fa-shopping-cart"
										></i>
										Add to cart
									</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}

export default HomePage