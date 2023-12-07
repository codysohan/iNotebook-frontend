import { React, useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import useTitle from "./useTitle";
import "./SignupPage.css";

const SignupPage = (props) => {
  useTitle(props.documentTitle);
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
  // cpassword means confirm password
  const [credentials, SetCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const handleSignup = async (e) => {
    props.setProgress(20);
    // It will prevent to load a page when user will click on Login
    e.preventDefault();
    // Here I am checking If password and confirm password is same or not
    if (credentials.password !== credentials.cpassword) {
      showAlert("danger", "Password and cofirm password doesn't match!");
    } else {
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        }),
      });
      props.setProgress(70);
      const responseData = await response.json();
      console.log(responseData);
      // Here I am checking if email exists or not and then handle situation according to it
      if (!responseData.emailExists && responseData.signupSuccess) {
        // Saving authToken in localstorage because user don't need to login everytime
        localStorage.setItem("token", responseData.authToken);
        // After saving authToken I am redirecting user to this url '/' (Homepage)
        navigate("/");
        // This will show alert after the signup is successfull
        showAlert("success", "Signup successfull!");
      } else if (responseData.emailExists) {
        // This will show alert if email already exists
        showAlert("danger", "Email address already exists!");
      }
    }
    props.setProgress(100);
  };
  return (
    <div className="container" style={{ marginTop: "5%", height: "80vh" }}>
      <h3 className="text-center">
        <span className="text-danger">Create an account</span> to continue to
        iNotebook...
      </h3>
      <form
        className="container mt-2"
        onSubmit={handleSignup}
        data-bs-theme={mode}
      >
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            onChange={onChange}
            name="name"
            value={credentials.name}
            required
          />
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
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={onChange}
            name="password"
            value={credentials.password}
            minLength={8}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            onChange={onChange}
            name="cpassword"
            value={credentials.cpassword}
            minLength={8}
            required
          />
        </div>
        <button type="submit" className="btn btn-danger">
          Signup
        </button>
      </form>
      <p className="anAccount" >Already have an account? <Link to="/login" className="linkStyleFix">Login here</Link></p>
    </div>
  );
};

export default SignupPage;
