'use client';

import {createContext, useEffect, useState} from "react";
import {getLocalSetting, setLocalSetting} from "../components/settings";

export const ThemeContext = createContext({}); // blank and dark

// bg-slate-50 dark:bg-zinc-800
// text-zinc-800 dark:text-slate-400 hover:text-zinc-700 hover:dark:text-slate-300
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("");
  const switchTheme = () => {
    theme === "" ? setTheme("dark") : setTheme("")
    setLocalSetting("theme", theme === "" ? "dark" : "")
  }

  useEffect(() => {
    if (getLocalSetting("theme") !== theme)
      switchTheme()
  }, [])

  const provider = {
    theme: theme,
    switch: switchTheme
  }
  return (
    <>
      <ThemeContext.Provider value={provider}>
        <div className={theme}>
          {children}
        </div>
      </ThemeContext.Provider>
    </>
  )
}