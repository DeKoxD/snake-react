import { styled } from "@linaria/react";

interface KeypadButtonContainerProps {
  "data-reverse"?: boolean;
}

const KeypadButtonContainer = styled.div<KeypadButtonContainerProps>`
  font-family: monospace;
  font-size: 15px;
  height: 30px;
  width: 50px;
  background-color: var(--colors-phone-body-light);
  padding: 0px 3px;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  gap: 5px;
  color: var(--colors-keypad-button-text);
  div {
    font-size: 10px;
  }

  &[data-reverse="true"] {
    flex-direction: row-reverse;
    justify-content: right;
  }
`;

export default KeypadButtonContainer;
