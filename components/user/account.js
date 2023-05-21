'use client';

import {useEffect, useState} from "react";
import {useAuthContext} from "../../providers/auth";

export function Account() {
  const authContext = useAuthContext()
  const [user, setUser] = useState(authContext.user || {username: '', password: '', email: ''})
  const [saving, setSaving] = useState(false)

  const recover = () => {

  }

  const save = () => {
    setSaving(true)

    // validate and request info saving

    const updated = {
      user: {
        username: user.username,
        password: user.password,
        email: user.email
      }
    }
    authContext.loginHandler(updated)
    setSaving(false)
  }

  return (
    <>
      <div className="w-full flex flex-col items-center py-4">
        <div className="w-1/2 flex flex-col gap-4 px-4 py-4">
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="username" className="block text-sm font-medium leading-6 pl-1 tracking-widest select-none">账号</label>
            <input id="username" type="text" name="username"
                   value={user.username} disabled={true}
                   className="h-10 rounded bg-zinc-100 dark:bg-zinc-700 pl-2 tracking-wider disabled:bg-gray-50"/>
          </div>
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="password" className="block text-sm font-medium leading-6 pl-1 tracking-widest select-none">密码</label>
            <input id="password" type="text" name="password"
                   value={user.password} onChange={e => {}}
                   className="h-10 rounded bg-zinc-100 dark:bg-zinc-700 pl-2 tracking-wider"/>
          </div>
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="email" className="block text-sm font-medium leading-6 pl-1 tracking-widest select-none">邮箱</label>
            <input id="email" type="email" name="email"
                   value={user.email} onChange={e => {}}
                   className="h-10 rounded bg-zinc-100 dark:bg-zinc-700 pl-2 tracking-wider"/>
          </div>
          <div className="pt-4 flex flex-row gap-2 items-center justify-center">
            <button onClick={recover}
                    className="basis-1/2 py-2 rounded bg-white border border-slate-200 tracking-widest hover:bg-slate-50">
              恢复
            </button>
            <button onClick={save} disabled={saving}
                    className="basis-1/2 py-2 flex flex-row gap-2 justify-center rounded text-white bg-violet-500 border border-slate-200 tracking-widest hover:bg-violet-600">
              <svg className={"animate-spin h-5 w-5 text-white " + (saving ? "" : "hidden")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              <div className={saving ? "hidden" : ""}>保存</div>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export function Username() {
  const authContext = useAuthContext()
  return (
    <>
      {"AAA"}
    </>
  )
}