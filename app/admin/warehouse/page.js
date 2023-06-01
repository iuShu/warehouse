import {WarehouseTable} from "../../../components/warehouse/wh-table";
import {ShiftItemTable} from "../../../components/warehouse/shift-item";
import {ShiftWarehouseTable} from "../../../components/warehouse/shift-wh";

export default function Warehouse() {
  return (
    <>
      <div className="h-screen flex flex-col gap-2 overflow-y-auto">
        <div className="flex flex-col bg-white dark:bg-zinc-700 rounded shadow">
          <WarehouseTable />
        </div>
        <div className="flex flex-row gap-2">
          <div className="basis-2/3 flex flex-col bg-white dark:bg-zinc-700 rounded shadow">
            <ShiftWarehouseTable />
          </div>
          <div className="basis-1/3 flex flex-col bg-white dark:bg-zinc-700 rounded shadow">
            <ShiftItemTable />
          </div>
        </div>
      </div>
    </>
  )
}