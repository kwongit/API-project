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
    <ul>
      <li>
        <NavLink exact to="/">
          <img
            className="logo"
            src="../icon/chillbnb.png"
            alt="chillbnb"
            onClick={handleLogoClick}
          />
        </NavLink>
      </li>
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
