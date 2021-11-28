import styled from "styled-components"

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-contents: center;
  align-items: center;
`;

export const UserInfo = styled.div`
  display: flex;
  justify-contents: center;
  align-items: center;
  margin-bottom: 10px;
`;

export const LabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 2px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  margin: 8px 5px 0px 0px;
  padding: 4px;
`;

export const Input = styled.input`
font-family: "Spartan", sans-serif;
padding: 2px 2px;
margin: 5px 5px;
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

export const PasswordDescription = styled.p`
  font-size: 10px;
  margin: -2px 5px 0px 11px;
`;

export const PasswordLabel = styled.label`
  margin: 11px 5px 0px 0px;
  padding: 4px;
`;

export const PasswordInput = styled.input`
  font-family: "Spartan", sans-serif;
  padding: 3px 2px;
  margin: 7px 5px;
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

export const ConfirmPasswordInput = styled.input`
  font-family: "Spartan", sans-serif;
  padding: 3px 2px;
  margin: 10px 5px -3px 5px;
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