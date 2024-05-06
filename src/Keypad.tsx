import { useCallback, useEffect } from "react";
import KeypadButton from "./KeypadButton";
import KeypadContainer from "./style/KeypadContainer";
import KeypadRow from "./style/KeypadRow";

interface Props {
  up: () => void;
  down: () => void;
  left: () => void;
  right: () => void;
  reset: () => void;
  start: () => void;
}

function Keypad({ up, down, left, right, reset, start }: Props) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
        case "w":
        case "Num2":
          up();
          break;
        case "ArrowDown":
        case "s":
        case "Num8":
          down();
          break;
        case "ArrowLeft":
        case "a":
        case "Num4":
          left();
          break;
        case "ArrowRight":
        case "d":
        case "Num6":
          right();
          break;
        case " ":
          start();
          break;
        case "Enter":
          reset();
          break;
      }
    },
    [down, left, start, reset, right, up]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <KeypadContainer>
      <KeypadRow>
        <KeypadButton digit="1" letters="O_O" />
        <KeypadButton digit="2" letters="abc" onClick={up} />
        <KeypadButton digit="3" letters="def" />
      </KeypadRow>
      <KeypadRow>
        <KeypadButton digit="4" letters="ghi" onClick={left} />
        <KeypadButton digit="5" letters="jkl" />
        <KeypadButton digit="6" letters="mno" onClick={right} />
      </KeypadRow>
      <KeypadRow>
        <KeypadButton digit="7" letters="pqrs" />
        <KeypadButton digit="8" letters="tuv" onClick={down} />
        <KeypadButton digit="9" letters="wxyz" />
      </KeypadRow>
      <KeypadRow>
        <KeypadButton digit="*" letters="+" onClick={start} />
        <KeypadButton digit="0" letters="⎵" onClick={reset} />
        <KeypadButton digit="#" letters="⌂" />
      </KeypadRow>
    </KeypadContainer>
  );
}

export default Keypad;
