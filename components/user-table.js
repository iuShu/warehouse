'use client';

import {Table} from "./table";
import {useEffect, useState} from "react";

const pageSize = 10

export function UserTable() {
  const headers = ['账号', '密码', '邮箱']
  const [rowData, setRowData] = useState(Array)
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

  const styles = {
    layout: 'table-fixed',
    height: `h-[455px]`
  }

  return (
    <>
      <Table name="user" headers={headers} rows={rowData} pages={pages} pageCallback={flip} styles={styles} />
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
