import styled from "styled-components";

const DisplayContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: solid 5px ${(props) => props.theme.colors.displayLight};
  width: fit-content;
`;

export default DisplayContainer;
