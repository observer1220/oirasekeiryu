import { createContext, useCallback, useEffect, useMemo } from "react";
import { useLocalStorageState } from "../hooks";
import { changeLanguage } from "i18next";

const LanguageContext = createContext({
  isMandarin: false,
  switchLanguage: () => {},
});

interface LanguageSwitchProviderProps {
  children: React.ReactNode;
}

function LanguageSwitchProvider({ children }: LanguageSwitchProviderProps) {
  const [isMandarin, setisMandarin] = useLocalStorageState("isMandarin", false);

  const switchLanguage = useCallback(() => {
    setisMandarin((prev: boolean) => !prev);
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
