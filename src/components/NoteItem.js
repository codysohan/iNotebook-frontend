import { React, useState, useEffect, useContext } from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote, notes, mode } = context;
  // Making state for updating and using the TagColor
  const [TagColor, setTagColor] = useState("secondary");
  // Changing the background color of tag according to the name
  const tagColor = () => {
    if (props.notes.tag === "General") {
      setTagColor("success");
    } else if (props.notes.tag === "Personal") {
      setTagColor("danger");
    } else if (props.notes.tag === "Work") {
      setTagColor("primary");
    } else if (props.notes.tag === "Study") {
      setTagColor("info");
    } else if (props.notes.tag === "Motivational") {
      setTagColor("warning");
    }
  };
  // Running tagColor fn after the DOM is loaded
  useEffect(() => {
    tagColor();
  }, [notes]);

  return (
    <div className="col-md-3 mx-4" data-bs-theme={mode}>
      <div className="card my-3" style={{ width: "18rem" }}>
        <span
          className={`position-absolute top-0 start-50 translate-middle badge rounded-pill bg-${TagColor} text-white`}
        >
          {props.notes.tag}
        </span>
        <div className="card-body">
          <div className="d-flex justify-content-around align-items-center">
            {/* To target the bootstrap modal we add these properties to a button  
            data-bs-toggle="modal"
            data-bs-target="#exampleModal" */}
            <i
              className="fa-solid fa-pen-to-square text-danger"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={() => {
                props.editedText(props.notes);
              }}
            ></i>
            <h5 className="card-title text-center">{props.notes.title}</h5>
            <i
              className="fa-solid fa-trash text-danger"
              onClick={() => deleteNote(props.notes._id)}
            ></i>
          </div>
          <p className="card-text text-center">{props.notes.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
