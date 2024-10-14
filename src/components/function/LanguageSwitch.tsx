import styled from "styled-components";
import { ButtonIcon } from "../common";
import { useLanguage } from "../../hooks";

const LanguageContainer = styled.div`
  position: fixed;
  right: 0;
  top: 5em;
  z-index: 100;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px 0 0 8px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
`;

function LanguageSwitch() {
  const { isMandarin, switchLanguage } = useLanguage();
  return (
    <LanguageContainer>
      <ButtonIcon onClick={switchLanguage}>
        <strong>{isMandarin ? "繁體" : "ENG"}</strong>
      </ButtonIcon>
    </LanguageContainer>
  );
}

export default LanguageSwitch;
