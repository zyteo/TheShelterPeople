import axios from "axios";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
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

function App() {
  const [auth, setAuth] = useState("NoAuth");
  const [role, setRole] = useState("Guest");
  const [userName, setUsername] = useState("");
  const navigate = useNavigate();
  // handle function for logging out, passed as props to navbar
  const handleLogOut = async (event) => {
    await axios.delete(`/api/login`);
    setAuth("NoAuth");
    setRole("Guest");
    setUsername("");
    navigate(`/`);
  };
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar
          role={role}
          auth={auth}
          handleLogOut={handleLogOut}
          userName={userName}
        />
        <Routes>
          <Route exact path="/" element={<Home />}/>
            
          <Route path="/about"element={<About />}/>
            
          <Route path="/contact"element={<Contact />}/>
            
          <Route path="/login"element={<Login
              setAuth={setAuth}
              setRole={setRole}
              setUsername={setUsername}
            />}/>
            
          <Route path="/users/new"element={<UserCreate />}/>
            
          <Route path="/cats/list"element={<CatsList role={role} />}/>
            
          <Route path="/cats/new"element={<CatsCreate role={role} auth={auth} />}/>
            
          <Route path="/cats/edit/:id"element={<CatsUpdate role={role} auth={auth} />}/>
            
          <Route path="/cats/:id"element={auth === "Auth" ? (
              <AuthCatShow userName={userName} role={role} />
            ) : (
              <CatShow />
            )}/>
            
          <Route path="/comments/edit/:id"element={<CommentUpdate />}/>
            
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
