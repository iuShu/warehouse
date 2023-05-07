'use client';

import {createContext, useState} from "react";

export const ThemeContext = createContext(""); // blank and dark

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("");
  return (
    <>
      <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    </>
  )
}