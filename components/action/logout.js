"use client";

import {useRouter} from "next/navigation";
import {useNotificationContext} from "../../providers/notification";
import {useAuthContext} from "../../providers/auth";
import {deleteData} from "../fetch";

export function Logout() {

  const router = useRouter()
  const authContext = useAuthContext();
  const notificationContext = useNotificationContext();

  const logout = () => {
    deleteData("/auth/api", "delete").then(data => {
      if (data.code === 1) {
        authContext.loginHandler({})
        notificationContext.notify("正在退出 ...")
        router.push("/auth")
      }
      else {
        notificationContext.alert(data.msg || "退出异常")
      }
    })
  }

  return (
    <>
      <button onClick={logout}
              className="w-full h-10 flex flex-row gap-2 px-4 items-center justify-start rounded-r-full tracking-widest text-zinc-800 dark:text-slate-400 hover:bg-red-500 hover:text-slate-200 hover:dark:text-slate-200 transition duration-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
             className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"/>
        </svg>
        <span>退出</span>
      </button>
    </>
  )
}