import styled from "styled-components";

interface DisplayContainerProps {
  $sizeX: number;
  $sizeY: number;
  $lit?: boolean;
}

const DisplayContainer = styled.div<DisplayContainerProps>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.displayDark};
  width: ${(props) => props.$sizeX * 9 - 1}px;
  height: ${(props) => props.$sizeY * 9 - 1}px;
  gap: 1px;
  padding: 1px;
  border: solid 1px ${(props) => props.theme.colors.displayLight};
  &.lit {
    border: solid 1px ${(props) => props.theme.colors.backlight};

    & :not(.active) {
      background-color: ${(props) => props.theme.colors.backlight};
    }
  }
`;

DisplayContainer.defaultProps = {
  $lit: false,
};

export default DisplayContainer;
