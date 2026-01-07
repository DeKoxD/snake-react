import { styled } from "@linaria/react";

interface DisplayCellProps {
  "data-active": boolean;
}

export const DisplayCell = styled.div<DisplayCellProps>`
  font-size: 5px;
  height: 8px;
  width: 8px;
  background-color: var(--colors-display-inactive);
  &[data-active="true"] {
    background-color: var(--colors-display-active);
  }
`;
