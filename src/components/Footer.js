import { React, useContext, useEffect } from "react";
import "./Footer.css";
import noteContext from "../context/notes/noteContext";
import footerLogo from "../media/images/footer-logo.jpg";

const Footer = () => {
  const context = useContext(noteContext);
  const { mode } = context;
  useEffect(() => {
    const footer = document.getElementById('footer');
    if (mode === "dark") {
      footer.style.backgroundColor = "#190303";
      document.body.style.color = "white";
    } else if (mode === "light") {
      footer.style.backgroundColor = "white";
      document.body.style.color = "black";
    }
  }, [mode]);
  return (
    <div className="footer-container" id="footer">
      <div className="footer-left-item">
        <img src={footerLogo} alt="" />
        <h3>iNotebook</h3>
        {/* <hr/> */}
        <p>Copyright &copy; 2023 iNotebook.com</p>
      </div>
      <div className="footer-right-item">
        <a href="https://www.facebook.com" target="_blank">
          <i className="fa-brands fa-facebook-f"></i>
        </a>
        <a href="https://www.twitter.com" target="_blank">
          <i className="fa-brands fa-x-twitter"></i>
        </a>
        <a href="https://www.instagram.com" target="_blank">
          <i className="fa-brands fa-instagram"></i>
        </a>
        <a href="https://www.github.com" target="_blank">
          <i className="fa-brands fa-github"></i>
        </a>
      </div>
    </div>
  );
};

export default Footer;
