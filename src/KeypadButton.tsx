import { Keys } from "./Phone";
import KeypadButtonContainer from "./style/KeypadButtonContainer";

interface KeypadButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  digit: Keys;
  letters?: string;
  reverse?: boolean;
  lit: boolean;
}

const KeypadButton = ({
  digit,
  letters = "",
  reverse = false,
  lit,
  ...rest
}: KeypadButtonProps) => (
  <KeypadButtonContainer $reverse={reverse} $lit={lit} {...rest}>
    {digit}
    {letters && <div>{letters}</div>}
  </KeypadButtonContainer>
);

export default KeypadButton;
