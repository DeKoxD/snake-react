import { memo, useCallback, useEffect, useRef } from "react";
import KeypadButton, { Keys } from "./KeypadButton";
import { KeypadContainer, KeypadRow } from "./styles";

interface KeypadProps {
  onKeyPress: (key: Keys, pressedKeys: Keys[]) => void;
  onKeyRelease: (key: Keys, pressedKeys: Keys[]) => void;
}

interface KeypadButtonProps {
  digit: Keys;
  letters: string;
  reverse?: boolean;
}

const keys: KeypadButtonProps[][] = [
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
];

const keyMap: Record<string, Keys> = {
  ArrowUp: "2",
  w: "2",
  Numpad2: "2",
  ArrowDown: "8",
  s: "8",
  Numpad8: "8",
  ArrowLeft: "4",
  a: "4",
  Numpad4: "4",
  ArrowRight: "6",
  d: "6",
  Numpad6: "6",
  " ": "*",
  Enter: "#",
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
  "0": "0",
};

function Keypad({ onKeyPress, onKeyRelease }: KeypadProps) {
  const pressedKeys = useRef<Keys[]>([]);

  const handleKeyEvent = useCallback(
    (key: string, press: boolean) => {
      const mappedKey = keyMap[key];
      if (!mappedKey) return;
      if (press) {
        navigator.locks.request("pressedKeys", () => {
          pressedKeys.current = [
            ...pressedKeys.current.filter((k) => k !== mappedKey),
            mappedKey,
          ];
        });
        onKeyPress(mappedKey, [...pressedKeys.current]);
      } else {
        navigator.locks.request("pressedKeys", () => {
          pressedKeys.current = pressedKeys.current.filter(
            (k) => k !== mappedKey
          );
        });
        onKeyRelease(mappedKey, [...pressedKeys.current]);
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
              onMouseDown={() => handleKeyEvent(digit, true)}
              onMouseUp={() => handleKeyEvent(digit, false)}
            />
          ))}
        </KeypadRow>
      ))}
    </KeypadContainer>
  );
}

export default memo(Keypad);
