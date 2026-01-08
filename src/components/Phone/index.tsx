import { useCallback, useRef, useState } from "react";
import { useSnake } from "../../helpers/useSnake";
import Display from "../Display";
import Keypad from "../Keypad";
import { Keys } from "../Keypad/KeypadButton";
import Forehead from "./Forehead";
import { PhoneBody, PhoneTop } from "./styles";

interface PhoneProps {
  sizeX?: number;
  sizeY?: number;
}

function Phone({ sizeX = 24, sizeY = 16 }: PhoneProps) {
  const [pressedKeys, setPressedKeys] = useState<Keys[]>([]);

  const [lit, setLit] = useState(false);
  const lightTimer = useRef<number | null>(null);

  const backlightOn = useCallback(() => {
    setLit(true);
    const currentLightTimer = lightTimer.current;
    if (currentLightTimer) {
      window.clearTimeout(currentLightTimer);
    }
    lightTimer.current = window.setTimeout(() => setLit(false), 5000);
  }, []);

  const handleKeyPress = useCallback(
    (_key: Keys, pKeys: Keys[]) => {
      backlightOn();
      setPressedKeys(pKeys);
    },
    [backlightOn]
  );

  const handleKeyRelease = useCallback((_key: Keys, pKeys: Keys[]) => {
    setPressedKeys(pKeys);
  }, []);

  const { frame } = useSnake({
    sizeX,
    sizeY,
    frameRate: 8,
    pressedKeys,
  });

  return (
    <PhoneBody data-lit={lit}>
      <PhoneTop>
        <Forehead />
        <Display sizeX={sizeX} sizeY={sizeY} frame={frame} />
      </PhoneTop>
      <Keypad onKeyPress={handleKeyPress} onKeyRelease={handleKeyRelease} />
    </PhoneBody>
  );
}

export default Phone;
