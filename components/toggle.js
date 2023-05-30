import {useRef, useState} from "react";

export function Toggle({ name, value }) {
  const [open, setOpen] = useState(value)
  const ref = useRef(null)
  console.log('toggle init', value)
  return (
    <>
      <div>
        <input name={name} type="checkbox" value={open} ref={ref} checked={open} onChange={() => setOpen(!open)}
               className={"peer "} />
        <button onClick={() => ref.current?.click()}
                className="relative w-12 px-[2px] py-[2px] inline-flex bg-zinc-200 border-1 border-transparent rounded-full transition-all duration-300 peer-checked:bg-violet-500">
          <span className={"inline-flex bg-white w-5 h-5 rounded-full transition-all duration-300 translate-x-0 " + (open ? "translate-x-6" : "")}/>
        </button>
      </div>
    </>
  )
}
