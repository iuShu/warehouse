import {AuthFloatbar} from "../../components/action/auth-floatbar";
import Head from "next/head";

export default function AuthLayout({ children }) {
  return (
    <>
      <Head>
        <title>Auth Page</title>
      </Head>
      <div className="flex flex-row h-screen text-sm font-thin bg-slate-50 dark:bg-zinc-800 tracking-wider transition duration-600 select-none">
        <div className="basis-1/2 hidden md:flex flex-col px-2 py-2">
          <div className="h-screen flex-col gap-4 bg-white dark:bg-zinc-900 shadow-lg rounded-lg">
            <div className="h-full w-full flex flex-col gap-4 justify-center items-center">
              <div className="bg-blue-200 w-1/2 h-16 rounded-lg"/>
              <div className="bg-blue-300 w-1/2 h-16 rounded-lg"/>
              <div className="bg-blue-400 w-1/2 h-16 rounded-lg"/>
            </div>
          </div>
        </div>
        <div className="basis-full md:basis-1/2">
          {children}
        </div>
        <AuthFloatbar />
      </div>
    </>
  )
}