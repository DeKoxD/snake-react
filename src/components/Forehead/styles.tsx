import { styled } from "@linaria/react";

export const ForeheadContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3px 0;
  gap: 15px;
  padding-bottom: 10px;
`;

export const ForeheadLogo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 3px 0;
  gap: 15px;
  color: white;
  background-color: black;
  opacity: 0.7;
  padding: 0 3px;
  font-family: sans-serif;
  font-weight: 900;
  border-radius: 2px;
`;

export const ForeheadSpeaker = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 3px;
  border-radius: 50%;
  background-color: white;
  opacity: 0.1;
`;
