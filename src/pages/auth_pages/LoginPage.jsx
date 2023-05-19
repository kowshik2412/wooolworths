import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase.config.js';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loginUser } from "../../apis/auth.api";
import { loadStorage, saveStorage } from "../../utils/persistLocalStorage";
import './auth.scss';
import { toast } from 'react-toastify';
import Header from "../../components/header/Header";
import { GoogleButton } from 'react-google-button';
import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import UseAuth from "../../hooks/useAuth.js";

const LoginPage = () => {
  const navigate = useNavigate();
  const loation = useLocation();
  const user = UseAuth();
  const from = loation.state?.from || '/';

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    const userCredential = await signInWithEmailAndPassword(auth, email, password)

    const user = userCredential.user
    saveStorage("user", user);
    navigate("/");

    // loginUser({ username, password })
    //   .then((res) => {
    //     console.log(res);
    //     saveStorage("token", res.data["tokens"]);
    //     saveStorage("user", res.data["user"]);
    //     navigate("/");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(result => {
        const { displayName, uid } = result.user.uid;
        console.log(result.user);
        saveStorage("user", user);
        // navigate("/");
        navigate(
          from,
          {
            replace: true,
            state: { uid, userName: displayName },
          }
        );
      })
      .catch(err => console.log(err));

  }
  const handleGoogleSignIn = async () => {
    try {
      googleSignIn();
    }
    catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <div className="auth">
      <div className="auth__container">
        <div className="auth__container__header">
          <p className="header__title">Welcome back!</p>
        </div>
        <GoogleButton onClick={handleGoogleSignIn} />
        {/* <form className="auth__form">
          <div className="auth__form__group">
            <label className="form__group__label">
              Email
            </label>
            <input
              className="form__group__input"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="auth__form__group">
            <label className="form__group__label">
              Password
            </label>
            <input

              className="form__group__input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="auth__form__group">
            <button
              className="form__group__button"
              type="submit"
              onClick={(e) => handleLogin(e)}
            >
              Log In
            </button>
          </div>
        </form>
        <div className="auth__switch">
          <span>Don't have an account?</span>
          <a href="/register">Sign Up</a>
        </div> */}
      </div>
    </div>
  );
};

export default LoginPage;
