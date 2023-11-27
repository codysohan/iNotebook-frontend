import { React, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import "./LoginPage.css";
import useTitle from "./useTitle";

const LoginPage = (props) => {
  const context = useContext(noteContext);
  const { showAlert, mode } = context;

  const authToken = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    // Check if authToken is present, then navigate to homepage. I don't want user to access login page if user is already logged in
    if (authToken) {
      navigate("/");
    }
  }, [authToken, navigate]);

  useEffect(() => {
    props.setProgress(50);
    props.setProgress(100);
  }, []);

  useTitle(props.documentTitle);
  // This is for dark mode and light mode
  useEffect(() => {
    if (mode === "dark") {
      document.body.style.backgroundColor = "black";
      document.body.style.color = "white";
    } else if (mode === "light") {
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
    }
  }, [mode]);

  const host = "https://backend4-dsxu.onrender.com";
  const onChange = (element) => {
    // This syntax means whatever properties are there by default keep it but if another value is coming then update it or add it
    // element will target the input's those have name property and assign value to it
    SetCredentials({
      ...credentials,
      [element.target.name]: element.target.value,
    });
  };

  const [credentials, SetCredentials] = useState({ email: "", password: "" });
  const handleLogin = async (e) => {
    props.setProgress(20);
    // It will prevent to load a page when user will click on Login
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    props.setProgress(70);
    const responseData = await response.json();
    console.log(responseData);

    if (responseData.loginSuccess) {
      // Saving authToken in localstorage because user don't need to login everytime
      localStorage.setItem("token", responseData.authToken);
      // After saving authToken I am redirecting user to this url '/' (Homepage)
      navigate("/");
      // This will show alert after the login is successfull
      showAlert("success", "Login successfull!");
    } else {
      // This will show alert after the login is unsuccessfull
      showAlert("danger", "Please login with correct credentials");
    }
    props.setProgress(100);
  };
  return (
    <div className="container" style={{ marginTop: "6%" }}>
      <h3 className="text-center">
        <span className="text-danger">Login</span> here to continue to
        iNotebook...
      </h3>
      <form className="container" onSubmit={handleLogin} data-bs-theme={mode}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={onChange}
            name="email"
            value={credentials.email}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={onChange}
            name="password"
            value={credentials.password}
          />
        </div>
        <button type="submit" className="btn btn-danger">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
