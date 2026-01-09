import { KeypadButtonContainer as KeypadButtonTextContainer } from "./styles";

export type Keys =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "*"
  | "0"
  | "#";

interface KeypadButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  digit: Keys;
  letters?: string;
  reverse?: boolean;
}

const KeypadButton = ({
  digit,
  letters = "",
  reverse = false,
  ...rest
}: KeypadButtonProps) => (
  <KeypadButtonTextContainer data-reverse={reverse} {...rest}>
    {digit}
    {letters && <div>{letters}</div>}
  </KeypadButtonTextContainer>
);

export default KeypadButton;
