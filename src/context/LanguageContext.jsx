import { createContext, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { changeLanguage } from "i18next";

const LanguageContext = createContext();

LanguageSwitchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function LanguageSwitchProvider({ children }) {
  const [isMandarin, setisMandarin] = useLocalStorageState(false, "isMandarin");

  function switchLanguage() {
    setisMandarin((isMandarin) => !isMandarin);
  }

  useEffect(() => {
    if (isMandarin) {
      changeLanguage("zh");
    } else {
      changeLanguage("en");
    }
  }, [isMandarin]);

  return (
    <LanguageContext.Provider value={{ isMandarin, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

function useSwitchLanguage() {
  const context = useContext(LanguageContext);
  console.log(context);
  if (!context) {
    throw new Error(
      "useSwitchLanguage must be used within a LanguageSwitchProvider"
    );
  }

  return context;
}

export { LanguageSwitchProvider, useSwitchLanguage };
