import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    const errors = {};
    if (credential.length < 4) {
      // errors.credential = "Username must be 4 characters or more";
      errors.credential = "";
    }
    if (password.length < 6) {
      // errors.password = "Password must be 6 characters or more";
      errors.password = "";
    }
    setErrors(errors);
  }, [credential, password]);

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

  const handleDemoLogin = (e) => {
    e.preventDefault();

    return dispatch(
      sessionActions.login({ credential: "Demo-lition", password: "password1" })
    ).then(closeModal);
  };

  return (
    <>
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

        <button
          type="submit"
          className="login-button"
          disabled={Object.keys(errors).length > 0}
        >
          Log In
        </button>
        <button className="demo-user-button" onClick={handleDemoLogin}>
          Log in as Demo User
        </button>
      </form>
    </>
  );
}

export default LoginFormModal;
