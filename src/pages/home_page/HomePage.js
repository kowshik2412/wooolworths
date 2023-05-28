import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import './homePage.scss';
import { loadStorage } from "../../utils/persistLocalStorage";
import Carousal from '../../components/carousalHome/Carousal';
import { getCategories } from "../../apis/category.api";
import Header from "../../components/header/Header";
import { getProducts } from "../../apis/product.api";

function HomePage() {
	const user = loadStorage("user");
	const accessToken = loadStorage("token")?.access;
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);

	const [categories, setCategories] = useState([{
		id: 1,
		name: 'All'
	}]);
	const [categoryActive, setCategoryActive] = useState('All');

	const [products, setProducts] = useState([]);

	useEffect(() => {
		fetchCategories();
	}, []);

	useEffect(() => {
		fetchProducts();
	}, [categoryActive]);

	const fetchCategories = async () => {
		getCategories()
			.then((res) => {
				setCategories([{
					id: 0,
					name: 'All'
				}]);
				res.data.map((category) => {
					setCategories((categories) => [...categories, category]);
				});
			})
			.catch((err) => {
				console.log(err);
				setIsLoading(false);
			});
	};

	const fetchProducts = async () => {
		getProducts({ category: categoryActive })
			.then((res) => {
				setProducts(res.data.data);
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<>
			<Header />
			<Carousal />
			<div className="page_container">
				<div className="pls_container">
					{/* {JSON.stringify(cart)} */}
					<div className="product-list-small-top">
						<h1>Products</h1>
						<div className="product-list-small-top__category">
							{categories.map((category) => (
								<motion.div
									key={category.id}
									//if category is selected then make it bold
									className={
										category.name === categoryActive
											? "product-list-small-top__category-btn product-list-small-top__category-btn--active"
											: "product-list-small-top__category-btn"
									}
									//if category is selected then make it bold
									onClick={() =>
										setCategoryActive(
											category.name === categoryActive ? "" : category.name
										)
									}
								>
									{category.name}
								</motion.div>
							))}
						</div>
					</div>
					<div className="product-list-small">
						{products.map((product) => (
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
								<p>Price {product.price}</p>
								<p>
									{
										[...Array(parseInt(product.avg_rating))].map((star, index) => (
											<i className="fas fa-star" key={index}></i>
										))
									}
									{
										parseInt(product.avg_rating) < 5 &&
										[...Array(5 - parseInt(product.avg_rating))].map((star, index) => (
											<i className="far fa-star" key={index}></i>
										))

									}
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