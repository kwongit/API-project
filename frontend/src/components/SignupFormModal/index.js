import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  useEffect(() => {
    const errors = {};

    if (firstName.length < 1) {
      errors.firstName = "";
    }
    if (lastName.length < 1) {
      errors.lastName = "";
    }
    if (email.length < 1) {
      errors.email = "";
    }
    if (username.length < 4) {
      errors.username = "";
    }
    if (password.length < 6) {
      errors.password = "";
    }
    if (confirmPassword.length < 6) {
      errors.confirmPassword = "";
    }

    setErrors(errors);
  }, [email, username, firstName, lastName, confirmPassword, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            console.log(data);
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword:
        "Confirm Password field must be the same as the Password field",
    });
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>

      {errors.firstName && (
        <p className="on-submit-errors">{errors.firstName}</p>
      )}
      {errors.lastName && <p className="on-submit-errors">{errors.lastName}</p>}
      {errors.email && <p className="on-submit-errors">{errors.email}</p>}
      {errors.username && <p className="on-submit-errors">{errors.username}</p>}
      {errors.password && <p className="on-submit-errors">{errors.password}</p>}
      {errors.confirmPassword && (
        <p className="on-submit-errors">{errors.confirmPassword}</p>
      )}

      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            value={firstName}
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            type="text"
            value={lastName}
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            type="password"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>

        <button
          className="submit-button"
          type="submit"
          disabled={Object.keys(errors).length > 0}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupFormModal;
