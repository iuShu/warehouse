'use client';

import {createContext, useCallback, useContext, useMemo, useState} from "react";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState({});

  const loginHandler = useCallback(res => {
    res.json().then(data => {
      setUser(data['user'])
    })
  }, [])

  const authValue = useMemo(() => ({
    user,
    loginHandler
  }), [user, loginHandler])

  return (
    <>
      <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
    </>
  )
}

export function useAuthContext() {
  return useContext(AuthContext)
}