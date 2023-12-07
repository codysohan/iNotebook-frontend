import { React, useContext, useState } from "react";
import NoteItem from "./NoteItem";
import noteContext from "../context/notes/noteContext";
import NoteAdd from "./NoteAdd";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, updateNote, mode } = context;
  // Here e means edited
  const [enote, setEnote] = useState({
    noteId: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  // I have sent the all notes in note from NoteItem in updateNote function
  const editedText = (note) => {
    setEnote({
      noteId: note._id,
      etitle: note.title,
      edescription: note.description,
      etag: note.tag,
    });
  };
  // const handleClick = (e) => {
  //   console.log("Updating the Note...", enote);
  //   e.preventDefault();

  // };

  const onChange = (element) => {
    // This syntax means whatever properties are there by default keep it but if another value is coming then update it or add it
    // element will target the input's those have name property and assign value to it
    setEnote({ ...enote, [element.target.name]: element.target.value });
  };
  return (
    <>
      <NoteAdd />
      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        data-bs-theme={mode}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Update Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form action="" className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    value={enote.etitle}
                    placeholder={enote.etitle.length===0 ? "Title cannot be empty": ""}
                    onChange={onChange}
                    minLength={1}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={onChange}
                    value={enote.edescription}
                    placeholder={enote.edescription.length===0 ? "Description cannot be empty": ""}
                    minLength={1}
                  />
                </div>
                <label htmlFor="etag" className="form-label">
                  Tag:{" "}
                </label>
                <select
                  className="form-control"
                  id="etag"
                  name="etag"
                  onChange={onChange}
                  value={enote.etag}
                >
                  <option value="General">General</option>
                  <option value="Personal">Personal</option>
                  <option value="Work">Work</option>
                  <option value="Study">Study</option>
                  <option value="Motivational">Motivational</option>
                </select>
              </form>
            </div>
            <div className="modal-footer justify-content-center">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  updateNote(enote);
                }}
                disabled={enote.etitle.length === 0 || enote.edescription.length === 0}
                data-bs-dismiss="modal"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row text-center d-flex justify-content-center" style={{width: "100vw"}}>
        <h2 className="my-4">
          Your <span className="text-danger">All</span> Notes:{" "}
        </h2>
        {notes.length === 0 ? (
          <h5
            className="text-danger"
          >
            {" "}
            No Notes are available! <i className="fa-regular fa-face-meh text-white"></i>{" "}
          </h5>
        ) : (
          notes.map((note) => (
            <NoteItem key={note._id} editedText={editedText} notes={note} />
          ))
        )}
      </div>
      <div className="container">
        {/* TO DO Handle All Notes Delete in backdend */}
        <button type="submit" className="btn btn-dark my-3">
          <i
            className="fa-solid fa-triangle-exclamation"
            style={{ color: "#ff0000" }}
          ></i>{" "}
          Delete All Notes
        </button>
      </div>
    </>
  );
};

export default Notes;
