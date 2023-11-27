import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
// useLocation hook is useful for tracking the current route location
import { useLocation } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import UserDetails from "./UserDetails";
import "./Navbar.css";
import logo from "../media/images/footer-logo.jpg";

const Navbar = (props) => {
  const context = useContext(noteContext);
  const { showAlert, mode, handleMode } = context;

  let navigate = useNavigate();
  let location = useLocation();

  const handleLogout = () => {
    props.setProgress(20);
    localStorage.removeItem("token");
    navigate("/login");
    showAlert("success", "Logged out successfully!");
    props.setProgress(100);
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary sticky-top"
        data-bs-theme={mode}
      >
        <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Image not loaded..." id="logo"/>
          </Link>
          <Link className="navbar-brand" to="/">
            iNotebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
              <li className="nav-item mode-container">
                <i
                  className={`fa-solid mode-icon ${
                    mode === "dark" ? "fa-sun" : "fa-moon text-dark"
                  }`}
                  onClick={handleMode}
                ></i>
              </li>
            </ul>
            <div className="btn-group" role="group" aria-label="Basic example">
              {/*If user is logged in, User will get logout btn otherwise he will
            get Login/Signup btn*/}
              {localStorage.getItem("token") ? (
                <>
                  <div
                    className="d-flex align-items-center"
                    style={{ width: "112px", justifyContent: "space-between", marginRight: "27px" }}
                  >
                    <i
                      className={`fa-solid fa-user text-${mode==='dark'?'light':'dark'}`}
                      id="user-icon"
                      data-bs-toggle="modal"
                      data-bs-target="#userModal"
                    ></i>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <button type="button" className="btn btn-danger">
                    <Link
                      className="text-white text-decoration-none"
                      to="/signup"
                    >
                      SignUp
                    </Link>
                  </button>
                  <button type="button" className="btn btn-danger mx-2">
                    <Link
                      className="text-white text-decoration-none"
                      to="/login"
                    >
                      Login
                    </Link>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      {/* This is my userDetails Modal here  */}
      <UserDetails />
    </>
  );
};

export default Navbar;
