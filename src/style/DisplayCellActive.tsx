import styled from "styled-components";
import DisplayCell from "./DisplayCell";

const DisplayCellActive = styled(DisplayCell).attrs({
  className: "active",
})`
  background-color: ${(props) => props.theme.colors.displayActive};
`;

export default DisplayCellActive;
