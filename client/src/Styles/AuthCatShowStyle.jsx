import styled from "styled-components"

export const Img = styled.img`
  border-radius: 80%;
  object-fit: cover;
`;

export const Button = styled.button`
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
  }
  &:active {
    background-color: grey};
  }
`;

export const Button2 = styled.button`
  font-family: "Spartan", sans-serif;
  font-weight: bold;
  padding: 7px;
  margin: 6px 2px;
  border: none;
  border-radius: 6px;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 10px;
  background-color: #EFBE93;
  @media only screen and (max-width: 600px) {
    border: none;
    border-radius: 6px;
    box-sizing: border-box;
    cursor: pointer;
    font-size: 10px;
    position: relative;
  }
  &:hover {
    background-color: rgb(228, 228, 228);
  }
  &:active {
    background-color: grey};
  }
  text-align: center;
`;

 export const ContentBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  grid-area: content;
  align-items: center;
`;

export const Content1 = styled.div`
  width: 500px;
  height: 100%;
`;

export const Container = styled.div`
  width: 500px;
`;