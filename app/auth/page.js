import {LoginSubmit} from "../../components/action/login";
import Image from "next/image";
import Link from "next/link";
import {Password} from "../../components/password";

export default function Login() {
  return (
    <>
      <div className="flex flex-col w-full h-screen gap-4 px-2 py-2 justify-center items-center text-zinc-800 dark:text-slate-400">
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
        <div className="flex flex-col w-1/2 gap-2">
          <label htmlFor="username" className="block text-sm font-medium leading-6">用户名</label>
          <input id="username" type="text" name="username" required={true} className="h-10 rounded font-normal bg-zinc-100 dark:bg-zinc-700 pl-4 tracking-widest"/>
        </div>
        <div className="flex flex-col w-1/2 gap-2">
          <div className="flex flex-row">
            <label htmlFor="password" className="basis-1/2 block text-sm font-medium leading-6">密码</label>
            <div className="basis-1/2 flex flex-row text-sm justify-end">
              <Link href={"/auth/retrieve"} className="font-thin text-blue-400 hover:text-blue-500 dark:text-indigo-400 hover:dark:text-indigo-500">忘记密码？</Link>
            </div>
          </div>
          <Password />
        </div>
        <div className="flex flex-col w-1/2 mt-4 text-center">
          <LoginSubmit />
        </div>
        <div className="flex flex-col items-center hidden">
          <div>
            还没有账号？<Link href={"/auth/register"} className="text-blue-400 hover:text-blue-500 dark:text-indigo-400 hover:dark:text-indigo-500">注 册</Link>
          </div>
        </div>
      </div>
    </>
  )
}