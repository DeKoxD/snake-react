import { useMemo } from "react";
import DisplayContainer from "./style/DisplayContainer";
import MemoDisplayLine from "./MemoDisplayLine";

interface DisplayProps {
  sizeX: number;
  sizeY: number;
  frame: boolean[];
  lit?: boolean;
}

const Display = ({ sizeX, sizeY, frame, lit = false }: DisplayProps) => {
  const lines = useMemo(() => {
    return Array(sizeY)
      .fill(null)
      .map((_, index) => frame.slice(index * sizeX, (index + 1) * sizeX));
  }, [sizeX, sizeY, frame]);
  return (
    <DisplayContainer
      $sizeX={sizeX}
      $sizeY={sizeY}
      className={lit ? "lit" : ""}
    >
      {lines.map((line, index) => (
        <MemoDisplayLine key={`line ${index}`} line={line} />
      ))}
    </DisplayContainer>
  );
};

export default Display;
