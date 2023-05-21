'use client';

import {Table} from "../table";
import {useEffect, useRef, useState} from "react";
import {SlideOver} from "../slideover";
import Link from "next/link";

const pageSize = 10

export function UserTable() {
  const headers = ['账号', '密码', '邮箱']
  const [rowData, setRowData] = useState(Array)
  const [editRow, setEditRow] = useState(new Array(headers.length + 2).fill(''))
  const [pages, setPages] = useState({})

  useEffect(() => {
    const {rows, page} = fetchPage(1, pageSize)
    setPages(page)
    setRowData(rows)
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
    height: `h-[455px]`
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
  const raw = [
    ['account1', 'account1', 'user@password', 'user@mail.com'],
    ['account2', 'account2', 'user@password', 'user@mail.com'],
    ['account3', 'account3', 'user@password', 'user@mail.com'],
    ['account4', 'account4', 'user@password', 'user@mail.com'],
    ['account5', 'account5', 'user@password', 'user@mail.com'],
    ['account6', 'account6', 'user@password', 'user@mail.com'],
    ['account7', 'account7', 'user@password', 'user@mail.com'],
    ['account8', 'account8', 'user@password', 'user@mail.com'],
    ['account9', 'account9', 'user@password', 'user@mail.com'],
    ['account10', 'account10', 'user@password', 'user@mail.com']
  ]
  raw.map((row, i) => {
    row[0] = "account" + fakeId++
    row[1] = row[0]
  })
  if (pageNo === 7)
    raw.pop()
  return {
    rows: raw,
    page: {
      pageNo: pageNo,
      pageSize: pageSize,
      totalPage: 7,
      totalRow: 69
    }
  }
}
