import styled from "styled-components";

const KeypadButtonContainer = styled.button`
  font-family: monospace;
  font-size: 15px;
  height: 30px;
  width: 50px;
  background-color: ${(props) => props.theme.colors.keypadButton};
  margin: 3px;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  gap: 5px;
  div {
    font-size: 10px;
  }
`;

export default KeypadButtonContainer;
