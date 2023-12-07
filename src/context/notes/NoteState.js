// Importing NoteContext function
import NoteContext from "./noteContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../media/images/logo.jpg";

const NoteState = (props) => {
  let navigate = useNavigate();
  const host = "https://backend4-dsxu.onrender.com";
  const initialNotes = [];
  const [userDetails, setUserDetails] = useState("Loading...");
  const [notes, setNotes] = useState(initialNotes);
  const defaultMode = localStorage.getItem('mode') || 'light';
  const [mode, setMode] = useState(defaultMode);
  localStorage.setItem('mode', mode)

  // Update localStorage whenever the mode changes
  useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode]);

  // Here we will make state of alert for hiding the alert bar when alert=null
  const [alert, setAlert] = useState(null);

  // Showing alert with type and message and after 3 second I am setting it to null
  const showAlert = (type, message) => {
    setAlert({ type: type, message: message });
    setTimeout(() => {
      setAlert(null); // Clear alert after 3 seconds
    }, 3000);
  };

  const handleMode = () => {
    if (mode === "light") {
      setMode("dark");
    } else if (mode === "dark") {
      setMode("light");
    }
  };

  // Fetching All Notes
  const allNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const notes = await response.json();
    setNotes(notes);
  };

  useEffect(() => {
    // Here first i am checking if user is logged in or not by auth token
    if (localStorage.getItem("token")) {
      allNotes();
      setNotes(notes);
      getUser();
    }
    // If user token is not available here i am redirecting user to the login page
    else {
      navigate("/login");
    }
  }, [notes, localStorage.getItem("token")]);

  // Add a Note
  const addNote = async (title, description, tag) => {
    props.setProgress(20);
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    props.setProgress(70)
    const responseData = await response.json();
    console.log(responseData);
    // console.log(response.json());
    const note = [{ title: title, description: description, tag: tag }];
    // Here we can also do the same thing by notes.concat(note)); but we are also using setNotes because to get rid of any unexpected error and behaviour
    setNotes(notes.concat(note));
    props.setProgress(100);
    showAlert("success", "Note has been added successfully!");
  };

  // Delete a Note
  const deleteNote = async (noteId) => {
    props.setProgress(20);
    // if element._id !==id returns true then the element will stay in notes, otherwise it won't stay if it returns false
    const newNotes = notes.filter((element) => {
      return element._id !== noteId;
    });
    setNotes(newNotes);
    const response = await fetch(`${host}/api/notes/deletenote/${noteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    props.setProgress(70);
    props.setProgress(100);
    showAlert("success", "Note has been deleted successfully!");
    console.log(response.json());
  };

  // Get All details of the user
  const getUser = async () => {
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const userDetails = await response.json();
    setUserDetails(userDetails);
    console.log(userDetails);
  };
  // Update a Note
  const updateNote = async (note) => {
    props.setProgress(20);
    const { noteId, etitle, edescription, etag } = note;
    const title = etitle;
    const description = edescription;
    const tag = etag;
    const response = await fetch(`${host}/api/notes/updatenote/${noteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    props.setProgress(70);
    setNotes(notes);
    props.setProgress(100);
    showAlert("info", "Note has been updated successfully!");
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        addNote,
        deleteNote,
        updateNote,
        alert,
        showAlert,
        userDetails,
        mode,
        handleMode,
        logo
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

// Exporting NoteState for using the state anywhere
export default NoteState;
