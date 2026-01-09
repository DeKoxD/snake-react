import { styled } from "@linaria/react";

export const KeypadContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: solid 10px var(--colors-phone-body-dark);
  width: fit-content;
  background-color: var(--colors-phone-body-dark);
`;

export const KeypadRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 3px 0;
  gap: 15px;
`;
