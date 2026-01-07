import { styled } from "@linaria/react";

const PhoneTop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top: solid 2px var(--colors-phone-body-light);
  border-bottom: solid 40px var(--colors-phone-body-light);
  border-left: solid 4px var(--colors-phone-body-light);
  border-right: solid 4px var(--colors-phone-body-light);
  border-radius: 10% 10% 20% 20%;
  padding-bottom: 25px;
  padding-left: 5px;
  padding-right: 5px;
`;

export default PhoneTop;
