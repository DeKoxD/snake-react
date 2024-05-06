import styled from "styled-components";
import DisplayCell, { DisplayCellProps } from "./DisplayCell";

const DisplayCellFood = styled(DisplayCell)<DisplayCellProps>`
  background-color: ${(props) => props.theme.colors.food};
`;

export default DisplayCellFood;
