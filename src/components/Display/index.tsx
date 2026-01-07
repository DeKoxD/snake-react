import { useMemo } from "react";
import DisplayLine from "./DisplayLine";
import { DisplayContainer } from "./styles";

interface DisplayProps {
  sizeX: number;
  sizeY: number;
  frame: boolean[];
}

const Display = ({ sizeX, sizeY, frame }: DisplayProps) => {
  const lines = useMemo(() => {
    return Array(sizeY)
      .fill(null)
      .map((_, index) => frame.slice(index * sizeX, (index + 1) * sizeX));
  }, [sizeX, sizeY, frame]);
  return (
    <DisplayContainer $sizeX={sizeX} $sizeY={sizeY}>
      {lines.map((line, index) => (
        <DisplayLine key={`line ${index}`} line={line} />
      ))}
    </DisplayContainer>
  );
};

export default Display;
