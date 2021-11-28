import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Navbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 6vh;
  background-color: #faf0e6;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
`;

const Li = styled.li`
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 5px 26px;
  font-size: 16px;
  border-radius: 24px;
  &:hover {
    background-color: #efbe93;
  }
  &:active {
    background-color: #efbe93;
  }
`;

const LinkStyled = styled(Link)`
  text-decoration: none;
  color: black;
  font-weight: bold;
  font-size: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  transition: all 0.2s ease;
`;

const Button = styled.button`
  font-family: "Spartan", sans-serif;
  font-weight: bold;
  padding: 10px;
  margin: 6px 2px;
  border: none;
  border-radius: 6px;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 16px;
  background-color: #EFBE93;
  transition: all 0.5s ease;
  @media only screen and (max-width: 600px) {
    border: none;
    border-radius: 6px;
    box-sizing: border-box;
    cursor: pointer;
    font-size: 14px;
    position: relative;
  }
  &:hover {
    background-color: rgb(228, 228, 228);
    transform: translateY(-0.5rem) scale(1.02);
    color: #000;
  }
  &:active {
    background-color: grey};
  }
  `;

function NavBar({ role, auth, handleLogOut, userName }) {
  return (
    <>
      <Navbar>
        <LinkStyled to="/" className="home">
          <Li>Home</Li>
        </LinkStyled>
        <LinkStyled to="/cats/list" className="cats">
          <Li>Cats</Li>
        </LinkStyled>
        <LinkStyled to="/about" className="about">
          <Li>About Us</Li>
        </LinkStyled>
        <LinkStyled to="/contact" className="contact">
          <Li>Contact Us</Li>
        </LinkStyled>
        {auth === "NoAuth" ? (
          <>
            <LinkStyled to="/users/new" className="signup">
              <Li>Signup</Li>
            </LinkStyled>
            <LinkStyled to="/login" className="login">
              <Button primary>Login</Button>
            </LinkStyled>
          </>
        ) : (
          <>
            <p>&#128571; Hello {userName}! &#128571;</p>
            <LinkStyled to="/" className="logout">
              <Button primary onClick={handleLogOut}>Logout</Button>
            </LinkStyled>
          </>
        )}
      </Navbar>
    </>
  );
}

export default NavBar;
