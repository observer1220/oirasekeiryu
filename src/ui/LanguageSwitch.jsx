import ButtonIcon from "./ButtonIcon";
import { useSwitchLanguage } from "../context/LanguageContext";
import tw from "../assets/taiwan.png";
import usa from "../assets/usa.png";

function LanguageSwitch() {
  const { isMandarin, switchLanguage } = useSwitchLanguage();
  const flag = isMandarin ? "tw" : "usa";
  return (
    <ButtonIcon onClick={switchLanguage}>
      <img src={flag === "tw" ? tw : usa} alt="flag" width={"30"} />
    </ButtonIcon>
  );
}

export default LanguageSwitch;
