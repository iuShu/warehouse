'use client';

import {useState} from "react";

export function Password({ password }) {
  const [showPwd, setShowPwd] = useState(false)
  const [pwd, setPwd] = useState(password || "")
  const switchShow = () => {
    if (!showPwd)
      document.querySelector("#password").type = "text"
    else
      document.querySelector("#password").type = "password"
    setShowPwd(!showPwd)
  }

  return (
    <>
      <div className="relative">
        <input type="text" required={true} value={pwd} onChange={e => setPwd(e.target.value)}
               className={"w-full h-10 rounded bg-zinc-100 dark:bg-zinc-700 pl-4 tracking-widest " + (showPwd ? "" : "hidden")}/>
        <input id="password" type="password" required={true} value={pwd} onChange={e => setPwd(e.target.value)}
               className={"w-full h-10 rounded bg-zinc-100 dark:bg-zinc-700 pl-4 tracking-widest " + (showPwd ? "hidden" : "")}/>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
             onClick={switchShow}
             className={"absolute top-2 right-2 w-6 h-6 text-slate-500 cursor-pointer hover:text-zinc-700 " + (showPwd ? "hidden" : "")}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
             onClick={switchShow}
             className={"absolute top-2 right-2 w-6 h-6 text-slate-500 cursor-pointer hover:text-slate-700 " + (showPwd ? "" : "hidden")}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/>
        </svg>
      </div>
    </>
  )
}