'use client';

import Link from "next/link";
import {useRouter} from "next/navigation";
import {useAuthContext} from "../../providers/auth";

export function LoginSubmit() {

  const router = useRouter()
  const authContext = useAuthContext()

  const submitLogin = () => {
    fetch('/auth/api', {
      method: 'POST',
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: "admin",
        password: "admin@pwd"
      })
    }).then(res => {
      if (!res.ok) {
        alert('auth failed')
        return
      }
      res.json().then(data => {
        data.user["loginAt"] = Date.now()
        authContext.loginHandler(data.user)
      })
      router.push('/admin')
    }).catch(err => {
      console.error('auth error', err)
    })
  }

  return (
    <>
      <Link href={""} onClick={submitLogin}
            className="py-2 rounded tracking-widest transition duration-300 bg-blue-200 hover:bg-blue-300 dark:text-indigo-100 dark:bg-indigo-500 hover:dark:bg-indigo-600">
        登录
      </Link>
    </>
  )
}