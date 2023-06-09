
import React from "react";
import "./header.scss";
import { logo } from "../../utils/images";
import { loadStorage } from "../../utils/persistLocalStorage";
import { Link } from "react-router-dom";
import useGetCart from "../../hooks/useGetCart";

export default function Header() {
    const user = loadStorage("user");

    const { cart: cartItems, loading, refetch } = useGetCart(user?.uid);

    return (
        <>
            <div className="header ">
                <div className="header_Content">
                    <div className="logoHolder">
                        <Link to="/">
                            <img
                                src={logo}
                                alt="logo"
                            />
                        </Link>
                    </div>
                    <div className="ecommerseCatalogSearchHolder">
                        <div className="searchHolder">
                            <input
                                className="searchHolder__input"
                                type="text"
                                placeholder="Search"
                            />
                            <div className="searchHolder__icon">
                                <i className="fas fa-search"></i>
                            </div>
                        </div>
                    </div>
                    <div className="ecommerseCatalog">
                        {
                            !user ? (
                                <>
                                    <div className="header__item">
                                        <Link to="/login"
                                            className="no_decoration primary_button"
                                        >
                                            Login
                                        </Link>
                                    </div>
                                    {/* <div className="header__item">
                                        <Link to="/register"
                                            className="no_decoration outline_button"
                                        >
                                            Register
                                        </Link>
                                    </div> */}
                                </>
                            ) : (
                                <>
                                    <div className="header__item">
                                        <Link
                                            className="no_decoration cart"
                                            to="/cart"
                                        >
                                            <i className="fas fa-shopping-cart"></i>
                                            <sup className="cart__number">
                                                <span>
                                                    {cartItems.length}
                                                </span>
                                            </sup>
                                        </Link>
                                    </div>
                                    {/* <div className="header__item">
                                        <Link className="no_decoration wishlist"
                                            to="/wishlist"
                                        >
                                            <i className="fas fa-heart"></i>
                                            <sup className="wishlist__number">
                                                <span>{wishlistLength}</span>
                                            </sup>
                                        </Link>
                                    </div> */}
                                    <div className="header__item">
                                        <Link className="no_decoration user"
                                            to="/profile"
                                        >
                                            <i className="fas fa-user"></i>
                                        </Link>
                                    </div>
                                </>
                            )}
                            <div className="header__item">
                                <Link to="/contact-us"
                                    className="no_decoration primary_button"
                                >
                                    Contact
                                </Link>
                            </div>
                    </div>
                </div>
            </div>
        </>
    );
}
