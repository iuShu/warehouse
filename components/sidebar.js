'use client';

import Link from "next/link";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

export function Sidebar() {
  const defaultClass = "hover:bg-zinc-300 hover:text-slate-700 hover:dark:bg-zinc-700 hover:dark:text-slate-300",
    activeClass = "bg-zinc-300 text-slate-700 dark:bg-zinc-700 dark:text-slate-300"
  const [tab, setTab] = useState("dashboard")

  const clickTab = (t) => {
    setTab(t)
  }

  useEffect(() => {
    const pathname = window.location.pathname
    if (tab === 'dashboard' && pathname !== '/admin') {
      const seg = pathname.split('/')
      setTab(seg[seg.length - 1])
    }
  }, [])

  return (
    <>
      <nav className="flex flex-col gap-1 h-screen">
        <div className="basis-3/5 flex flex-col gap-1">
          <div className="h-16 flex flex-row gap-2" />
          <Link href={"/admin"} onClick={() => clickTab("dashboard")}
                className={"w-full h-10 flex flex-row gap-2 px-4 items-center justify-start text-zinc-800 dark:text-slate-400 rounded-r-full " + (tab === "dashboard" ? activeClass : defaultClass)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                 stroke="currentColor" className={"w-5 h-5 opacity-100"}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/>
            </svg>
            <span>Dashboard</span>
          </Link>
          <Link href={"/admin/product"} onClick={() => clickTab("product")}
                className={"w-full h-10 flex flex-row gap-2 px-4 items-center justify-start text-zinc-800 dark:text-slate-400 rounded-r-full " + (tab === "product" ? activeClass : defaultClass)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                 stroke="currentColor" className={"w-5 h-5 opacity-100"}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/>
            </svg>
            <span>Product</span>
          </Link>
          <Link href={"/admin/warehouse"} onClick={() => clickTab("warehouse")}
                className={"w-full h-10 flex flex-row gap-2 px-4 items-center justify-start text-zinc-800 dark:text-slate-400 rounded-r-full " + (tab === "warehouse" ? activeClass : defaultClass)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                 stroke="currentColor" className={"w-5 h-5 opacity-100"}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/>
            </svg>
            <span>Warehouse</span>
          </Link>
        </div>
        <div className="basis-2/5 flex flex-col justify-end gap-1 pb-4">
          <Link href={""}
                className={"w-full h-10 flex flex-row gap-2 px-4 items-center justify-start text-zinc-800 dark:text-slate-400 rounded-r-full " + defaultClass}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                 stroke="currentColor" className={"w-5 h-5 opacity-100"}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/>
            </svg>
            <span>Settings</span>
          </Link>
          <Link href={""}
                className={"w-full h-10 flex flex-row gap-2 px-4 items-center justify-start text-zinc-800 dark:text-slate-400 rounded-r-full " + defaultClass}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                 stroke="currentColor" className={"w-5 h-5 opacity-100"}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/>
            </svg>
            <span>Theme</span>
          </Link>
          <Link href={""}
                className="w-full h-10 flex flex-row gap-2 px-4 items-center justify-start text-zinc-800 dark:text-slate-400 rounded-r-full hover:bg-red-500 hover:text-slate-200 hover:dark:text-slate-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                 stroke="currentColor" className={"w-5 h-5 opacity-100"}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/>
            </svg>
            <span>Logout</span>
          </Link>
        </div>
      </nav>
    </>
  )
}