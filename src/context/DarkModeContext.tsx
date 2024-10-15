import { createContext, useEffect, useMemo, useCallback } from "react";
import { useLocalStorageState } from "../hooks";

// 創建 Context
const DarkModeContext = createContext({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

interface DarkModeProviderProps {
  children: React.ReactNode;
}

function DarkModeProvider({ children }: DarkModeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState("isDarkMode", false);

  // 使用 useCallback 避免重新渲染時重新創建函數
  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prevMode: boolean) => !prevMode);
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
