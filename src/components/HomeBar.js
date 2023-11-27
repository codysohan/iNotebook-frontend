import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import Notes from "./Notes";
import useTitle from "./useTitle";

const Home = (props) => {
  useTitle(props.documentTitle);
  const context = useContext(noteContext);
  const { mode } = context;
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
  const authToken = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if authToken is not present, then navigate to login
    if (!authToken) {
      navigate("/login");
    }
  }, [authToken, navigate]);

  useEffect(() => {
    props.setProgress(50);
    props.setProgress(100);
  }, []);

  return (
    // First it will check authToken is available or not, If authToken is true then only it will render Notes otherwise it won't
    authToken && <Notes />
  );
};

export default Home;
