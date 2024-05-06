import React from "react";
import KeypadButtonContainer from "./style/KeypadButtonContainer";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  digit: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "*" | "0" | "#";
  letters?: string;
}

const KeypadButton = ({ digit, letters, ...rest }: Props) => (
  <KeypadButtonContainer {...rest}>
    {digit}
    {letters && <div>{letters}</div>}
  </KeypadButtonContainer>
);

export default KeypadButton;
