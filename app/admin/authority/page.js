import {UserTable} from "../../../components/user/user-table";

export default function Authority() {
  return (
    <>
      <div className="h-screen flex flex-col overflow-y-auto bg-white dark:bg-zinc-700 rounded shadow-lg">
        <UserTable />
      </div>
    </>
  )
}