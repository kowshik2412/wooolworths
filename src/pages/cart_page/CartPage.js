import React, { useEffect, useState } from 'react'
import useGetCart from '../../hooks/useGetCart';
import './cartPage.scss';
import { loadStorage } from '../../utils/persistLocalStorage';
import Header from '../../components/header/Header';
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../firebase.config';
import useGetAddresses from '../../hooks/useGetAddresses';

function CartPage() {
	const user = loadStorage("user");
	const { cart: cartItems, loading, refetch } = useGetCart(user.uid);

	const { addresses, loading: addressLoading, refetch: addressRefetch } = useGetAddresses(user.uid);

	const [subtotal, setSubtotal] = useState(0);
	const [shipping, setShipping] = useState(5);
	const [total, setTotal] = useState(0);

	const [selectedAddress, setSelectedAddress] = useState(null);

	useEffect(() => {
		if (cartItems.length > 0) {
			const subTotal = cartItems.reduce((acc, item) => {
				return acc + (item.product_price * item.quantity);
			}, 0);

			setSubtotal(subTotal);
			setTotal(subTotal + shipping);
		} else {
			setSubtotal(0);
		}
	}, [cartItems]);

	const removeFromCart = (item) => {
	};

	const increaseQuantity = async (cartItem) => {
		const q = query(
			collection(db, "carts"),
			where("user_id", "==", user.uid)
		);
		const initialQuerySnapshot = await getDocs(q);
		const cartDoc = initialQuerySnapshot.docs[0];

		const items = cartDoc.data().items;

		const itemsRef = doc(db, 'carts', cartDoc.id);

		await updateDoc(itemsRef, {
			items: items.map(item => {
				if (item.product_id === cartItem.product_id) {
					return {
						...item,
						quantity: item.quantity + 1,
					}
				}
				return item;
			}),
		}).then(() => {
			refetch((prev) => !prev);
		});

		console.log('Product quantity updated successfully!');
	};

	const decreaseQuantity = async (cartItem) => {
		const q = query(
			collection(db, "carts"),
			where("user_id", "==", user.uid)
		);
		const initialQuerySnapshot = await getDocs(q);
		const cartDoc = initialQuerySnapshot.docs[0];

		const items = cartDoc.data().items;

		const itemsRef = doc(db, 'carts', cartDoc.id);

		if (cartItem.quantity === 1) {
			await updateDoc(itemsRef, {
				items: items.filter(item => item.product_id !== cartItem.product_id),
			}).then(() => {
				refetch((prev) => !prev);
			});
		} else {
			await updateDoc(itemsRef, {
				items: items.map(item => {
					if (item.product_id === cartItem.product_id) {
						return {
							...item,
							quantity: item.quantity - 1,
						}
					}
					return item;
				}),
			}).then(() => {
				refetch((prev) => !prev);
			});
		}


		console.log('Product quantity updated successfully!');
	};

	const handlePlaceOrder = async () => {
		if (!selectedAddress) {
			alert('Please select an address!');
			return;
		}

		const order = {
			user_id: user.uid,
			items: cartItems,
			address: selectedAddress,
			total: total,
			created_at: new Date().toISOString(),
		};
		console.log(order);

		const orderRef = collection(db, "orders");
		await addDoc(orderRef, order);

		// clear cart
		const q = query(
			collection(db, "carts"),
			where("user_id", "==", user.uid)
		);
		const initialQuerySnapshot = await getDocs(q);
		const cartDoc = initialQuerySnapshot.docs[0];

		const itemsRef = doc(db, 'carts', cartDoc.id);
		// delete cart
		await deleteDoc(itemsRef)
			.then(() => {
				refetch((prev) => !prev);
			});
		// await updateDoc(itemsRef, {
		// 	items: [],
		// }).then(() => {
		// 	refetch((prev) => !prev);
		// });

		setSelectedAddress(null);
		setSubtotal(0);
		setTotal(0);

		alert('Order placed successfully!');
	};

	return (
		<>
			<Header />
			<div className="max_width_base productCart">
				<div className="max_inner_width">
					<div className="productCart__container__left">
						<h3>Shopping Cart</h3>
						<hr />
						<div className="productCart__container__left__item">
							<div className="productCart__container__left__item__image_lable">
								Image
							</div>
							<div className="productCart__container__left__item__name">
								Name
							</div>
							<div className="productCart__container__left__item__qty">
								Quentity
							</div>
							<div className="productCart__container__left__item__price">
								Price (৳)
							</div>
						</div>

						{
							!loading && (
								<>
									{cartItems.length === 0 && (
										<div className="productCart__empty">
											<span> Cart is empty.</span>{" "}
											<a href="/"> Go Shopping</a>
										</div>
									)}
									{cartItems.map((item) => (
										<div
											key={item.id}
											className="productCart__container__left__item"
										>
											<div className="productCart__container__left__item__image">
												<img src={item.product_image} alt={item.product_name} />
											</div>
											<div className="productCart__container__left__item__name">
												<a href={`/product/${item.product_id}`}>{item.product_name}</a>
											</div>
											<div className="productCart__container__left__item__qty">
												<button
													type="button"
													onClick={() => increaseQuantity(item)}
												>
													+
												</button>
												<span>{item.quantity}</span>

												<button
													type="button"
													onClick={() => decreaseQuantity(item)}
												>
													-
												</button>
											</div>
											<div className="productCart__container__left__item__price">
												{(item.product_price * item.quantity).toFixed(2)} $
											</div>
										</div>
									))}
								</>
							)
						}
					</div>
					<div className="productCart__container__right">
						<h3>Order Amount</h3>
						<hr />
						<div className="productCart__container__right__item">
							<div className="productCart__container__right__item_container">
								<div className="productCart__container__right__item__lable">
									Subtotal
								</div>
								<div className="productCart__container__right__item__value">
									<p>{subtotal.toFixed(2)} AUD</p>
								</div>
							</div>
							<hr />
							<div className="productCart__container__right__item_container">
								<div className="productCart__container__right__item__lable">
									Shipping
								</div>
								<div className="productCart__container__right__item__value">
									<p>{shipping.toFixed(2)} AUD</p>
								</div>
							</div>

							<hr />
							<div className="productCart__container__right__item_container">
								<div className="productCart__container__right__item__lable">
									Total
								</div>
								<div className="productCart__container__right__item__value">
									<p>{total.toFixed(2)} AUD</p>
								</div>
							</div>

							<hr />

							<div className='address_section'>
								<label>
									Select Shipping Address
								</label>
								<select
									onChange={(e) => setSelectedAddress(e.target.value)}
								>
									<option value="">
										Select Address
									</option>
									{
										!addressLoading && addresses.map(address => (
											<option value={address.address}>
												{address.address}
											</option>
										))
									}
								</select>
							</div>
							<button className="checkout_btn" type="button" onClick={() => handlePlaceOrder()}
							>
								Proceed to checkout
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default CartPage