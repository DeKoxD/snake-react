import styled from "styled-components";

export const PhoneBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: stat;
  background-color: #f5f5f5;
  height: fit-content;
  width: fit-content;
  padding: 10px;
  background-color: ${(props) => props.theme.colors.bodyColor};
`;
