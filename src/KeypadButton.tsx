import { Keys } from "./Phone";
import KeypadButtonContainer from "./style/KeypadButtonContainer";

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
  <KeypadButtonContainer data-reverse={reverse} {...rest}>
    {digit}
    {letters && <div>{letters}</div>}
  </KeypadButtonContainer>
);

export default KeypadButton;
