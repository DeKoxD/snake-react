import { memo } from "react";
import DisplayCellActive from "./style/DisplayCellActive";
import DisplayCell from "./style/DisplayCell";

interface MemoDisplayCellProps {
  state: boolean;
}

const MemoDisplayCell = memo(({ state }: MemoDisplayCellProps) => {
  return state ? <DisplayCellActive /> : <DisplayCell />;
});

export default MemoDisplayCell;
