import { React, useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const NoteAdd = () => {
  const context = useContext(noteContext);
  const { addNote, mode } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "General",
  });
  const onChange = (element) => {
    // This syntax means whatever properties are there by default keep it but if another value is coming then update it or add it
    // element will target the input's those have name property and assign value to it
    setNote({ ...note, [element.target.name]: element.target.value });
  };

  const handleNoteAdd = (e) => {
    e.preventDefault();
    // Sending Title, Description and Tag to the addNote function
    addNote(note.title, note.description, note.tag);

    // Resetting the state to clear the input fields
    setNote({
      title: "",
      description: "",
      tag: "General",
    });
  };
  return (
    <div className="container" style={{ marginTop: "5%" }}>
      <h2 className="text-center">
        {" "}
        <span className="text-danger">Add </span>a Note:
      </h2>
      <form action="" className="my-3" data-bs-theme={mode}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title:
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={onChange}
            placeholder={
              note.title.length === 0 ? "Title cannnot be empty" : ""
            }
            value={note.title}
            minLength={1}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onChange}
            placeholder={
              note.description.length === 0
                ? "Description cannnot be empty"
                : ""
            }
            value={note.description}
            minLength={1}
          />
        </div>
        <label htmlFor="tag" className="form-label">
          Tag:{" "}
        </label>
        <select
          className="form-control"
          id="tag"
          name="tag"
          onChange={onChange}
        >
          <option value="General">General</option>
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
          <option value="Study">Study</option>
          <option value="Motivational">Motivational</option>
        </select>
        <button
          type="submit"
          className="btn btn-danger my-3"
          onClick={handleNoteAdd}
          disabled={note.title.length === 0 || note.description.length === 0}
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default NoteAdd;
