import { useEffect, useMemo, useState } from "react";
import DisplayCell, { DisplayCellProps } from "./style/DisplayCell";
import DisplayContainer from "./style/DisplayContainer";
import DisplayRow from "./style/DisplayRow";
import DisplayCellSnakeBody from "./style/DisplayCellSnakeBody";

interface DisplayProps {
  sizeX: number;
  sizeY: number;
  frame: boolean[];
  lit?: boolean;
}

type CellInfo = [boolean, JSX.Element];

const Display = ({ sizeX, sizeY, frame, lit }: DisplayProps) => {
  return (
    <DisplayContainer $lit={lit}>
      {Array(sizeY)
        .fill(null)
        .map((_, y) => (
          <DisplayLine
            key={`line ${y}`}
            lineNum={y}
            sizeX={sizeX}
            frame={frame.slice(y * sizeX, (y + 1) * sizeX)}
            lit={lit}
          />
        ))}
    </DisplayContainer>
  );
};

interface DisplayLineProps {
  lineNum: number;
  sizeX: number;
  frame: boolean[];
  lit?: boolean;
}

const DisplayLine = ({ lineNum, sizeX, frame, lit }: DisplayLineProps) => {
  const [line, setLine] = useState<CellInfo[]>([]);
  useEffect(() => {
    if (
      frame.length !== sizeX ||
      frame.some((state, index) => state !== line[index]?.[0])
    ) {
      setLine((prevLine) =>
        frame.map((cell, index) => {
          const lineCell = prevLine[index];
          if (cell != lineCell?.[0]) {
            const props: DisplayCellProps = {
              $firstRow: index < sizeX,
              $firstColumn: !(index % sizeX),
              $lit: lit,
            };
            return [
              cell,
              cell ? (
                <DisplayCellSnakeBody
                  key={`snake cell ${lineNum}.${index}`}
                  {...props}
                />
              ) : (
                <DisplayCell key={`cell ${lineNum}.${index}`} {...props} />
              ),
            ];
          } else {
            return lineCell;
          }
        })
      );
    }
  }, [frame, line, lineNum, lit, sizeX]);

  const displayRow = useMemo(
    () => <DisplayRow>{line.map((cell) => cell[1])}</DisplayRow>,
    [line]
  );
  return displayRow;
};

export default Display;
