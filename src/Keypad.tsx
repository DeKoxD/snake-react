import { useCallback, useEffect } from "react";
import KeypadButton from "./KeypadButton";
import KeypadContainer from "./style/KeypadContainer";
import KeypadRow from "./style/KeypadRow";

interface KeypadProps {
  up: () => void;
  down: () => void;
  left: () => void;
  right: () => void;
  reset: () => void;
  start: () => void;
  lit?: boolean;
  backlightOn: () => void;
}

function Keypad({
  up,
  down,
  left,
  right,
  reset,
  start,
  lit,
  backlightOn,
}: KeypadProps) {
  const lightOnCallback = (cb?: () => void) => () => {
    backlightOn();
    cb?.();
  };

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
        case "w":
        case "Numpad2":
          up();
          break;
        case "ArrowDown":
        case "s":
        case "Numpad8":
          down();
          break;
        case "ArrowLeft":
        case "a":
        case "Numpad4":
          left();
          break;
        case "ArrowRight":
        case "d":
        case "Numpad6":
          right();
          break;
        case " ":
          start();
          break;
        case "Enter":
          reset();
          break;
        case "b":
          backlightOn();
          break;
      }
    },
    [down, left, start, reset, right, up, backlightOn]
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
        <KeypadButton lit={lit} digit="1" letters="O_O" onClick={backlightOn} />
        <KeypadButton
          lit={lit}
          digit="2"
          letters="abc"
          onClick={lightOnCallback(up)}
        />
        <KeypadButton
          lit={lit}
          digit="3"
          letters="def"
          onClick={backlightOn}
          reverse
        />
      </KeypadRow>
      <KeypadRow>
        <KeypadButton
          lit={lit}
          digit="4"
          letters="ghi"
          onClick={lightOnCallback(left)}
        />
        <KeypadButton lit={lit} digit="5" letters="jkl" onClick={backlightOn} />
        <KeypadButton
          lit={lit}
          digit="6"
          letters="mno"
          onClick={lightOnCallback(right)}
          reverse
        />
      </KeypadRow>
      <KeypadRow>
        <KeypadButton lit={lit} digit="7" letters="pqrs" />
        <KeypadButton
          lit={lit}
          digit="8"
          letters="tuv"
          onClick={lightOnCallback(down)}
        />
        <KeypadButton lit={lit} digit="9" letters="wxyz" reverse />
      </KeypadRow>
      <KeypadRow>
        <KeypadButton
          lit={lit}
          digit="*"
          letters="+"
          onClick={lightOnCallback(start)}
        />
        <KeypadButton lit={lit} digit="0" letters="⎵" onClick={backlightOn} />
        <KeypadButton
          lit={lit}
          digit="#"
          letters="⌂"
          onClick={lightOnCallback(reset)}
          reverse
        />
      </KeypadRow>
    </KeypadContainer>
  );
}

export default Keypad;
