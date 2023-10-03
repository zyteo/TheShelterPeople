import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Form,
  LoginInfo,
  LabelContainer,
  Label,
  Input,
  Button,
} from "../Styles/LoginStyle";

function Login({ setAuth, setRole, setUsername, setUserID }) {
  const [login, setLogin] = useState({});
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setLogin({ ...login, username: value });
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setLogin({ ...login, password: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post(`https://the-shelter-people-be.vercel.app/api/login`, login)
      .then((res) => {
        console.log(res.data);
        if (res.data.success === true) {
          setAuth("Auth");
          setUsername(res.data.username);
          setUserID(res.data.userid);
          if (res.data.role === "Admin") {
            setRole("Admin");
          }
          navigate(`/`);
        }
      })
      .catch((err) => {
        console.log("err", err);
        alert(
          `Sorry, login failed! If you do not have an account, please sign up for one.`
        );
      });
  };

  return (
    <>
      <h1>Login</h1>
      <Form>
        <LoginInfo>
          <LabelContainer>
            <Label>
              Username:
              <Input
                type="text"
                name="username"
                value={login.username}
                onChange={handleUsernameChange}
              />
            </Label>
            <Label>
              Password:{" "}
              <Input
                type="password"
                name="password"
                value={login.password}
                onChange={handlePasswordChange}
                minlength="6"
              />
            </Label>
          </LabelContainer>
        </LoginInfo>
        <Button type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </>
  );
}

export default Login;
