import Image from "next/image";
import {Account, Username} from "../../../components/user/account";

export default function Profile() {
  return (
    <>
      <div className="h-screen flex flex-col overflow-y-auto bg-white dark:bg-zinc-700 rounded shadow-lg">
        <div className="h-48 flex flex-row gap-2 border-b border-slate-100">
          <div className="basis-1/2 tracking-widest">
            <Username />
          </div>
          <div className="basis-1/2 flex justify-center pt-2">
            <Image
              className=""
              src="/profile-john.png"
              alt="Profile Default Logo"
              width={308}
              height={120}
              priority
            />
          </div>
        </div>
        <div className="h-full">
          <Account />
        </div>
      </div>
    </>
  )
}