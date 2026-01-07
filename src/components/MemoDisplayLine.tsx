import { memo } from "react";
import MemoDisplayCell from "./MemoDisplayCell";

interface DisplayLineProps {
  line: boolean[];
}

const MemoDisplayLine = memo(
  ({ line }: DisplayLineProps) => {
    return line.map((state, index) => (
      <MemoDisplayCell key={`cell ${index}`} state={state} />
    ));
  },
  (prevProps, nextProps) => {
    return prevProps.line.every(
      (value, index) => value === nextProps.line[index]
    );
  }
);

export default MemoDisplayLine;
