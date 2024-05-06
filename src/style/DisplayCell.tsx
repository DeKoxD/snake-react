import styled from "styled-components";

export interface DisplayCellProps {
  $firstRow?: boolean;
  $firstColumn?: boolean;
  $lit?: boolean;
}

const DisplayCell = styled.div<DisplayCellProps>`
  font-size: 5px;
  height: 8px;
  width: 8px;
  background-color: ${(props) =>
    props.$lit
      ? props.theme.colors.backlight
      : props.theme.colors.displayLight};
  border-right: solid 1px ${(props) => props.theme.colors.displayDark};
  border-bottom: solid 1px ${(props) => props.theme.colors.displayDark};
  ${(props) =>
    props.$firstRow &&
    `border-top: solid 1px ${props.theme.colors.displayDark};`}
  ${(props) =>
    props.$firstColumn &&
    `border-left: solid 1px ${props.theme.colors.displayDark};`}
`;

DisplayCell.defaultProps = {
  $firstRow: false,
  $firstColumn: false,
  $lit: false,
};

export default DisplayCell;
