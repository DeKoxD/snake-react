import { memo } from "react";
import DisplayCell from "./style/DisplayCell";

interface MemoDisplayCellProps {
  state: boolean;
}

const MemoDisplayCell = memo(({ state }: MemoDisplayCellProps) => {
  return <DisplayCell data-active={state} />;
});

export default MemoDisplayCell;
