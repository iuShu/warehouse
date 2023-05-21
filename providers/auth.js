'use client';

import {createContext, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {setLocalSetting} from "../components/settings";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState({});

  const loginHandler = useCallback(user => {
    console.log('> update user to', user)
    setUser(user)
    setLocalSetting('u', user)
  }, [])

  const authValue = useMemo(() => ({
    user,
    loginHandler
  }), [user, loginHandler])

  console.log('current', user)

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