import { createContext, useCallback, useEffect, useMemo } from "react";
import { useLocalStorageState } from "../hooks";
import { changeLanguage } from "i18next";
import PropTypes from "prop-types";

const LanguageContext = createContext();

LanguageSwitchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function LanguageSwitchProvider({ children }) {
  const [isMandarin, setisMandarin] = useLocalStorageState("isMandarin", false);

  const switchLanguage = useCallback(() => {
    setisMandarin((prev) => !prev);
  }, [setisMandarin]);

  useEffect(() => {
    changeLanguage(isMandarin ? "zh" : "en");
  }, [isMandarin]);


  const value = useMemo(
    () => ({
      isMandarin,
      switchLanguage,
    }),
    [isMandarin, switchLanguage]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export { LanguageSwitchProvider, LanguageContext };