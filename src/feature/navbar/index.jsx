import React from "react";
import "./navbar.scss";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { isUserLoggedInSelector } from "../auth/authselectors";
import CreatePost from "../blog/CreatePost";

export default function NavigationBar() {
  const isUserLoggedIn = useSelector(isUserLoggedInSelector);

  return (
    <div className="navbar-container">
      <div className="left-container">
        <img
          src="https://cdn.logojoy.com/wp-content/uploads/2018/05/30164225/572-768x591.png"
          alt="logo"
        />
      </div>
      {isUserLoggedIn ? (
        <CreatePost />
      ) : (
        <div className="right-container">
          <NavLink to={{ pathname: "/signup" }} className="btn signup-btn">
            Signup
          </NavLink>
          <NavLink to={{ pathname: "/login" }} className="btn login-btn">
            Login
          </NavLink>
        </div>
      )}
    </div>
  );
}
