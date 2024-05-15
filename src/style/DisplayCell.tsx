import styled from "styled-components";

const DisplayCell = styled.div`
  font-size: 5px;
  height: 8px;
  width: 8px;
  background-color: ${(props) => props.theme.colors.displayLight};
  :has(.lit div) {
    background-color: ${(props) => props.theme.colors.backlight};
  }
`;

export default DisplayCell;
