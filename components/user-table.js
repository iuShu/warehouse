'use client';

import {Table} from "./table";
import {useEffect, useState} from "react";

export function UserTable() {
  const headers = ['账号', '名称', '部门', '角色', '创建时间']
  const [rowData, setRowData] = useState(Array)
  const [pages, setPages] = useState({})

  useEffect(() => {
    const {rows, page} = fetchPage(1, 10)
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

  return (
    <>
      <Table headers={headers} rows={rowData} pages={pages} pageCallback={flip} />
    </>
  )
}

function fetchPage(pageNo, pageSize) {
  const raw = [
    [1, 'account', 'abc', '财务部', '管理员', '2023-02-12 18:29:02'],
    [2, 'account', 'abc', '财务部', '管理员', '2023-02-12 18:29:02'],
    [3, 'account', 'abc', '总裁部', '员工', '2023-02-12 18:29:02'],
    [4, 'account', 'abc', '财务部', '员工', '2023-02-12 18:29:02'],
    [5, 'account', 'abc', '研发部', '员工', '2023-02-12 18:29:02'],
    [6, 'account', 'abc', '人力部', '经理', '2023-02-12 18:29:02'],
    [7, 'account', 'abc', '人力部', '经理', '2023-02-12 18:29:02'],
    [8, 'account', 'abc', '人力部', '经理', '2023-02-12 18:29:02'],
    [9, 'account', 'abc', '人力部', '经理', '2023-02-12 18:29:02'],
    [10, 'account', 'abc', '人力部', '经理', '2023-02-12 18:29:02']
  ]
  raw.map((row, i) => {
    row[0] = pageSize * (pageNo - 1) + i + 1
    row[1] += row[0]
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
