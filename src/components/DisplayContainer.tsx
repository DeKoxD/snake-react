import { styled } from "@linaria/react";

interface DisplayContainerProps {
  $sizeX: number;
  $sizeY: number;
}

const DisplayContainer = styled.div<DisplayContainerProps>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: var(--colors-display-lines);
  width: ${(props) => props.$sizeX * 9 - 1}px;
  height: ${(props) => props.$sizeY * 9 - 1}px;
  gap: 1px;
  padding: 1px;
  border: solid 1px var(--colors-display-inactive);
`;

export default DisplayContainer;
