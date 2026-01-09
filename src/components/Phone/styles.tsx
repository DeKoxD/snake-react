import { styled } from "@linaria/react";

interface PhoneBodyProps {
  "data-lit"?: boolean;
}

export const PhoneBody = styled.div<PhoneBodyProps>`
  --colors-display-lines: #3c4e3c;
  --colors-display-inactive: #b6e1c9;
  --colors-display-active: #111111;
  --colors-backlight: #93c202;
  --colors-keypad-button-text: #111111;
  --colors-phone-body-dark: #333544;
  --colors-phone-body-light: #c3c3c3;

  &[data-lit="true"] {
    --colors-display-inactive: #93c202;
    --colors-keypad-button-text: #93c202;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: stat;
  height: fit-content;
  width: fit-content;
  padding: 10px;
  background-color: var(--colors-phone-body-dark);
  border-radius: 10%;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none !important;
`;

export const PhoneTop = styled.div`
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
