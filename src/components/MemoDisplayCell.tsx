import { memo } from "react";
import DisplayCell from "./DisplayCell";

interface MemoDisplayCellProps {
  state: boolean;
}

const MemoDisplayCell = memo(({ state }: MemoDisplayCellProps) => {
  return <DisplayCell data-active={state} />;
});

export default MemoDisplayCell;
