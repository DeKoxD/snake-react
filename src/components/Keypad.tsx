import { useCallback, useEffect, useMemo } from "react";
import KeypadButton from "./KeypadButton";
import KeypadContainer from "./KeypadContainer";
import KeypadRow from "./KeypadRow";
import { Keys } from "./Phone";

interface KeypadProps {
  pressedKeys: string[];
  onKeyPress: (key: Keys) => void;
  onKeyRelease: (key: Keys) => void;
}

interface KeypadButtonProps {
  digit: Keys;
  letters: string;
  reverse?: boolean;
}

function Keypad({ onKeyPress, onKeyRelease }: KeypadProps) {
  const handleKeyEvent = useCallback(
    (key: string, press: boolean) => {
      switch (key) {
        case "ArrowUp":
        case "w":
        case "Numpad2":
          press ? onKeyPress("2") : onKeyRelease("2");
          break;
        case "ArrowDown":
        case "s":
        case "Numpad8":
          press ? onKeyPress("8") : onKeyRelease("8");
          break;
        case "ArrowLeft":
        case "a":
        case "Numpad4":
          press ? onKeyPress("4") : onKeyRelease("4");
          break;
        case "ArrowRight":
        case "d":
        case "Numpad6":
          press ? onKeyPress("6") : onKeyRelease("6");
          break;
        case " ":
          press ? onKeyPress("*") : onKeyRelease("*");
          break;
        case "Enter":
          press ? onKeyPress("#") : onKeyRelease("#");
          break;
        case "b":
          break;
      }
    },
    [onKeyPress, onKeyRelease]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      handleKeyEvent(event.key, true);
    },
    [handleKeyEvent]
  );

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      handleKeyEvent(event.key, false);
    },
    [handleKeyEvent]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  const keys: KeypadButtonProps[][] = useMemo(
    () => [
      [
        {
          digit: "1",
          letters: "O_O",
        },
        {
          digit: "2",
          letters: "abc",
        },
        {
          digit: "3",
          letters: "def",
          reverse: true,
        },
      ],
      [
        {
          digit: "4",
          letters: "ghi",
        },
        {
          digit: "5",
          letters: "jkl",
        },
        {
          digit: "6",
          letters: "mno",
          reverse: true,
        },
      ],
      [
        {
          digit: "7",
          letters: "pqrs",
        },
        {
          digit: "8",
          letters: "tuv",
        },
        {
          digit: "9",
          letters: "wxyz",
          reverse: true,
        },
      ],
      [
        {
          digit: "*",
          letters: "+",
        },
        {
          digit: "0",
          letters: "⎵",
        },
        {
          digit: "#",
          letters: "⌂",
          reverse: true,
        },
      ],
    ],
    []
  );

  return (
    <KeypadContainer>
      {keys.map((row, i) => (
        <KeypadRow key={i}>
          {row.map(({ digit, letters, reverse }) => (
            <KeypadButton
              key={digit}
              digit={digit}
              letters={letters}
              reverse={reverse}
              onMouseDown={() => onKeyPress(digit)}
              onMouseUp={() => onKeyRelease(digit)}
            />
          ))}
        </KeypadRow>
      ))}
    </KeypadContainer>
  );
}

export default Keypad;
