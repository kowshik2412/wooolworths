import React, { useEffect, useState } from 'react';
import './profilePage.scss';
import Header from '../../components/header/Header';
import { delStorage, loadStorage, saveStorage } from '../../utils/persistLocalStorage';
import { useNavigate } from 'react-router';
import useGetAddresses from '../../hooks/useGetAddresses';
import { db } from '../../firebase.config';
import { addDoc, collection } from 'firebase/firestore';
import useGetOrders from '../../hooks/useGetOrders';
import { formatDateTime } from '../../utils/utils';

const ProfilePage = () => {
	const user = loadStorage("user");
	const navigate = useNavigate();
	const [isAddressCreateModalOpen, setIsAddressCreateModalOpen] = useState(false);

	useEffect(() => {
		if (!user) {
			navigate("/login");
		}
	}, [user]);

	const { addresses, loading: addressLoading, refetch: addressRefetch } = useGetAddresses(user?.uid);
	const { orders, loading: orderLoading, refetch: orderRefetch } = useGetOrders(user?.uid);
	// const fetchUserOrders = async () => { };

	return (
		<>
			<Header />
			<div className="page_container">
				<div className="container">
					<div className="profile-section">
						<div className="profile-info">
							<div className="profile-image">
								<img src={user?.photoURL} alt="Profile Image" />
							</div>
							<div className="info-row">
								<span className="info-label">Name:</span>
								<span className="info-value">
									{user?.displayName}
								</span>
							</div>
							<div className="info-row">
								<span className="info-label">Email:</span>
								<span className="info-value">
									{user?.email}
								</span>
							</div>
							<div className="info-row">
								<span className="info-label">Phone:</span>
								<span className="info-value">
									{user?.phone || 'N/A'}
								</span>
							</div>
						</div>
						<div className="logout-btn">
							<button className="btn btn-primary"
								onClick={() => {
									delStorage("user");
									navigate("/login");
								}}
							>Logout</button>
						</div>
					</div>
					<div className="address_list">
						<div className='title_sec'>
							<h2 className="section-title">Addresses</h2>

							<button className="add-btn btn-primary"
								onClick={() => {
									setIsAddressCreateModalOpen(true);
								}}
							>Add Address</button>
						</div>
						<div className="address-list">
							{
								addresses.map((item, index) => (
									<div className="address-item" key={index}>
										<span className="address-value">Address: {item.address}</span>
										<span className="address-value">Phone: {item.phone}</span>
									</div>
								))
							}
						</div>
					</div>
					<div className="order-history">
						<h2 className="section-title">Order History</h2>
						<div className="order-list">
							{
								!orderLoading && orders.map((item, index) => (

									<div className="order-item">
										<span className="order-number">Order #{index + 1}</span>
										<span className="order-date">Date: {formatDateTime(item.created_at)}</span>
										<span className="order-total">Total: {item.total} $</span>
									</div>
								))
							}
						</div>
					</div>
				</div>
			</div>

			{
				isAddressCreateModalOpen && <CreateAddressModal
					user={user}
					onClose={() => {
						setIsAddressCreateModalOpen(false);
						addressRefetch(true);
					}}
				/>
			}
		</>
	);
};

export default ProfilePage;


const CreateAddressModal = ({ user, onClose }) => {
	const [address, setAddress] = useState("");
	const [phone, setPhone] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = {
			address,
			phone,
			user_id: user.uid,
		};
		await addDoc(collection(db, "addresses"), data);
		onClose();
	};

	return (
		<div className="modal">
			<div className="modal-content">
				<div className="modal-header">
					<h2 className="modal-title">Add Address</h2>
					<span className="close"
						onClick={() => {
							onClose();
						}}
					>&times;</span>
				</div>
				<div className="modal-body">
					<form onSubmit={handleSubmit}>
						<div className="form-group">
							<label htmlFor="address">Address</label>
							<input
								type="text"
								className="form-control"
								id="address"
								placeholder="Enter Address"
								value={address}
								onChange={(e) => setAddress(e.target.value)}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="phone">Phone</label>
							<input
								type="text"
								className="form-control"
								id="phone"
								placeholder="Enter Phone"
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
							/>
						</div>
						<button type="submit" className="btn btn-primary">
							{loading ? <span>Loading...</span> : <span>Add</span>}
						</button>
						{error && <div className="error">{error}</div>}
					</form>
				</div>
			</div>
		</div>
	);

}
