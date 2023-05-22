'use client';

import {createContext, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {getLocalSetting, setLocalSetting} from "../components/settings";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState({});

  const loginHandler = useCallback(user => {
    setUser(user)
    setLocalSetting('u', user)
  }, [])

  const authValue = useMemo(() => ({
    user,
    loginHandler
  }), [user, loginHandler])

  useEffect(() => {
    setTimeout(() => setUser(getLocalSetting('u')), 100)
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