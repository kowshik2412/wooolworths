import React, { useState, useEffect } from "react";
import {
    delStorage,
    loadStorage,
    saveStorage,
} from "../../utils/persistLocalStorage";
import Header from "../../components/header/Header";
import './productDetails.scss';
import { useNavigate } from "react-router-dom";
import { formatDateTime } from "../../utils/utils";
import useGetProduct from "../../hooks/useGetProduct";
import { addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase.config";


const ProductDetailsPage = () => {
    const productId = window.location.pathname.split("/")[2];
    const user = loadStorage("user");

    const { product, loading: productLoading, refetch: productRefetch } = useGetProduct(productId);

    console.log(product);

    const navigate = useNavigate();

    const [productReviews, setProductReviews] = useState([]);

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [reviewError, setReviewError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const createProductReview = async () => {
        console.log(rating, comment);
        if (rating > 5 || rating < 1) {
            setReviewError("Please select a rating between 1 and 5");
            return;
        } else if (comment === "") {
            setReviewError("Please enter a comment");
            return;
        }

        for (let i = 0; i < product['reviews'].length; i++) {
            if (product['reviews'][i]['user_id'] === user.uid) {
                setReviewError("You have already reviewed this product");
                return;
            }
        }

        const docRef = doc(db, "products", productId);
        const new_review = {
            user_id: user.uid,
            name: user.displayName,
            rating: rating,
            comment: comment,
            createdAt: formatDateTime(new Date()),
        };

        const total_ratings = parseInt(product['total_ratings']) + 1;
        const avg_rating = ((parseFloat(product['avg_rating']) * parseInt(product['total_ratings'])) + parseInt(rating)) / total_ratings;

        console.log(total_ratings, avg_rating, parseFloat(product['avg_rating']) * parseInt(product['total_ratings']) + parseInt(rating));
        updateDoc(docRef, {
            reviews: [...product['reviews'], new_review],
            total_ratings: total_ratings,
            avg_rating: avg_rating,
        }).then((data) => {
            productRefetch((prev) => !prev);
        });

        // addDoc(collection(db, "products"), {
        //     postProductReview({ product: productId, user: user.id, rating: rating, comment: comment }, accessToken)
        //         .then((res) => {
        //             console.log(res.data);
        //             fetchProductDetailsPage();
        //         })
        //         .catch((err) => {
        //             console.log(err);
        //             setReviewError(err.response.data.message);
        //         });
    };

    const addToCart = async (id) => { }

    return (
        <>
            <Header />
            <div className="page_container">
                {productLoading
                    ? <div className="loading">Loading...</div>
                    : <div className="container">
                        <div className="productDetailsPage__container">
                            <div className="detailsContainer">
                                <div className="detailsContainer__left">
                                    <img
                                        src={product.image || "https://organic1.storola.net/image/organic1.storola.net/cache/catalog/products/new_img/01_01-212x212.png"}
                                        alt=""
                                    />
                                </div>

                                <div className="detailsContainer__right">
                                    <div className="detailsTextContainer">

                                        <div className="productName">
                                            <span>{product['name'] || 'N/A'}</span>
                                        </div>

                                        <div className="stock">
                                            <span>{product.short_description || 'No description'}</span>
                                        </div>
                                        <hr />
                                        <div className="stock">
                                            <span>Available Quantity: </span> &nbsp;
                                            <span>{product.stock || 'N/A'}</span>
                                        </div>

                                        <div className="stock">
                                            <span>Category: </span> &nbsp;
                                            <span>{product.category || 'N/A'}</span>
                                        </div>
                                        <div className="reviews">
                                            <div className="stars">
                                                <span>
                                                    {/* full star */}
                                                    {'⭐'.repeat(product.avg_rating)}
                                                    {/* half star */}
                                                    {product.avg_rating % 1 !== 0 && '✬'}
                                                    {/* empty star */}
                                                    {'☆'.repeat(5 - product.avg_rating)}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="price">
                                            <span>AUD </span>
                                            <span>{product.price || 'N/A'}</span>
                                        </div>

                                        {/* <div className="buttons">
                                        <div className="quantity">
                                            <span>Qnt</span>
                                            <span>-</span>
                                            <span>1</span>
                                            <span>+</span>
                                        </div>

                                        <div className="addToCart">
                                            <button className="">Add to Cart</button>
                                        </div>
                                    </div> */}
                                    </div>
                                </div>
                            </div>

                            <div className="extraDetails">
                                <div className="ProductDescription">
                                    <h3>
                                        Product Description
                                    </h3>
                                    <span>
                                        {product.long_description || 'N/A'}
                                    </span>
                                </div>
                                <hr />
                                <div className="customReview">
                                    <div className="reviewHeader">
                                        <h3>Reviews</h3>
                                    </div>

                                    {product['reviews']?.map((review) => (
                                        <div className="review_item" key={review.id}>
                                            <div className="userStar">{'⭐'.repeat(review.rating)} {'☆'.repeat(5 - review.rating)}
                                            </div>
                                            <div className="userReviewText">
                                                <span>{review.comment}</span>
                                            </div>
                                            <div className="review_user">
                                                <span>Reviewed by: {review.name}</span>
                                            </div>
                                            <div className="date">{formatDateTime(review.createdAt)}</div>
                                        </div>
                                    ))}

                                    {
                                        user && (
                                            <div className="addUserReviewContainer">
                                                <h3>Add your review</h3>
                                                <div className="reviewInputContainer">
                                                    <label htmlFor="rating">Rating</label>
                                                    <input className="ratingInput" type="number" name="rating" id="rating" min="1" max="5" onChange={(e) => {
                                                        setRating(e.target.value);
                                                    }} />
                                                    <input type="text" name="comment" id="comment" placeholder="Comment" className="reviewInput"
                                                        onChange={(e) => {
                                                            setComment(e.target.value);
                                                        }}
                                                    />
                                                    <button className="add_review_btn"
                                                        onClick={() => createProductReview()}
                                                    >Add Review</button>
                                                    {
                                                        reviewError && <div className="error">{reviewError}</div>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                }

            </div>
        </>
    );
};

export default ProductDetailsPage;
