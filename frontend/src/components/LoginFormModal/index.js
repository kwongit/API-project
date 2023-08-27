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
      <div className="login-form-container">
        <h1>Log In</h1>
        <div className="error-login">
          {errors.credential && <p>{errors.credential}</p>}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="username-email-password">
            <div className="username-email">
              <label>
                <input
                  type="text"
                  value={credential}
                  placeholder="Username or Email"
                  onChange={(e) => setCredential(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="password">
              <label>
                <input
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
            </div>
          </div>
          <div className="login-demo-button">
            <button
              className="login-button"
              disabled={Object.keys(errors).length > 0}
              type="submit"
            >
              Log In
            </button>
            <button className="demo-user-button" onClick={handleDemoLogin}>
              Log in as Demo User
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginFormModal;
