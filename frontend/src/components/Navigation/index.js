import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();

  const handleLogoClick = () => {
    history.push("/");
  };

  return (
    <>
      <ul className="nav-list">
        <li>
          <NavLink exact to="/">
            <img
              className="logo"
              src="../icon/logo.png"
              alt="logo"
              onClick={handleLogoClick}
            />
          </NavLink>
        </li>
        {isLoaded && (
          <li id="profile-button">
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </ul>
    </>
  );
}

export default Navigation;
