"use client";

import Link from "next/link";
import {useRouter} from "next/navigation";

export function Logout() {

  const router = useRouter()

  const logout = () => {
    fetch("/auth/api", {
      method: "delete"
    }).then(res => {
      if (res.ok) {
        res.json().then(data => {
          if (data.success)
            router.push("/auth")
          else
            alert("logout failed" + data.msg)
        })
      }
    }).catch(err => {
      console.error("logout error", err)
    })
  }

  return (
    <>
      <Link href={""} onClick={logout}
            className="w-full h-10 flex flex-row gap-2 px-4 items-center justify-start rounded-r-full text-zinc-800 dark:text-slate-400 hover:bg-red-500 hover:text-slate-200 hover:dark:text-slate-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
             stroke="currentColor" className={"w-6 h-6 opacity-100"}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/>
        </svg>
        <span>退出</span>
      </Link>
    </>
  )
}