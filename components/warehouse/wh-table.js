'use client';

import {Table} from "../table";
import {SlideOver} from "../slideover";
import {useEffect, useRef, useState} from "react";
import {fetchData} from "../fetch";

const pageSize = 10

export function WarehouseTable() {
  const headers = ['仓库名称', '所在城市', '详细地址', '虚拟仓']
  const [rowData, setRowData] = useState(Array)
  const [editRow, setEditRow] = useState(new Array(headers.length + 2).fill(''))
  const [pages, setPages] = useState({})

  useEffect(() => {
    const page = {
      pageNo: 1,
      pageSize: pageSize
    }
    fetchData("/admin/warehouse/api", "post", page).then(data => {
      const {list, page} = data.payload
      setPages(page)
      setRowData(list)
    })
  }, [])

  const flip = (pageNo) => {
    if (pageNo > pages.totalPage || pageNo < 1)
      return
    const p = Object.assign({}, pages)
    p.pageNo = pageNo
    const {rows, page} = fetchPage(p.pageNo, p.pageSize)
    setPages(page)
    setRowData(rows)
  }

  const slideRef = useRef(null)
  const edit = (r, row) => {
    setEditRow([...row, r])
    slideRef.current?.slideIn()
  }

  const saveEdit = () => {
    const panel = slideRef.current?.panel(), data = []
    panel.querySelectorAll('input').forEach((ele, i) => {
      data.push(ele.value)
    })

    // request edit saving

    const updated = [...rowData]
    updated[editRow[editRow.length - 1]] = [editRow[0], ...data]
    setRowData(updated)

    slideRef.current?.slideOut()
  }

  const onInput = (i, val) => {
    const row = [...editRow]
    row[i] = val
    setEditRow(row)
  }

  const styles = {
    layout: 'table-fixed',
    height: `h-[444px]`
  }

  return (
    <>
      <Table name="user" headers={headers} rows={rowData} pages={pages} pageCallback={flip} editCallback={edit} styles={styles} />
      <SlideOver title={"用户编辑"} save={saveEdit} ref={slideRef}>
        <div className="flex flex-col gap-4 px-4 py-4 items-start justify-start">
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="username" className="block text-sm font-medium leading-6 pl-1 tracking-widest select-none">{headers[0]}</label>
            <input id="username" type="text" name="username" required={true}
                   value={editRow[1]} disabled={true}
                   className="h-10 rounded bg-zinc-100 dark:bg-zinc-700 pl-2 tracking-wider disabled:bg-gray-50"/>
          </div>
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="password" className="block text-sm font-medium leading-6 pl-1 tracking-widest select-none">{headers[1]}</label>
            <input id="password" type="text" name="password" required={true}
                   value={editRow[2]} onChange={e => onInput(2, e.target.value)}
                   className="h-10 rounded bg-zinc-100 dark:bg-zinc-700 pl-2 tracking-wider"/>
          </div>
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="email" className="block text-sm font-medium leading-6 pl-1 tracking-widest select-none">{headers[2]}</label>
            <input id="email" type="email" name="email" required={true}
                   value={editRow[3]} onChange={e => onInput(3, e.target.value)}
                   className="h-10 rounded bg-zinc-100 dark:bg-zinc-700 pl-2 tracking-wider"/>
          </div>
        </div>
      </SlideOver>
    </>
  )
}

let fakeId = 1
function fetchPage(pageNo, pageSize) {
  const raw = []
  const page = {
    pageNo: pageNo,
    pageSize: pageSize
  }

  return {
    rows: raw,
    page: page
  }
}
