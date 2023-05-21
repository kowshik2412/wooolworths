import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import './homePage.scss';
import { loadStorage } from "../../utils/persistLocalStorage";
import Carousal from '../../components/carousalHome/Carousal';
import { collection, getDocs, query, where } from "firebase/firestore";
import Header from "../../components/header/Header";
import useGetCategories from "../../hooks/useGetCategories";
import useGetProducts from "../../hooks/useGetProducts";

function HomePage() {
	const user = loadStorage("user");

	const { categories, loading: categoryLoading, refetch: categoryRefetch } = useGetCategories();
	const [categoryActive, setCategoryActive] = useState('All');
	const { products, loading: productLoading, refetch: productRefetch } = useGetProducts(categoryActive);

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
						{products?.map((product) => (
							<Link key={product.id} className="no_decoration" to={`/product/${product.id}`}>
								<motion.div className="product">
									<img src={product.image || "https://organic1.storola.net/image/organic1.storola.net/cache/catalog/products/new_img/01_01-212x212.png"} alt={product.name} />
									<motion.div
										className="product-overlay"
										initial={{
											opacity: 0,
											transform: "translateY(100px)",
											transition: { duration: 0.5 },
										}}
										whileHover={{
											transition: { duration: 0.2 },
											opacity: 1,
											transform: "translateY(0px)",
										}}
									>
										<div className="product-details">
											<i className="far fa-heart"></i>
											<i
												className="fas fa-shopping-cart"
											// onClick={() => addToCart(product)}
											></i>
										</div>
									</motion.div>
								</motion.div>
								<h3>{product.name}</h3>
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
							</Link>
						))}
					</div>
				</div>
			</div>
		</>
	);
}

export default HomePage