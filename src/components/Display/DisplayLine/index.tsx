import { memo } from "react";
import DisplayCell from "../DisplayCell";

interface DisplayLineProps {
  line: boolean[];
}

const DisplayLine = ({ line }: DisplayLineProps) => {
  return line.map((state, index) => (
    <DisplayCell key={`cell ${index}`} data-active={state} />
  ));
};

export default memo(DisplayLine, (prevProps, nextProps) => {
  return prevProps.line.every(
    (value, index) => value === nextProps.line[index]
  );
});
