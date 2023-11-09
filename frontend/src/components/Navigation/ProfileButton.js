import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { NavLink, useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push("/");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <div className="user-nav">
        {user ? (
          <span>
            <NavLink className="create-new-spot" to="/spots/new">
              Create a New Spot
            </NavLink>
          </span>
        ) : (
          ""
        )}
        <button className="user-button-container" onClick={openMenu}>
          <i className="fa-solid fa-bars"></i>
          <i className="fas fa-user-circle" />
        </button>
      </div>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li> Hello, {user.firstName}</li>
            <li>{user.email}</li>
            <li>
              <NavLink
                exact
                to="/spots/current"
                className="manage-spots-current"
              >
                Manage Spots
              </NavLink>
            </li>
            <li>
              {/* <NavLink
                className="manage-reviews-current"
                exact
                to="/reviews/current"
              >
                Manage Reviews
              </NavLink> */}
              <div
                className="manage-reviews-current"
                onClick={() => alert("Feature Coming Soon...")}
              >
                Manage Reviews
              </div>
            </li>
            <li>
              <NavLink
                className="manage-bookings-current"
                exact
                to="/bookings/current"
              >
                Manage Bookings
              </NavLink>
              {/* <div
                className="manage-bookings-current"
                onClick={() => alert("Feature Coming Soon...")}
              >
                Manage Bookings
              </div> */}
            </li>
            <li className="logout-button-container">
              <button className="logout-button" onClick={logout}>
                Log Out
              </button>
            </li>
          </>
        ) : (
          <>
            <div className="signup-modal">
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </div>
            <div className="login-modal">
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </div>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
