'use client';

import {createContext, useContext, useState} from "react";

const NotificationContext = createContext({})

export function NotificationProvider({ children }) {
  const [notify, setNotify] = useState(false)
  const [mask, setMask] = useState(false)
  const [type, setType] = useState("info")
  const [content, setContent] = useState("默认提示")

  const [t, setT] = useState(0)
  const open = (notify_type, text) => {
    setType(notify_type || type)
    setContent(text || content)
    setMask(true)
    setTimeout(() => setNotify(true), 100)
    clearTimeout(t)
    setT(setTimeout(() => close(), 3000))
  }

  const close = () => {
    setNotify(false)
    setTimeout(() => setMask(false), 300)
  }

  const config = {
    notify: (text) => open("info", text),
    alert: (text) => open("alert", text)
  }

  return (
    <>
      <NotificationContext.Provider value={config}>
        { children }
        <div className={"fixed bottom-0 z-10 overflow-y-auto " + (mask ? "" : "hidden")}>
          <div className="flex items-end justify-center p-4 text-center sm:items-end">
            {/*<!--
            Modal panel, show/hide based on modal state.

            Entering: "ease-out duration-300"
              From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              To: "opacity-100 translate-y-0 sm:scale-100"
            Leaving: "ease-in duration-200"
              From: "opacity-100 translate-y-0 sm:scale-100"
              To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          -->*/}
            <div className={"relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:min-w-[20%] sm:max-w-lg border border-slate-100 ease-in-out duration-300 opacity-0 translate-y-4 sm:translate-y-4 sm:scale-95 "
              + (notify ? "opacity-100 translate-y-0 sm:scale-100" : "")}
            >
              <div onClick={close} className="bg-white px-4 py-2 cursor-pointer">
                <div className="flex items-center">
                  <div className={"mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10 " + (type === "alert" ? "bg-red-100" : "bg-green-100")}>
                    <svg className={"h-6 w-6 text-red-600 " + (type === "alert" ? "" : "hidden")} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                         className={"w-6 h-6 text-green-600 " + (type === "info" ? "" : "hidden")}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <p className="text-sm text-gray-500">
                      {/*Are you sure you want to deactivate your account? All of your*/}
                      {/*data will be permanently removed. This action cannot be undone.*/}
                      {content}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </NotificationContext.Provider>
    </>
  )
}

export function useNotificationContext() {
  return useContext(NotificationContext)
}