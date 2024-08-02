import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DarkModeContext, LanguageContext } from "../context";

function useMoveBack() {
  const navigate = useNavigate();
  return () => navigate(-1);
}

function useLocalStorageState(key, initialState) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}

function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(() => {
    function handleClick(event) {
      // console.log("ref.current", ref.current);
      // console.log("event.target", event.target);

      if (ref.current && !ref.current.contains(event.target)) {
        // console.log("Click Outside");
        handler();
      }
    }

    // 事件名稱、事件處理器、捕獲或冒泡(預設為false冒泡，true為捕獲)
    document.addEventListener("click", handleClick, listenCapturing);
    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [handler, listenCapturing]);

  return ref;
}

function useDarkMode() {
  const context = useContext(DarkModeContext);

  if (!context) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }

  return context;
}

function useSwitchLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useSwitchLanguage must be used within a LanguageSwitchProvider"
    );
  }

  return context;
}

export {
  useMoveBack,
  useLocalStorageState,
  useOutsideClick,
  useDarkMode,
  useSwitchLanguage,
};
