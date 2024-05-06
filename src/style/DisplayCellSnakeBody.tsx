import styled from "styled-components";
import DisplayCell from "./DisplayCell";
import { DisplayCellProps } from "./DisplayCell";

const DisplayCellSnakeBody = styled(DisplayCell)<DisplayCellProps>`
  background-color: ${(props) => props.theme.colors.snakeBody};
`;

export default DisplayCellSnakeBody;
