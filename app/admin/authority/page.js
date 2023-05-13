import {SideTree} from "../../../components/sidetree";
import {UserTable} from "../../../components/user-table";

export default function Authority() {
  return (
    <>
      <div className="flex flex-col gap-2 h-screen">
        <div className="flex flex-row gap-2 h-2/3 shadow-lg rounded bg-white divide-x">
          <div className="basis-2/3 flex flex-col px-4">
            <UserTable />
          </div>
          <div className="basis-1/3 flex flex-col">
            <SideTree />
          </div>
        </div>
      </div>
    </>
  )
}