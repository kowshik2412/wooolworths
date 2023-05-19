import React, { useEffect, useState } from 'react';
import './profilePage.scss';
import Header from '../../components/header/Header';
import { delStorage, loadStorage, saveStorage } from '../../utils/persistLocalStorage';
import { useNavigate } from 'react-router';
import { getSingleUser } from '../../apis/user.api';

const ProfilePage = () => {
	const user = loadStorage("user");
	console.log(user);
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);

	const [userData, setUserData] = useState({});

	// useEffect(() => {
	// 	fetchUserData();
	// }, []);

	// const fetchUserData = async () => {
	// 	getSingleUser(user.id, accessToken)
	// 		.then((res) => {
	// 			console.log(res);
	// 			setUserData(res.data.user);
	// 			saveStorage("user", res.data.user);
	// 			setIsLoading(false);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 			setIsLoading(false);
	// 		});
	// };

	// const fetchUserAddresses = async () => { };

	// const fetchUserOrders = async () => { };

	return (
		<>
			<Header />
			<div class="page_container">
				<div class="container">
					<div class="profile-section">
						<div class="profile-info">
							<div class="profile-image">
								<img src={user.photoURL} alt="Profile Image" />
							</div>
							<div class="info-row">
								<span class="info-label">Name:</span>
								<span class="info-value">
									{user.displayName}
								</span>
							</div>
							<div class="info-row">
								<span class="info-label">Email:</span>
								<span class="info-value">
									{user.email}
								</span>
							</div>
							<div class="info-row">
								<span class="info-label">Phone:</span>
								<span class="info-value">
									{user.phone || 'N/A'}
								</span>
							</div>
						</div>
						<div class="logout-btn">
							<button class="btn btn-primary"
								onClick={() => {
									delStorage("user");
									navigate("/login");
								}}
							>Logout</button>
						</div>
					</div>
					<div class="address_list">
						<h2 class="section-title">Addresses</h2>
						<div class="address-list">
							<div class="address-item">
								<span class="address-label">Shipping Address:</span>
								<span class="address-value">123 Main St, City, State, ZIP</span>
							</div>
							<div class="address-item">
								<span class="address-label">Billing Address:</span>
								<span class="address-value">456 Elm St, City, State, ZIP</span>
							</div>
						</div>
					</div>
					<div class="order-history">
						<h2 class="section-title">Order History</h2>
						<div class="order-list">
							<div class="order-item">
								<span class="order-number">Order #001</span>
								<span class="order-date">Date: 2023-05-14</span>
								<span class="order-total">Total: $99.99</span>
							</div>
							<div class="order-item">
								<span class="order-number">Order #002</span>
								<span class="order-date">Date: 2023-05-10</span>
								<span class="order-total">Total: $49.99</span>
							</div>
						</div>
					</div>
				</div>
			</div>

		</>
	);
};

export default ProfilePage;
