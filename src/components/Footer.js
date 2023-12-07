import { React, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import noteContext from "../context/notes/noteContext";

const Footer = () => {
  const context = useContext(noteContext);
  const { mode, logo } = context;
  const [modeStyles, setModeStyles] = useState({
    backgroundColor: "white",
    color: "black",
    iconColor: "black",
  });
  // This is for dark mode and light mode
  useEffect(() => {
    if (mode === "dark") {
      setModeStyles({
        background: "linear-gradient(to bottom, #000000, #2d0000)",
        color: "white",
        iconColor: "white",
      });
    } else if (mode === "light") {
      setModeStyles({
        backgroundColor: "white",
        color: "black",
        iconColor: "black",
      });
    }
  }, [mode]);
  return (
    <>
      <div
        className="footer-container"
        id="footer-container"
        style={{ background: modeStyles.background }}
      >
        <div className="footer-copyright">
          <h4>
            <span className="footer-copyright-icon">&copy;</span>
            <span className="footer-copyright-2023"> 2023</span> iNotebook
          </h4>
        </div>
        <div className="footer-logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="footer-social-media">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            style={{ color: modeStyles.color }}
          >
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            style={{ color: modeStyles.color }}
          >
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            style={{ color: modeStyles.color }}
          >
            <i className="fa-brands fa-linkedin"></i>
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            style={{ color: modeStyles.color }}
          >
            <i className="fa-brands fa-x-twitter"></i>
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer;
