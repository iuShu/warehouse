import {AuthFloatbar} from "../../components/action/auth-floatbar";
import {Sidebar} from "../../components/sidebar";

export default function AdminLayout({ children }) {

  return (
    <>
      <div className="flex flex-row w-full max-h-screen items-center justify-center text-sm text-slate-700 dark:text-slate-200 bg-zinc-100 dark:bg-zinc-800 transition duration-600">
        <div className="w-48 h-screen">
          <Sidebar />
        </div>
        <div className="w-full min-h-screen max-h-screen px-4 py-4 overflow-y-auto">
          { children }
        </div>
      </div>
    </>
  )
}