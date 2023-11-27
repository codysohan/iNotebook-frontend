import React, { useContext, useEffect} from "react";
import noteContext from "../context/notes/noteContext";

const UserDetails = () => {
  const context = useContext(noteContext);
  const { userDetails, mode } = context;
  // This is for dark mode and light mode
  useEffect(() => {
    if (mode === "dark") {
      document.body.style.color = "white";
    } else if (mode === "light") {
      document.body.style.color = "black";
    }
  }, [mode]);
  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-IN", options);
  };
 
  return (
    <div
      className="modal fade"
      id="userModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      data-bs-theme={mode}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              <span className="text-danger">Personal</span> Information
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p><strong>Name:  </strong>{userDetails.name}</p>
            <p><strong>Email: </strong>{userDetails.email}</p>
            <p><strong>Account created on: </strong>{formatDate(userDetails.date)}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
