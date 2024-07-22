import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { useLocalStorageState } from "../hooks/useGeneral";
import PropTypes from "prop-types";

// 創建 Context
const DarkModeContext = createContext();

// 定義 DarkModeProvider 組件
DarkModeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState("isDarkMode", false);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prevMode) => !prevMode);
  }, [setIsDarkMode]);

  useEffect(() => {
    const className = isDarkMode ? "dark-mode" : "light-mode";
    document.documentElement.classList.add(className);
    document.documentElement.classList.remove(
      isDarkMode ? "light-mode" : "dark-mode"
    );
  }, [isDarkMode]);

  const value = useMemo(
    () => ({
      isDarkMode,
      toggleDarkMode,
    }),
    [isDarkMode, toggleDarkMode]
  );

  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  );
}

// 自定義 hook useDarkMode
function useDarkMode() {
  const context = useContext(DarkModeContext);

  if (!context) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }

  return context;
}

// 匯出組件和 hook
export { DarkModeProvider, useDarkMode };
