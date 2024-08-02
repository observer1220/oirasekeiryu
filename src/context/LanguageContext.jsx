import { createContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useGeneral";
import { changeLanguage } from "i18next";
import PropTypes from "prop-types";

const LanguageContext = createContext();

LanguageSwitchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function LanguageSwitchProvider({ children }) {
  const [isMandarin, setisMandarin] = useLocalStorageState("isMandarin", false);

  function switchLanguage() {
    setisMandarin((isMandarin) => !isMandarin);
  }

  useEffect(() => {
    changeLanguage(isMandarin ? "zh" : "en");
  }, [isMandarin]);

  return (
    <LanguageContext.Provider value={{ isMandarin, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}



export { LanguageSwitchProvider, LanguageContext };
