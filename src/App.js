import "./App.css";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// Importing Components here
import Home from "./components/HomeBar.js";
import About from "./components/About.js";
import Navbar from "./components/Navbar.js";
import Alert from "./components/Alert.js";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import Footer from "./components/Footer";
import NoteState from "./context/notes/NoteState.js";
import LoadingBar from "react-top-loading-bar";

function App() {
  const [progress, setProgress] = useState(0);
  return (
    <>
      <BrowserRouter>
        <NoteState setProgress={setProgress}>
          <LoadingBar height={3} color="#f11946" progress={progress} />
      <div className="app-container">
          <Navbar setProgress={setProgress} />
          <Alert />
          <Routes>
            <Route
              exact
              path="/"
              element={<Home documentTitle="Home - iNotebook" setProgress={setProgress} />}
            />
            <Route
              exact
              path="/about"
              element={
                <About
                  documentTitle="About - iNotebook"
                  setProgress={setProgress}
                />
              }
            />
            <Route
              exact
              path="/login"
              element={
                <LoginPage
                  documentTitle="Login - iNotebook"
                  setProgress={setProgress}
                />
              }
            />
            <Route
              exact
              path="/signup"
              element={
                <SignupPage
                  documentTitle="Create account - iNotebook"
                  setProgress={setProgress}
                />
              }
            />
          </Routes>
          </div>
          <Footer />
        </NoteState>
      </BrowserRouter>
    </>
  );
}

export default App;
