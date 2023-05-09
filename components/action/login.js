'use client';

import Link from "next/link";
import {useRouter} from "next/navigation";

export function LoginSubmit() {

  const router = useRouter()

  const submitLogin = () => {
    fetch('/auth/api', {
      method: 'post',
      body: JSON.stringify({
        username: 'admin',
        password: 'admin'
      })
    }).then(res => {
      console.log('>', res.ok)
      if (!res.ok) {
        alert('auth failed')
        return
      }
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