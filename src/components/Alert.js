import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Alert = () => {
  const context = useContext(noteContext);
  const { alert } = context;
  const capitalizeFirstLetter=(word)=>{
      if (word==='danger'){
        word = 'error'
      }
      return `${word.charAt(0).toUpperCase()}${word.slice(1)}`
  }
  return (
    <div style={{ height: "60px", position: "fixed", width: "100%" }}>
      {alert && (
        <div className={`alert alert-${alert.type}`} role="alert">
          <strong>{capitalizeFirstLetter(alert.type)}:</strong> {alert.message}
        </div>
      )}
    </div>
  );
};

export default Alert;
