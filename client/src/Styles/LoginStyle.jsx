import styled from "styled-components"

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-contents: center;
  align-items: center;
`;

export const LoginInfo = styled.div`
  display: flex;
  justify-contents: center;
  align-items: center;
`;

export const LabelContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  margin: 4px 5px;
  padding: 4px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

export const Input = styled.input`
  font-family: "Spartan", sans-serif;
  padding: 2px;
  margin: 5px;
  border: 1px solid black;
  border-radius: 6px;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 16px;
  @media only screen and (max-width: 600px) {
    border: 1px solid black;
    border-radius: 6px;
    box-sizing: border-box;
    cursor: pointer;
    font-size: 14px;
    position:relative;
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