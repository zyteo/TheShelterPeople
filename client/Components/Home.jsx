import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import catimg from "../Components/catimg.jpg";

const HeroContainer = styled.div`
  background-image: linear-gradient(
      to top right,
      rgba(11, 10, 10, 0.38),
      rgba(11, 10, 10, 0.19)
    ),
    url(${catimg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 94vh;
  @media only screen and (max-width: 1600px) {
    height: 94vh;
  }
`;

const HeroContent = styled.section`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #fffefe;
  @media only screen and (max-width: 375px) {
    text-align: start;
    height: 80%;
  }
`;

const HeroContentText = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 600px) {
    width: 80%;
  }
  @media only screen and (max-width: 375px) {
    position: absolute;
    align-items: flex-start;
  }
`;

const HeroTitle = styled.h1`
  font-size: 53px;
  font-weight: 900;
  display: flex;
  @media only screen and (max-width: 600px) {
    width: 80%;
  }
  @media only screen and (max-width: 375px) {
    position: absolute;
    align-items: flex-start;
  }
`;

const HeroText = styled.h3`
  font-size: 20px;
  font-weight: 400;
  padding: 2.5rem 2rem;
  @media only screen and (max-width: 375px) {
    padding: 1.5rem 0;
  }
`;

const HeroBtn = styled(Link)`
  text-decoration: none;
  outline: none;
  border: none;
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
  font-size: 20px;
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

function Home() {
  return (
    <div>
      <HeroContainer>
        <HeroContent>
          <HeroContentText>
            <HeroTitle>
                Join us on our journey to share love and support for animals!
            </HeroTitle>
            <HeroText>
              Feel free to reach out to us via our contact page for more
              information with regards to the shelter, volunteering, adoption or
              cat related knowledge!
            </HeroText>
            <HeroBtn to="/cats/list">
              <Button primary big bigFont bigRadius>
                View the cats today!
              </Button>
            </HeroBtn>
          </HeroContentText>
        </HeroContent>
      </HeroContainer>
    </div>
    // <>
    // <Photo src={catimg} alt="Banner" />
    // </>
  );
}

export default Home;
