'use client';

import {useState, forwardRef, useImperativeHandle, useRef} from "react";
import {Toggle} from "./toggle";

export const SlideOver = forwardRef(function SlideOver(props, ref) {
  const [slide, setSlide] = useState(false)
  const [mask, setMask] = useState(false)
  const [saving, setSaving] = useState(false)
  const panelRef = useRef(null)
  useImperativeHandle(ref, () => ({
    slideIn() {
      open()
    },
    slideOut() {
      close()
    },
    panel() {
      return panelRef.current
    }
  }), [])

  const open = () => {
    setMask(true)
    setTimeout(() => setSlide(true), 100)
  }

  const close = () => {
    setSlide(false)
    setSaving(false)
    setTimeout(() => setMask(false), 500)
  }

  const save = () => {
    setSaving(true)
    props.save()
  }

  const fields = props.fields, editRow = props.editRow, onInput = props.onInput
  return (
    <>
      <div className={"relative " + (mask ? "z-10" : "-z-10")}>
        {/*<!--
          Background backdrop, show/hide based on slide-over state.

          Entering: "ease-in-out duration-500"
            From: "opacity-0"
            To: "opacity-100"
          Leaving: "ease-in-out duration-500"
            From: "opacity-100"
            To: "opacity-0"
        -->*/}
        <div className={"fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity ease-in-out duration-500 opacity-0 "
          + (slide ? "opacity-100" : "")}
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              {/*<!--
                Slide-over panel, show/hide based on slide-over state.

                Entering: "transform transition ease-in-out duration-500 sm:duration-700"
                  From: "translate-x-full"
                  To: "translate-x-0"
                Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
                  From: "translate-x-0"
                  To: "translate-x-full"
              -->*/}
              <div className={"pointer-events-auto relative w-screen max-w-md transform transition ease-in-out duration-500 " + (slide ? "translate-x-0" : "translate-x-full")}>
                {/*<!--
                  Close button, show/hide based on slide-over state.

                  Entering: "ease-in-out duration-500"
                    From: "opacity-0"
                    To: "opacity-100"
                  Leaving: "ease-in-out duration-500"
                    From: "opacity-100"
                    To: "opacity-0"
                -->*/}
                <div className={"absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4 ease-in-out duration-500 opacity-0 " + (slide ? "opacity-100" : "")}>
                  <button type="button" onClick={close}
                          className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
                    <span className="sr-only">Close panel</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>

                <div className="flex h-full flex-col overflow-y-auto bg-white shadow-xl">
                  <div className="h-16 bg-violet-500 flex items-center pl-4">
                    <h2 className="text-base leading-6 text-violet-50 tracking-widest" id="slide-over-title">
                      { props.title }
                    </h2>
                  </div>
                  <div className="relative" ref={panelRef}>
                    {/*{ props.children }*/}
                    <div className="flex flex-col gap-4 px-4 py-4 items-start justify-start">
                      {fields.map(each => {
                        if (each.hasOwnProperty("ele") && each.ele === "toggle") {
                          return <div key={"slo-" + each.field} className="w-full flex flex-row gap-2">
                            <label htmlFor={each.field} className="basis-1/2 block text-sm font-medium leading-6 pl-1 tracking-widest select-none">{each.title}</label>
                            <Toggle value={editRow.hasOwnProperty(each.field) ? editRow[each.field] === "1" : false}
                                    setValue={val => onInput(each.field, val ? "1" : "0")} />
                          </div>
                        }
                        else if (each.title === "id") {
                          return <input type="hidden" key={each.field} name={each.field} value={editRow.hasOwnProperty(each.field) ? editRow[each.field] : ""} />
                        }
                        else {
                          return <div key={"slo-" + each.field} className="w-full flex flex-col gap-2">
                            <label htmlFor={each.field} className="block text-sm font-medium leading-6 pl-1 tracking-widest select-none">{each.title}</label>
                            <input type="text" id={each.field} name={each.field} required={true}
                                   value={editRow[each.field] || ""} disabled={each.hasOwnProperty("editable") && each.editable}
                                   onChange={e => onInput(each.field, e.target.value)}
                                   className="h-10 rounded bg-zinc-100 dark:bg-zinc-700 pl-2 tracking-wider disabled:bg-gray-50"/>
                          </div>
                        }
                      })}
                    </div>
                  </div>
                  <div className="px-4 pt-4 border-t border-slate-200 flex flex-row gap-2 items-center justify-center">
                    <button onClick={close}
                            className="basis-1/2 py-2 rounded bg-white border border-slate-200 tracking-widest hover:bg-slate-50">
                      取消
                    </button>
                    <button onClick={save} disabled={saving}
                            className="basis-1/2 py-2 flex flex-row gap-2 justify-center rounded text-white bg-violet-500 border border-slate-200 tracking-widest hover:bg-violet-600">
                      <svg className={"animate-spin h-5 w-5 text-white " + (saving ? "" : "hidden")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                      <div className={saving ? "hidden" : ""}>保存</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
})