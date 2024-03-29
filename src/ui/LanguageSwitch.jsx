import ButtonIcon from "./ButtonIcon";
import { useSwitchLanguage } from "../context/LanguageContext";

function LanguageSwitch() {
  const { isMandarin, switchLanguage } = useSwitchLanguage();
  return (
    <ButtonIcon onClick={switchLanguage}>
      <strong>{isMandarin ? "繁體" : "ENG"}</strong>
    </ButtonIcon>
  );
}

export default LanguageSwitch;
