import Link from "next/link";
import {Logout} from "../../components/action/logout";

export default function Admin() {
  return (
    <>
      <div className="flex flex-col gap-4 w-full min-h-screen bg-zinc-100 items-center justify-center">
        <p>Admin</p>
        <Logout />
      </div>
    </>
  )
}