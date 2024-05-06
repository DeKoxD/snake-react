import styled from "styled-components";

const PhoneTop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top: solid 2px ${(props) => props.theme.colors.keypadButtonLight};
  border-bottom: solid 40px ${(props) => props.theme.colors.keypadButtonLight};
  border-left: solid 4px ${(props) => props.theme.colors.keypadButtonLight};
  border-right: solid 4px ${(props) => props.theme.colors.keypadButtonLight};
  border-radius: 10% 10% 20% 20%;
  padding-bottom: 25px;
  padding-left: 5px;
  padding-right: 5px;
`;

export default PhoneTop;
