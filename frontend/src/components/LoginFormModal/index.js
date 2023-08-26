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
  const [loginError, setLoginError] = useState("");
  const { closeModal } = useModal();

  useEffect(() => {
    const errors = {};
    if (credential.length < 4) {
      errors.credential = "Username must be 4 characters or more";
    }
    if (password.length < 6) {
      errors.password = "Password must be 6 characters or more";
    }
    setErrors(errors);
  }, [credential, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    setLoginError("");

    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          // console.log("data", data);
          // console.log("data errors", data.errors);
          setErrors(data.errors);
          setLoginError("The provided credentials were invalid");
        }
      });
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

        {errors.credential && credential.length > 0 && (
          <p className="error-message">{errors.credential}</p>
        )}
        {errors.password && password.length > 0 && (
          <p className="error-message">{errors.password}</p>
        )}

        {loginError && <p className="error-message">{loginError}</p>}

        <button type="submit" disabled={Object.keys(errors).length > 0}>
          Log In
        </button>
      </form>
    </>
  );
}

export default LoginFormModal;
