import React, { useState } from 'react';
import './contactPage.scss';
import { db } from "../../firebase.config";
import { addDoc, collection } from "firebase/firestore";
import Header from '../../components/header/Header';

function ContactPage() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');

	const handleSend = async (e) => {
		e.preventDefault();

		if (name === '' || email === '' || message === '') {
			alert('Please fill all the fields');
			return;
		}

		const new_message = {
			name,
			email,
			message,
			createdAt: new Date()
		};
		const messageRef = collection(db, "messages");
		await addDoc(messageRef, new_message)
			.then((docRef) => {
				alert('Message Sent');
				setName('');
				setEmail('');
				setMessage('');
			})
			.catch((error) => {
				alert('Error sending message');
				console.error("Error adding document: ", error);
			});
	};
	return (
		<>
			<Header />
			<div className="page_container">
				<h1>
					Contact Us
				</h1>

				<form className="contactForm">
					<div className="contactForm__inputHolder">
						<label htmlFor="name">Name</label>
						<input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
					</div>
					<div className="contactForm__inputHolder">
						<label htmlFor="email">Email</label>
						<input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
					</div>
					<div className="contactForm__inputHolder">
						<label htmlFor="message">Message</label>
						<textarea name="message" id="message" cols="30" rows="10" value={message} onChange={(e) => setMessage(e.target.value)} ></textarea>
					</div>
					<div className="contactForm__inputHolder">
						<button className="primary_button" onClick={(e) => handleSend(e)}
						>Send</button>
					</div>
				</form>
			</div>
		</>
	)
}

export default ContactPage;
