import {Sidebar} from "../../components/sidebar";
import {Headbar} from "../../components/headbar";
import {Modal} from "../../components/modal";

export default function AdminLayout({ children }) {

  return (
    <>
      <div className="flex flex-row w-full max-h-screen items-center justify-center text-sm text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-zinc-800 transition duration-600">
        <div className="w-48 h-screen">
          <Sidebar />
        </div>
        <div className="w-full min-h-screen max-h-screen px-2 py-2 overflow-y-auto flex flex-col gap-2">
          <Headbar />
          { children }
        </div>
      </div>
      <Modal />
    </>
  )
}