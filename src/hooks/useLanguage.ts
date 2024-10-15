import { useContext } from "react";
import { LanguageContext } from "../context";

function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageSwitchProvider");
  }

  return context;
}

export { useLanguage };
