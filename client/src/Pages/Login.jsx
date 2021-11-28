import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
  Form,
  LoginInfo,
  LabelContainer,
  InputContainer,
  Label,
  Input,
  Button,
} from "../Styles/LoginStyle";

function Login({ setAuth, setRole, setUsername }) {
  const [login, setLogin] = useState({});
  const history = useHistory();

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
      .post(`/api/login`, login)
      .then((res) => {
        if (res.data.success === true) {
          setAuth("Auth");
          setUsername(res.data.username);
          if (res.data.role === "Admin") {
            setRole("Admin");
          }
          history.push(`/`);
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
            <Label>Username:</Label>
            <Label>Password:</Label>
          </LabelContainer>
          <InputContainer>
            <Input
              type="text"
              name="username"
              value={login.username}
              onChange={handleUsernameChange}
            />
            <Input
              type="password"
              name="password"
              value={login.password}
              onChange={handlePasswordChange}
              minlength="6"
            />
          </InputContainer>
        </LoginInfo>
        <Button type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </>
  );
}

export default Login;
