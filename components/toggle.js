import {useRef} from "react";

export function Toggle({ value, setValue }) {
  const ref = useRef(null)
  return (
    <>
      <div>
        <input type="checkbox" ref={ref} value={value} checked={value} onChange={() => setValue(!value)}
               className={"peer hidden"} />
        <button onClick={() => ref.current?.click()} id={"toggle-btn"}
                className="relative w-12 px-[2px] py-[2px] inline-flex bg-zinc-200 border-1 border-transparent rounded-full transition-all duration-300 peer-checked:bg-violet-500">
          <span className={"inline-flex bg-white w-5 h-5 rounded-full transition-all duration-300 translate-x-0 " + (value ? "translate-x-6" : "")}/>
        </button>
      </div>
    </>
  )
}
