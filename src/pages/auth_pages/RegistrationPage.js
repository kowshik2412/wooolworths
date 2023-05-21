import React, { useEffect, useState } from 'react'
import { loadStorage } from '../../utils/persistLocalStorage';
import { useNavigate } from 'react-router-dom';

function RegistrationPage() {
	const user = loadStorage("user");
	const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");


	useEffect(() => {
		if (user) {
			navigate("/");
		}
	}, []);

	const handleSignUp = (e) => {
		e.preventDefault();

		if (!username || !password) {
			return;
		}

		// registerUser({ username, email, name, password })
		// 	.then((res) => {
		// 		console.log(res);
		// 		navigate("/login");
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 	});
	};

	return (
		<div className="auth">
			<div className="auth__container">
				<div className="auth__container__header">
					<p className="header__title">Create an Account</p>
				</div>
				<form className="auth__form">
					<div className="auth__form__group">
						<label className="form__group__label">
							Username
						</label>
						<input
							className="form__group__input"
							type="text"
							placeholder="Enter your username"
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div className="auth__form__group">
						<label className="form__group__label">
							Email
						</label>
						<input
							className="form__group__input"
							type="email"
							placeholder="Enter your email"
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="auth__form__group">
						<label className="form__group__label">
							Name
						</label>
						<input
							className="form__group__input"
							type="text"
							placeholder="Enter your name"
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className="auth__form__group">
						<label className="form__group__label">
							Password
						</label>
						<input
							className="form__group__input"
							type="password"
							placeholder="Enter your password"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className="auth__form__group">
						<button
							className="form__group__button"
							type="submit"
							onClick={(e) => handleSignUp(e)}
						>
							Sign Up
						</button>
					</div>
				</form>
				<div className="auth__switch">
					<span>Already have an account?</span>
					<a href="/login">Log In</a>
				</div>
			</div>
		</div>

	)
}

export default RegistrationPage