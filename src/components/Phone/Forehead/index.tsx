import { memo } from "react";
import { ForeheadContainer, ForeheadLogo, ForeheadSpeaker } from "./styles";

const Forehead = () => {
  return (
    <ForeheadContainer>
      <ForeheadSpeaker>
        <div>•</div>
        <div>•</div>
        <div>•</div>
      </ForeheadSpeaker>
      <ForeheadLogo>Snake</ForeheadLogo>
    </ForeheadContainer>
  );
};

export default memo(Forehead);
