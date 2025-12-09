import { createContext, useEffect, useContext } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
// creating a context
const DarkModeContext = createContext();
// provider component
function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useLocalStorageState(false, "isDarkMode");
  function toggleDarkMode() {
    setDarkMode((isDark) => !isDark);
  }
  //////////////////////////////////////

  useEffect(
    function () {
      if (darkMode) {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
      } else {
        document.documentElement.classList.add("light-mode");
        document.documentElement.classList.remove("dark-mode");
      }
    },
    [darkMode]
  );

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}
/////////////////////////////////////
// custom hook
function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error("'DarkModeContext was used outside of DarkModeProvider");
  return context;
}
export { DarkModeProvider, useDarkMode };
