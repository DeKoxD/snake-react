import { useMemo, useState, useCallback, useEffect, useRef } from "react";
import Keypad from "./Keypad";
import DisplayCellSnakeBody from "./style/DisplayCellSnakeBody";
import DisplayCellFood from "./style/DisplayCellFood";
import DisplayCell, { DisplayCellProps } from "./style/DisplayCell";
import DisplayContainer from "./style/DisplayContainer";
import DisplayRow from "./style/DisplayRow";
import { Coord } from "./Coord";
import { PhoneBody } from "./style/PhoneBody";
import Forehead from "./Forehead";
import PhoneTop from "./style/PhoneTop";

interface SnakeProps {
  sizeX: number;
  sizeY: number;
  frameRate: number;
}

const dirRight = new Coord(1, 0);
const dirLeft = new Coord(-1, 0);
const dirUp = new Coord(0, -1);
const dirDown = new Coord(0, 1);

function Snake({ sizeX, sizeY, frameRate }: SnakeProps) {
  const [snakeHead, setSnakeHead] = useState<Coord>(new Coord(-1, -1));
  // Body segments, ordered by the distance from the head
  const [snakeBody, setSnakeBody] = useState<Coord[]>([]);
  const snakeDirection = useRef<Coord>(dirRight);
  const snakeNewDirection = useRef<Coord>();
  const [foods, setFoods] = useState<Coord[]>([]);
  const limit = useMemo(() => new Coord(sizeX, sizeY), [sizeX, sizeY]);

  const animationRequest = useRef<number>();
  const nextFrame = useRef<number>(0);

  const [update, setUpdate] = useState(false);

  const [lit, setLit] = useState(false);
  const lightTimer = useRef<number>();

  const backlightOn = () => {
    setLit(true);
    window.clearTimeout(lightTimer.current);
    lightTimer.current = window.setTimeout(() => setLit(false), 5000);
  };

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
      snakeNewDirection.current = undefined;
    }
    const newSnakeHeadCoord = snakeHead.addCoord(snakeDirection.current, limit);
    const lost = snakeBody.some((part) => newSnakeHeadCoord.equals(part));
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

  const animate = (time: number) => {
    if (time >= nextFrame.current) {
      nextFrame.current = time + 1000 / frameRate;
      setUpdate(() => true);
    }
    animationRequest.current = requestAnimationFrame(animate);
  };

  function start() {
    reset();
    spawnFood();
    animationRequest.current = requestAnimationFrame(animate);
  }

  function stop() {
    const current = animationRequest.current;
    if (current) {
      animationRequest.current = undefined;
      cancelAnimationFrame(current);
    }
  }

  function up() {
    if (snakeDirection.current != dirDown) snakeNewDirection.current = dirUp;
  }
  function down() {
    if (snakeDirection.current != dirUp) snakeNewDirection.current = dirDown;
  }
  function left() {
    if (snakeDirection.current != dirRight) snakeNewDirection.current = dirLeft;
  }
  function right() {
    if (snakeDirection.current != dirLeft) snakeNewDirection.current = dirRight;
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

  return (
    <PhoneBody>
      <PhoneTop>
        <Forehead />
        <DisplayContainer $lit={lit}>
          {Array(sizeY)
            .fill(null)
            .map((_, y) => (
              <DisplayRow key={`row ${y}`}>
                {Array(sizeX)
                  .fill(null)
                  .map((_, x) => {
                    const cur: Coord = new Coord(x, y);
                    const props: DisplayCellProps = {
                      $firstRow: !y,
                      $firstColumn: !x,
                      $lit: lit,
                    };
                    if (
                      snakeBody.some((part) => cur.equals(part)) ||
                      cur.equals(snakeHead)
                    ) {
                      return (
                        <DisplayCellSnakeBody
                          key={`snake cell ${x} ${y}`}
                          {...props}
                        />
                      );
                    } else if (foods.some((food) => cur.equals(food))) {
                      return (
                        <DisplayCellFood
                          key={`food cell ${x} ${y}`}
                          {...props}
                        />
                      );
                    }
                    return <DisplayCell key={`cell ${x} ${y}`} {...props} />;
                  })}
              </DisplayRow>
            ))}
        </DisplayContainer>
      </PhoneTop>
      <Keypad
        up={up}
        down={down}
        left={left}
        right={right}
        reset={reset}
        start={start}
        lit={lit}
        backlightOn={backlightOn}
      />
    </PhoneBody>
  );
}

export default Snake;
