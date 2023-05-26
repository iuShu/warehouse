import {WarehouseTable} from "../../../components/warehouse/wh-table";

export default function Warehouse() {
  return (
    <>
      <div className="h-screen flex flex-col overflow-y-auto bg-white dark:bg-zinc-700 rounded shadow-lg">
        <WarehouseTable />
      </div>
    </>
  )
}