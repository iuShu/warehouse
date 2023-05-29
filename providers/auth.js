'use client';

import {createContext, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {localUser, saveUser} from "../components/settings";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState({});

  const loginHandler = useCallback(user => {
    setUser(user)
    saveUser(user)
  }, [])

  const authValue = useMemo(() => ({
    user,
    loginHandler
  }), [user, loginHandler])

  useEffect(() => {
    setTimeout(() => setUser(localUser()), 100)
  }, [])

  return (
    <>
      <AuthContext.Provider value={authValue}>
        {children}
      </AuthContext.Provider>
    </>
  )
}

export function useAuthContext() {
  return useContext(AuthContext)
}