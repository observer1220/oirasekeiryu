import { ButtonIcon } from "../common";
import { useSwitchLanguage } from "../../hooks/useGeneral";

function LanguageSwitch() {
  const { isMandarin, switchLanguage } = useSwitchLanguage();
  return (
    <ButtonIcon onClick={switchLanguage}>
      <strong>{isMandarin ? "繁體" : "ENG"}</strong>
    </ButtonIcon>
  );
}

export default LanguageSwitch;
