import styled from "styled-components"

export const Img = styled.img`
  border-radius: 80%;
  object-fit: cover;
  @media only screen and (max-width: 510px) {
    width:300px;
    height:300px;
  }
  @media only screen and (max-width: 300px) {
    width:200px;
    height:200px;
  }
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
  &:hover {
    background-color: rgb(228, 228, 228);
  }
  &:active {
    background-color: grey};
  }
  @media only screen and (max-width: 600px) {
    border: none;
    border-radius: 6px;
    box-sizing: border-box;
    cursor: pointer;
    font-size: 14px;
    position: relative;
  }
  @media only screen and (max-width: 300px) {
    font-size: 9px;
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
  text-align: center;
  &:hover {
    background-color: rgb(228, 228, 228);
  }
  &:active {
    background-color: grey};
  }
  @media only screen and (max-width: 600px) {
    border: none;
    border-radius: 6px;
    box-sizing: border-box;
    cursor: pointer;
    font-size: 10px;
    position: relative;
  }
  @media only screen and (max-width: 300px) {
    font-size: 8px;
  }
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
  @media only screen and (max-width: 510px) {
    font-size: 12px;
    width:100%;
  }
  @media only screen and (max-width: 300px) {
    font-size: 9px;
  }
`;

export const Container = styled.div`
  width: 500px;
`;