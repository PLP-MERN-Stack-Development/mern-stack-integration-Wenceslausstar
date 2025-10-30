// Navbar.jsx - Navigation component

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/app";
import "./Navbar.css";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          MERN Blog
        </Link>

        <div className="navbar-menu">
          <Link to="/" className="navbar-link">
            Home
          </Link>

          {isAuthenticated ? (
            <>
              {user?.role === "admin" && (
                <Link to="/dashboard" className="navbar-link">
                  Dashboard
                </Link>
              )}
              <Link to="/create-post" className="navbar-link">
                Create Post
              </Link>
              <div className="navbar-user">
                <span className="navbar-username">{user?.username}</span>
                <button onClick={handleLogout} className="navbar-logout">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">
                Login
              </Link>
              <Link to="/register" className="navbar-link">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
