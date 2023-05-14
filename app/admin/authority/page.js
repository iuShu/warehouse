import {SideTree} from "../../../components/sidetree";
import {UserTable} from "../../../components/user-table";
import {DeptTable} from "../../../components/dept-table";
import {RoleTable} from "../../../components/role-table";

export default function Authority() {
  return (
    <>
      <div className="flex flex-col gap-2 h-screen overflow-y-auto">
        <div className="flex flex-row gap-2 h-[515px]">
          <div className="basis-2/3 flex flex-col px-4 bg-white rounded shadow-lg">
            <UserTable />
          </div>
          <div className="basis-1/3 flex flex-col">
            <div className="flex flex-col gap-2 h-full">
              <div className="h-2/5 bg-white rounded shadow-lg px-4">
                <DeptTable />
              </div>
              <div className="h-3/5 bg-white rounded shadow-lg px-4">
                <RoleTable />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}