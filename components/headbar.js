'use client';

import {useContext} from "react";
import {ThemeContext} from "../providers/theme";

export function Headbar() {
  const themeContext = useContext(ThemeContext)

  return (
    <>
      <div className="flex flex-row gap-2 rounded">
        <div className="relative basis-1/2 h-16 px-2 py-2">
          <input type="text" placeholder="输入内容 按下回车搜索"
                 className="h-full w-full rounded-full pl-10 pr-4 peer border border-slate-300 text-slate-600 dark:text-slate-200 bg-slate-50 dark:bg-zinc-800 dark:border-slate-600"/>
          <div className="absolute top-5 left-5 text-slate-400 peer-focus:text-slate-700 dark:text-slate-500 peer-focus:dark:text-slate-200">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
            </svg>
          </div>
          <button className="absolute top-3 right-3 px-2 py-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-zinc-200 dark:text-slate-500 hover:dark:text-slate-200 hover:dark:bg-zinc-700 transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                 className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"/>
            </svg>
          </button>
        </div>
        <div className="basis-1/2 flex flex-row-reverse gap-2 px-4">
          <div className="px-2 py-2 flex flex-row gap-4 items-center text-zinc-800 cursor-pointer group hover:text-violet-700 dark:text-slate-300 hover:dark:text-indigo-400">
            <span className="group-hover:scale-110 transition-all duration-300">管理员</span>
          </div>
          <div className="flex items-center">
            <button className="px-2 py-2 rounded-full hover:bg-zinc-200 hover:dark:bg-zinc-700 transition duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                   className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"/>
              </svg>
            </button>
          </div>
          <div className="flex items-center">
            <button onClick={() => themeContext.switch()} className="px-2 py-2 rounded-full hover:bg-zinc-200 hover:dark:bg-zinc-700 transition duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                   className={"w-6 h-6 text-orange-300 " + (themeContext.theme === "dark" ? "" : "hidden")}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                   className={"w-6 h-6 text-indigo-600 " + (themeContext.theme === "" ? "" : "hidden")}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}