import React from "react";
import KeypadButtonContainer from "./style/KeypadButtonContainer";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  digit: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "*" | "0" | "#";
  letters?: string;
  reverse?: boolean;
  lit?: boolean;
}

const KeypadButton = ({ digit, letters, reverse, lit, ...rest }: Props) => (
  <KeypadButtonContainer $reverse={reverse} $lit={lit} {...rest}>
    {digit}
    {letters && <div>{letters}</div>}
  </KeypadButtonContainer>
);

export default KeypadButton;
