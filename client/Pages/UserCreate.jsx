import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
  Form,
  UserInfo,
  LabelContainer,
  InputContainer,
  Label,
  Input,
  PasswordDescription,
  PasswordLabel,
  PasswordInput,
  ConfirmPasswordInput,
  Button,
} from "../Styles/UserCreateStyle";

const addUser = async (user) => {
  console.log("user", user);
  await axios.post(`/api/users`, user);
};

function UserCreate() {
  const [user, setUser] = useState({});
  const history = useHistory();

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
      alert(`New user ${user.username} created successfully!`);
      history.push("/login");
    }
  };

  return (
    <>
      <h1>Create New User</h1>
      <Form onSubmit={handleSubmit}>
        <UserInfo>
          <LabelContainer>
            <Label>Email:</Label>
            <Label>Username:</Label>
            <PasswordLabel>Password:</PasswordLabel>
            <PasswordDescription>(min. 6 chars)</PasswordDescription>
            <PasswordLabel>Confirm Password:</PasswordLabel>
          </LabelContainer>
          <InputContainer>
            <Input
              type="email"
              name="email"
              value={user.email}
              onChange={handleEmailChange}
              required
            ></Input>
            <Input
              type="text"
              name="username"
              value={user.username}
              onChange={handleUsernameChange}
              required
            ></Input>
            <PasswordInput
              type="password"
              name="password"
              value={user.password}
              onChange={handlePasswordChange}
              required
            ></PasswordInput>
            <ConfirmPasswordInput
              type="password"
              name="confirm.password"
              value={user.confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            ></ConfirmPasswordInput>
          </InputContainer>
        </UserInfo>
        <Button>Create User</Button>
      </Form>
    </>
  );
}

export default UserCreate;
