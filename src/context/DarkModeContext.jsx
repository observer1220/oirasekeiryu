import {
  createContext,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { useLocalStorageState } from "../hooks";
import PropTypes from "prop-types";

// 創建 Context
const DarkModeContext = createContext();

// 定義 DarkModeProvider 組件
DarkModeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState("isDarkMode", false);

  // 使用 useCallback 避免重新渲染時重新創建函數
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

  // 使用 useMemo 避免每次重新渲染時重新創建物件
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

export { DarkModeProvider, DarkModeContext };