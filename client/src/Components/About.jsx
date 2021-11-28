import React from "react";
import logo from "../Components/logo.png";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  height: 2vh;
  color: white;
`;

const ContentBox = styled.div`
  display: flex;
  align-items: center;
  grid-area: content;
  justify-content: center;
  grid-gap: 50px;
`;

const Content1 = styled.div`
  width: 100%;
  height: 100%;
`;

const P = styled.p`
  margin-top: 1em;
  margin-bottom: 1em;
`;

const Content2 = styled(Content1)``;
const Content3 = styled(Content1)``;
const Content4 = styled(Content1)``;

const Logo = styled.img`
    width: 80%;
    height: 80%;
`;

function About() {
  return (
    <>
      <h1>About Us</h1>
      <Container></Container>
      <ContentBox>
        <Content1></Content1>
        <Content2><Logo src={logo}></Logo></Content2>
        <Content3>
          <P>This is a website run by The Shelter People x GA SEI-32 students to
          update about TSP's progress at the shelter.</P>
          <P>In the past 2 years, we have been raising awareness to animal shelters
          by bringing the volunteering experience to our family and friends so
          they can have a glimpse of what life is like for cats and dogs at the
          shelter.</P>
          <P>We have also seen the growth of the cats - from skittish to friendly,
          wanting pats and cuddles. We have also seen death - which is
          inevitable, comes with age and their rugged lives when they were
          strays.</P>
          <P>We hope to create more opportunities to connect and awareness to the
          public on not abandoning their pets, pets are for life.
          In turn, visits to the shelter can help the shelter cats to become
          more sociable and gain higher chance at getting adopted.</P>
        </Content3>
        <Content4></Content4>
      </ContentBox>
    </>
  );
}

export default About;
