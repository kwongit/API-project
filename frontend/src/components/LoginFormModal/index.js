import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();

  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const { closeModal } = useModal();

  const history = useHistory();

  // useEffect(() => {
  //   const errors = {};
  //   if (credential.length < 4) {
  //     errors.credential = "Username must be 4 characters or more";
  //   }
  //   if (password.length < 6) {
  //     errors.password = "Password must be 6 characters or more";
  //   }
  //   setErrors(errors);
  // }, [credential, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const handleLogoClick = () => {
    history.push("/");
  };

  return (
    <>
      <NavLink exact to="/">
        <img
          className="logo"
          src="../icon/logo.png"
          alt="logo"
          onClick={handleLogoClick}
        />
      </NavLink>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        {errors.credential && <p>{errors.credential}</p>}

        <button type="submit">Log In</button>
      </form>
    </>
  );
}

export default LoginFormModal;
