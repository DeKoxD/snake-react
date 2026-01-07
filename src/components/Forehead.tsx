import ForeheadContainer from "./ForeheadContainer";
import ForeheadLogo from "./ForeheadLogo";
import ForeheadSpeaker from "./ForeheadSpeaker";

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
