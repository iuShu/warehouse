'use client';

import {useRef, useState} from "react";

const selectedRows = new Set()

export function Table({ name, headers, rows, pages = null, pageCallback = null,
                        toolbar = true, styles = {} }) {
  const rowRefs = useRef([])
  const onClickRow = (r) => {
    const ele = rowRefs.current[r]
    const checkbox = ele.querySelector('button')
    if (!checkbox.classList.contains('active')) {
      selectedRows.add(rows[r][0])
      ele.classList.add('bg-gray-50')
    }
    else {
      selectedRows.delete(rows[r][0])
      ele.classList.remove('bg-gray-50')
    }
    checkbox.click()
  }

  const [selectAll, setSelectAll] = useState(false)
  const onSelectAll = () => {
    if (selectAll) {  // cancel
      rows.map((row, r) => {
        if (selectedRows.has(row[0]))
          onClickRow(r)
      })
    }
    else {  // select
      rows.map((row, r) => {
        if (!selectedRows.has(row[0]))
          onClickRow(r)
      })
    }
    setSelectAll(!selectAll)
  }

  const empty = pages.totalRow === 0
  const pageNos = Array.from({ length: pages.totalPage }, (v, i) => i + 1);
  return (
    <>
      <div className="h-full flex flex-col gap-1 pb-2">
        <div className={"relative overflow-y-auto " + (styles.height || "")}>
          <table className={"w-full " + (styles.layout || "table-auto")}>
            <thead className="text-left tracking-widest select-none hover:bg-violet-50/50">
            <tr>
              <th key={name + "-select-all"}
                  className="w-12 pt-4 text-center border-b dark:border-zinc-500">
                <div onClick={onSelectAll} className={pages.totalRow < 1 ? "hidden" : ""}>
                  <Checkbox />
                </div>
              </th>
              {headers.map((each, i) => {
                return (
                  <th key={name + "-th-" + i} className="px-2 pt-4 border-b dark:border-zinc-500">
                    {each}
                  </th>
                )
              })}
            </tr>
            </thead>
            <tbody className="text-left text-slate-600">
            {rows.map((row, r) => {
              const rid = row[0]
              return (
                <tr key={name + "-tr-" + rid} id={rid} ref={rf => rowRefs.current[r] = rf} onClick={() => onClickRow(r)}
                    className="border-b cursor-pointer hover:bg-gray-50">
                  {row.map((col, i) => {
                    return (
                      <td key={name + "-td-" + col} className={"px-2 py-2 truncate " + (i === 0 ? "text-center" : "")}>
                        {i === 0 ? <Checkbox /> : col}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
            </tbody>
          </table>
          <div className={"absolute w-full h-full flex flex-col items-center justify-center " + (empty ? "" : "hidden")}>
            <div className="text-zinc-300 flex flex-col gap-2 items-center tracking-widest select-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"/>
              </svg>
              <div>没有数据</div>
            </div>
          </div>
        </div>
        <div className={"flex flex-row " + (toolbar ? "" : "hidden")}>
          <div className="basis-2/5 flex flex-row gap-1 text-violet-600 items-center">
            <button className="h-8 px-2 rounded hover:bg-violet-100 active:bg-violet-200 tracking-widest">新增</button>
            <button className="h-8 px-2 rounded hover:bg-violet-100 active:bg-violet-200 tracking-widest">删除</button>
          </div>
          <div className="basis-3/5 flex flex-row items-center justify-end font-semibold">
            <div className="font-semibold hidden">Page Size</div>
            <select className="w-18 px-2 py-1 cursor-pointer rounded font-semibold bg-zinc-100 hover:bg-zinc-200 hidden">
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <div className="px-2 pt-1 select-none text-slate-500">
              共 <span>{pages.totalRow}</span> 条
            </div>
            <div className="flex flex-row gap-1 text-slate-500">
              <div onClick={() => pageCallback(pages.pageNo - 1)}
                   className={"px-2 py-2 rounded-full " + (pages.pageNo === 1 ? "text-slate-300" : "cursor-pointer hover:bg-zinc-200")}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/>
                </svg>
              </div>
              <div className="flex items-center">
                <select value={pages.pageNo} onChange={(e) => pageCallback(parseInt(e.target.value))}
                        className="w-16 py-1 cursor-pointer select-none rounded bg-zinc-100 hover:bg-zinc-200">
                  {pageNos.map(p => <option key={p} className="font-semibold" value={p}>{p}</option>)}
                </select>
              </div>
              <div onClick={() => pageCallback(pages.pageNo + 1)}
                   className={"px-2 py-2 rounded-full " + (empty || pages.pageNo === pages.totalPage ? "text-slate-300" : "cursor-pointer hover:bg-zinc-200")}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function Checkbox() {
  const [click, setClick] = useState(false)
  const onCheck = () => {
    setClick(!click)
  }
  return (
    <>
      <button onClick={onCheck}
              className={"relative w-5 h-5 rounded transition duration-300 " + (click ? "bg-violet-500 active" : "bg-gray-200 dark:bg-zinc-700")}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
             className={"w-4 h-4 pl-1 " + (click ? "text-slate-50" : "opacity-0")}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
        </svg>
      </button>
    </>
  )
}