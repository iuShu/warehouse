'use client';

import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/navigation";

export function LoginForm() {

  const router = useRouter()

  const submitLogin = () => {
    fetch('/login/api', {
      method: 'post',
      body: JSON.stringify({
        username: 'admin',
        password: 'admin'
      })
    }).then(res => {
      console.log('>', res.ok)
      if (!res.ok) {
        alert('login failed')
        return
      }
      router.push('/admin')
    }).catch(err => {
      console.error('login error', err)
    })
  }

  return (
    <>
      <div className="flex flex-col w-1/2 gap-4">
        <div className="flex flex-col items-center">
          <Image
            className="dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="/next.svg"
            alt="Next.js Logo"
            width={150}
            height={30}
            priority
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="block text-sm font-medium leading-6">用户名</label>
          <input id="username" type="text" name="username" required={true} className="h-10 rounded font-normal bg-zinc-200 dark:bg-zinc-700 pl-2 tracking-wider"/>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row">
            <label htmlFor="password" className="basis-1/2 block text-sm font-medium leading-6">密码</label>
            <div className="basis-1/2 flex flex-row text-sm justify-end">
              <Link href={""} className="font-thin text-blue-400 hover:text-blue-500 dark:text-indigo-400 hover:dark:text-indigo-500">忘记密码？</Link>
            </div>
          </div>
          <input id="password" type="password" name="password" required={true} className="h-10 rounded bg-zinc-200 dark:bg-zinc-700 pl-2 tracking-wider"/>
        </div>
        <div className="flex flex-col mt-4 text-center">
          <Link href={""} onClick={submitLogin}
                className="py-2 rounded tracking-widest transition duration-300 bg-blue-200 hover:bg-blue-300 dark:text-indigo-100 dark:bg-indigo-500 hover:dark:bg-indigo-600">
            登录
          </Link>
          <Link href={"/admin"} id="_login" className="hidden" />
        </div>
        <div className="flex flex-col items-center">
          <div>
            还没有账号？<Link href={""} className="text-blue-400 hover:text-blue-500 dark:text-indigo-400 hover:dark:text-indigo-500">注 册</Link>
          </div>
        </div>
      </div>
    </>
  )
}