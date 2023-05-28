import React, { useEffect, useState } from "react";
import { loginUser } from "../../apis/auth.api";
import { loadStorage, saveStorage } from "../../utils/persistLocalStorage";
import { useNavigate } from "react-router-dom";
import './auth.scss';
import Header from "../../components/header/Header";

const LoginPage = () => {
  const user = loadStorage("user");
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      return;
    }

    loginUser({ username, password })
      .then((res) => {
        console.log(res);
        saveStorage("token", res.data["tokens"]);
        saveStorage("user", res.data["user"]);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="auth">
      <div className="auth__container">
        <div className="auth__container__header">
          <p className="header__title">Welcome back!</p>
        </div>
        <form className="auth__form">
          <div className="auth__form__group">
            <label className="form__group__label">
              Username
            </label>
            <input
              className="form__group__input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
