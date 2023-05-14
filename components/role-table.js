'use client';

import {useEffect, useState} from "react";
import {Table} from "./table";

export function RoleTable() {
  const headers = ['角色', '数量', '权限']
  const [rowData, setRowData] = useState(Array)
  const [pages, setPages] = useState({})

  useEffect(() => {
    const {rows, page} = fetchPage(1, 10)
    setPages(page)
    setRowData(rows)
  }, [])

  const styles = {
    layout: "table-fixed"
  }

  const flip = () => {}

  return (
    <>
      <Table name={"role"} headers={headers} rows={rowData} pages={pages} pageCallback={flip} styles={styles} />
    </>
  )
}

function fetchPage(pageNo, pageSize) {
  const raw = [
    [2103, '系统管理员',3, "统计，仓储，店铺，商品，权限"],
    [2621, '管理', 6, "统计，仓储，店铺，商品"],
    [2215, '库管', 12, "仓储，店铺，商品"],
    [2219, '经理', 2, "店铺，商品"],
    [2240, '店员', 2, "店铺，商品"],
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
