'use client';

import {createContext, useContext, useState} from "react";

export const ModalContext = createContext({})

const typeStyles = {
  alert: {
    bg: "bg-red-100",
    btn: "bg-red-600 hover:bg-red-500",
    text: "text-red-600"
  },
  confirm: {
    bg: "bg-blue-100",
    btn: "bg-blue-600 hover:bg-blue-500",
    text: "text-blue-600"
  }
}

const callbackNone = {
  confirm: () => {},
  cancel: () => {}
}

export function ModalProvider({ children }) {
  const [modal, setModal] = useState(false)
  const [mask, setMask] = useState(false)

  const [title, setTitle] = useState("操作确认")
  const [content, setContent] = useState("操作描述")
  const [callback, setCallback] = useState(callbackNone)
  const [type, setType] = useState("alert")

  const confirm = () => {
    if (callback.confirm)
      callback.confirm()
    closeModal()
  }

  const cancel = () => {
    if (callback.cancel)
      callback.cancel()
    closeModal()
  }

  const openModal = (type, title, content, callback = callbackNone) => {
    setType(type)
    setTitle(title)
    setContent(content)
    setCallback(callback)
    setMask(true)
    setModal(true)
  }

  const closeModal = () => {
    setModal(false)
    setTimeout(() => setMask(false), 300)
  }

  const config = {
    open: openModal
  }

  return (
    <>
      <ModalContext.Provider value={config}>
        <div className={"relative " + (mask ? "z-10" : "-z-10")}>
          {/*
            Background backdrop, show/hide based on modal state.

            Entering: "ease-out duration-300"
              From: "opacity-0"
              To: "opacity-100"
            Leaving: "ease-in duration-200"
              From: "opacity-100"
              To: "opacity-0"
          */}
          <div className={"fixed inset-0 bg-gray-500/50 transition-opacity ease-in-out duration-300 opacity-0 "
             + (modal ? "opacity-100" : "")}
          />

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              {/*
                Modal panel, show/hide based on modal state.

                Entering: "ease-out duration-300"
                  From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  To: "opacity-100 translate-y-0 sm:scale-100"
                Leaving: "ease-in duration-200"
                  From: "opacity-100 translate-y-0 sm:scale-100"
                  To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              */}
              <div className={"relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg "
                   + "ease-in-out duration-300 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95 " + (modal ? "opacity-100 translate-y-0 sm:scale-100" : "")}>
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className={"mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10 " + typeStyles[type].bg}>
                      <svg className={"h-6 w-6 " + typeStyles[type].text} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">
                        {title}
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-600">
                          {content}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button type="button" onClick={confirm}
                          className={"inline-flex w-full justify-center rounded-md px-3 py-2 text-white shadow-sm tracking-widest sm:ml-3 sm:w-auto " + typeStyles[type].btn}>
                    确认
                  </button>
                  <button type="button" onClick={cancel}
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-gray-900 shadow-sm tracking-widest ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
                    取消
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        { children }
      </ModalContext.Provider>
    </>
  )
}

export function useModalContext() {
  return useContext(ModalContext)
}