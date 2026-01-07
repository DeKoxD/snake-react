import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Coord } from "../../helpers/Coord";
import Display from "../Display";
import Forehead from "../Forehead";
import Keypad from "../Keypad";
import { Keys } from "../Keypad/KeypadButton";
import { PhoneBody, PhoneTop } from "./styles";

interface PhoneProps {
  sizeX?: number;
  sizeY?: number;
  frameRate?: number;
}

const dirRight = new Coord(1, 0);
const dirLeft = new Coord(-1, 0);
const dirUp = new Coord(0, -1);
const dirDown = new Coord(0, 1);

function Phone({ sizeX = 24, sizeY = 16, frameRate = 8 }: PhoneProps) {
  const [pressedKeys, setPressedKeys] = useState<Keys[]>([]);

  const [snakeHead, setSnakeHead] = useState<Coord>(new Coord(-1, -1));
  // Body segments, ordered by the distance from the head
  const [snakeBody, setSnakeBody] = useState<Coord[]>([]);
  const snakeDirection = useRef<Coord>(dirRight);
  const snakeNewDirection = useRef<Coord | null>(null);
  const [foods, setFoods] = useState<Coord[]>([]);
  const limit = useMemo(() => new Coord(sizeX, sizeY), [sizeX, sizeY]);

  const animationRequest = useRef<number | null>(null);
  const nextFrame = useRef<number>(0);

  const [update, setUpdate] = useState(false);

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

  const spawnFood = useCallback(() => {
    setFoods((prev) => {
      let foodCoord: Coord;
      do {
        foodCoord = new Coord(
          Math.floor(Math.random() * sizeX),
          Math.floor(Math.random() * sizeY)
        );
      } while (
        snakeHead.equals(foodCoord) ||
        snakeBody.some((part) => part.equals(foodCoord)) ||
        foods.some((part) => part.equals(foodCoord))
      );
      return [...prev, foodCoord];
    });
  }, [sizeX, sizeY, snakeHead, snakeBody, foods]);

  const reset = useCallback(() => {
    stop();
    const middle: Coord = new Coord(
      Math.floor(sizeX / 2),
      Math.floor((sizeY * 3) / 4)
    );
    setSnakeBody([middle, middle.decrementX()]);
    setSnakeHead(middle.incrementX());
    snakeDirection.current = dirRight;
    setFoods([]);
  }, [sizeX, sizeY]);

  const tick = useCallback(() => {
    let coord = snakeHead;
    const newDirection = snakeNewDirection.current;
    if (newDirection) {
      snakeDirection.current = newDirection;
      snakeNewDirection.current = null;
    }
    const newSnakeHeadCoord = snakeHead.addCoord(snakeDirection.current, limit);
    const lost = snakeBody
      .slice(0, -1)
      .some((part) => newSnakeHeadCoord.equals(part));
    if (lost) {
      stop();
      return;
    }
    const eatenFood = foods.find((food) => food.equals(newSnakeHeadCoord));
    if (eatenFood) {
      setFoods(foods.filter((food) => eatenFood != food));
      spawnFood();
    }
    setSnakeHead(newSnakeHeadCoord);
    const body = snakeBody.map((part) => {
      const partCoord = coord;
      coord = part;
      return partCoord.equals(part) ? coord : partCoord;
    });
    setSnakeBody(eatenFood ? [...body, body[body.length - 1]] : body);
  }, [snakeHead, snakeBody, limit, foods, spawnFood]);

  const animate = useCallback(
    (time: number) => {
      if (time >= nextFrame.current) {
        nextFrame.current = time + 1000 / frameRate;
        setUpdate(() => true);
      }
      animationRequest.current = requestAnimationFrame(animate);
    },
    [frameRate]
  );

  const start = useCallback(() => {
    if (!animationRequest.current) {
      reset();
      spawnFood();
      animationRequest.current = requestAnimationFrame(animate);
    }
  }, [reset, spawnFood, animate]);

  function stop() {
    const current = animationRequest.current;
    if (current) {
      animationRequest.current = null;
      cancelAnimationFrame(current);
    }
  }

  useEffect(() => {
    if (update) {
      tick();
      setUpdate(false);
    }
  }, [update, tick]);

  useEffect(() => {
    reset();
    return () => {
      stop();
    };
  }, [reset]);

  const handleKeyPress = useCallback(
    (key: Keys) => {
      backlightOn();
      setPressedKeys((prev) => {
        return [...prev, key];
      });
    },
    [backlightOn]
  );

  const handleKeyRelease = useCallback((key: Keys) => {
    setPressedKeys((prev) => {
      return prev.filter((pressedKey) => pressedKey !== key);
    });
  }, []);

  useEffect(() => {
    function up() {
      if (snakeDirection.current != dirDown) snakeNewDirection.current = dirUp;
    }
    function down() {
      if (snakeDirection.current != dirUp) snakeNewDirection.current = dirDown;
    }
    function left() {
      if (snakeDirection.current != dirRight)
        snakeNewDirection.current = dirLeft;
    }
    function right() {
      if (snakeDirection.current != dirLeft)
        snakeNewDirection.current = dirRight;
    }
    pressedKeys.forEach((key) => {
      switch (key) {
        case "2":
          up();
          break;
        case "8":
          down();
          break;
        case "4":
          left();
          break;
        case "6":
          right();
          break;
        case "5":
          break;
        case "*":
          start();
          break;
        case "#":
          stop();
          break;
      }
    });
  }, [animate, pressedKeys, start]);

  const frame = useMemo(() => {
    const frame = Array(sizeX * sizeY).fill(false);
    frame[snakeHead.y * sizeX + snakeHead.x] = true;
    snakeBody.forEach((part) => {
      frame[part.y * sizeX + part.x] = true;
    });
    foods.forEach((food) => {
      frame[food.y * sizeX + food.x] = true;
    });
    return frame;
  }, [sizeX, sizeY, snakeHead, snakeBody, foods]);

  return (
    <PhoneBody data-lit={lit}>
      <PhoneTop>
        <Forehead />
        <Display sizeX={sizeX} sizeY={sizeY} frame={frame} />
      </PhoneTop>
      <Keypad
        pressedKeys={pressedKeys}
        onKeyPress={handleKeyPress}
        onKeyRelease={handleKeyRelease}
      />
    </PhoneBody>
  );
}

export default Phone;
