import styled from "styled-components";

interface Props {
  $lit?: boolean;
}

const DisplayContainer = styled.div<Props>`
  display: flex;
  flex-direction: column;
  border: solid 2px
    ${(props) =>
      props.$lit
        ? props.theme.colors.backlight
        : props.theme.colors.displayLight};
  width: fit-content;
`;

DisplayContainer.defaultProps = {
  $lit: false,
};

export default DisplayContainer;
