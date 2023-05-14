'use client';

import {useEffect, useState} from "react";
import {Table} from "./table";

export function DeptTable() {
  const headers = ['部门', '人员']
  const [rowData, setRowData] = useState(Array)
  const [pages, setPages] = useState({})

  useEffect(() => {
    const {rows, page} = fetchPage(1, 10)
    setPages(page)
    setRowData(rows)
  }, [])

  const flip = () => {}

  return (
    <>
      <Table name={"dept"} headers={headers} rows={rowData} pages={pages} pageCallback={flip} toolbar={false} />
    </>
  )
}

function fetchPage(pageNo, pageSize) {
  const raw = [
    [103, '总裁部', 3],
    [621, '财务部', 6],
    [15, '研发部', 43],
    [67, '人力部', 5],
    [617, '销售部', 74],
  ]
  return {
    rows: raw,
    page: {
      pageNo: pageNo,
      pageSize: pageSize,
      totalPage: 1,
      totalRow: 4
    }
  }
}
