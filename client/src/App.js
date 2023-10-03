import axios from "axios";
import React, { useState } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import "./App.css";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import AuthCatShow from "./Pages/AuthCatShow";
import CatsCreate from "./Pages/CatsCreate";
import CatShow from "./Pages/CatShow";
import CatsList from "./Pages/CatsList";
import CatsUpdate from "./Pages/CatsUpdate";
import CommentUpdate from "./Pages/CommentUpdate";
import Login from "./Pages/Login";
import UserCreate from "./Pages/UserCreate";
import NonAdoptableCatList from "./Pages/NonAdoptableCatList";

function App() {
  const [auth, setAuth] = useState("NoAuth");
  const [role, setRole] = useState("Guest");
  const [userName, setUsername] = useState("");
  const [userID, setUserID] = useState();
  const navigate = useNavigate();
  // handle function for logging out, passed as props to navbar
  const handleLogOut = async (event) => {
    await axios.delete(`https://the-shelter-people-be.vercel.app/api/login`);
    setAuth("NoAuth");
    setRole("Guest");
    setUsername("");
    setUserID();
    navigate(`/`);
  };
  return (
    <div className="App">
      <NavBar auth={auth} handleLogOut={handleLogOut} userName={userName} />
      <Routes>
        <Route exact path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

        <Route
          path="/login"
          element={
            <Login
              setAuth={setAuth}
              setRole={setRole}
              setUsername={setUsername}
              setUserID={setUserID}
            />
          }
        />

        <Route path="/users/new" element={<UserCreate />} />

        <Route path="/cats/adoptables" element={<CatsList role={role} />} />

        <Route
          path="/cats/unadoptables"
          element={<NonAdoptableCatList role={role} />}
        />

        <Route
          path="/cats/new"
          element={<CatsCreate role={role} auth={auth} />}
        />

        <Route
          path="/cats/edit/:id"
          element={<CatsUpdate role={role} auth={auth} />}
        />

        <Route
          path="/cats/:id"
          element={
            auth === "Auth" ? (
              <AuthCatShow userName={userName} role={role} userID={userID} />
            ) : (
              <CatShow />
            )
          }
        />

        <Route
          path="/comments/edit/:id"
          element={<CommentUpdate auth={auth} />}
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}
export default App;
