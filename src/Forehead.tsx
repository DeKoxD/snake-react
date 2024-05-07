import ForeheadContainer from "./style/ForeheadContainer";
import ForeheadLogo from "./style/ForeheadLogo";
import ForeheadSpeaker from "./style/ForeheadSpeaker";

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

export default Forehead;
