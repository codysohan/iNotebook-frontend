import React, {useEffect, useContext} from "react";
import noteContext from "../context/notes/noteContext";
import "./About.css";
import feature1 from '../media/images/feature-1.jpg';
import feature2 from '../media/images/feature-2.jpg';
import feature3 from '../media/images/feature-3.jpg';
import useTitle from "./useTitle";

const About = (props) => {
  useTitle(props.documentTitle)
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

  useEffect(() => {
    props.setProgress(50);
    props.setProgress(100);
  }, []);
  return (
    <>
      <div className="section-1">
        <div className="about-head">
          <h1 className="inotebook-heading">Hi there!</h1>
          <h4 className="inotebook-sub-heading">
            Capture, Organize, Inspire; Your Digital Notebook.
          </h4>
        </div>
      </div>
      <div className="section-2">
        <h3>Features of <span className="text-danger">iNotebook</span></h3>
        <div className="features-container">
          <div className="feature-img-container">
            <img src={feature1} alt="" />
            <p>Most secure option to save your notes!</p>
          </div>
          <div className="feature-img-container">
            <img src={feature2} alt="" />
            <p>Create, Read, Update, Delete the notes!</p>
          </div>
          <div className="feature-img-container">
            <img src={feature3} alt="" />
            <p>Most reliable option!</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
