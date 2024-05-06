import styled from "styled-components";

interface KeypadButtonContainerProps {
  $reverse?: boolean;
  $lit?: boolean;
}

const KeypadButtonContainer = styled.button<KeypadButtonContainerProps>`
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
  ${(props) =>
    props.$reverse && `flex-direction: row-reverse; justify-content: right;`}
  ${(props) => props.$lit && `color: ${props.theme.colors.backlight};`}
`;

KeypadButtonContainer.defaultProps = {
  $reverse: false,
  $lit: false,
};

export default KeypadButtonContainer;
