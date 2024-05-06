import styled from "styled-components";

const KeypadContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: solid 10px ${(props) => props.theme.colors.bodyColor};
  width: fit-content;
  background-color: ${(props) => props.theme.colors.bodyColor};
`;

export default KeypadContainer;
