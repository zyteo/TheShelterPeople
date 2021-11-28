import axios from "axios";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
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
  const history = useHistory();
  // handle function for logging out, passed as props to navbar
  const handleLogOut = async (event) => {
    await axios.delete(`/api/login`);
    setAuth("NoAuth");
    setRole("Guest");
    setUsername("");
    history.push(`/`);
  };
  return (
    <div className="App">
      <Router>
        <NavBar
          role={role}
          auth={auth}
          handleLogOut={handleLogOut}
          userName={userName}
        />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/contact">ivesh
            <Contact />
          </Route>
          <Route path="/login">
            <Login
              setAuth={setAuth}
              setRole={setRole}
              setUsername={setUsername}
            />
          </Route>
          <Route path="/users/new">
            <UserCreate />
          </Route>
          <Route path="/cats/list">
            <CatsList role={role} />
          </Route>
          <Route path="/cats/new">
            <CatsCreate role={role} auth={auth} />
          </Route>
          <Route path="/cats/edit/:id">
            <CatsUpdate role={role} auth={auth} />
          </Route>
          <Route path="/cats/:id">
            {auth === "Auth" ? (
              <AuthCatShow userName={userName} role={role} />
            ) : (
              <CatShow />
            )}
          </Route>
          <Route path="/comments/edit/:id">
            <CommentUpdate />
          </Route>
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
