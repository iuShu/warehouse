export default function Dashboard() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row w-full h-16 gap-4">
          <div className="basis-1/2 bg-blue-200 rounded"/>
          <div className="basis-1/2 bg-blue-300 rounded"/>
        </div>
        <div className="flex flex-row w-full h-[40rem] gap-4">
          <div className="basis-2/5 flex flex-col w-full gap-4">
            <div className="basis-1/3 flex flex-row w-full gap-4">
              <div className="basis-1/2 bg-blue-500 rounded"/>
              <div className="basis-1/2 bg-blue-400 rounded"/>
            </div>
            <div className="basis-2/3 bg-blue-300 rounded"/>
          </div>
          <div className="basis-3/5 bg-blue-400 rounded"/>
        </div>
        <div className="flex flex-row w-full h-96 gap-4">
          <div className="basis-3/5 bg-blue-400 rounded"/>
          <div className="basis-2/5 bg-blue-300 rounded"/>
        </div>
      </div>
    </>
  )
}