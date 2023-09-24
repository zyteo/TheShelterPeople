import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Form,
  UserInfo,
  LabelContainer,
  Label,
  Input,
  PasswordDescription,
  PasswordInput,
  ConfirmPasswordInput,
  Button,
} from "../Styles/UserCreateStyle";

function UserCreate() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const addUser = async (user) => {
    await axios
      .post(`http://localhost:3000/api/users`, user)
      .then((res) => {
        alert(`New user ${user.username} created successfully!`);
        navigate("/login");
      })
      .catch((err) => {
        if (err.response.data.message === "username exists") {
          alert(`Sorry, username is already taken!`);
        } else if (err.response.data.message === "email exists") {
          alert(`Sorry, email is already taken!`);
        } else {
          alert(`Sorry, there was an error somehow. Try again?`);
        }
      });
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setUser({ ...user, email: value });
  };

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUser({ ...user, username: value });
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setUser({ ...user, password: value });
  };

  const handleConfirmPasswordChange = (event) => {
    const value = event.target.value;
    setUser({ ...user, confirmPassword: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (user.password.length < 6) {
      alert("Password must be at least 6 characters long!");
    } else if (user.confirmPassword !== user.password) {
      alert("Passwords do not match!");
    } else {
      addUser(user);
    }
  };

  return (
    <>
      <h1>Create New User</h1>
      <Form onSubmit={handleSubmit}>
        <UserInfo>
          <LabelContainer>
            <Label>
              Email:{" "}
              <Input
                type="email"
                name="email"
                value={user.email}
                onChange={handleEmailChange}
                required
              ></Input>
            </Label>
            <Label>
              Username:
              <Input
                type="text"
                name="username"
                value={user.username}
                onChange={handleUsernameChange}
                required
              ></Input>
            </Label>
            <Label>
              Password:
              <PasswordInput
                type="password"
                name="password"
                value={user.password}
                onChange={handlePasswordChange}
                required
              ></PasswordInput>
            </Label>
            <PasswordDescription>(min. 6 chars)</PasswordDescription>
            <Label>
              Confirm Password:
              <ConfirmPasswordInput
                type="password"
                name="confirm.password"
                value={user.confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              ></ConfirmPasswordInput>
            </Label>
          </LabelContainer>
        </UserInfo>
        <Button>Create User</Button>
      </Form>
    </>
  );
}

export default UserCreate;
