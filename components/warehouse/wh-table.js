'use client';

import {Table} from "../table";
import {SlideOver} from "../slideover";
import {useEffect, useRef, useState} from "react";
import {postAuth} from "../fetch";
import {useNotificationContext} from "../../providers/notification";
import {useAuthContext} from "../../providers/auth";

const pageSize = 10

export function WarehouseTable() {
  const [rowData, setRowData] = useState(Array)
  const [editRow, setEditRow] = useState({})
  const [pages, setPages] = useState({})
  const notificationContext = useNotificationContext()
  const authContext = useAuthContext()

  useEffect(() => {
    const page = {
      pageNo: 1,
      pageSize: pageSize
    }
    postAuth("/admin/warehouse/api", page, authContext.loginHandler).then(data => {
      if (data.code !== 1) {
        notificationContext.alert(data.msg || "请求数据异常")
        return
      }

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
    postAuth("/admin/warehouse/api", p).then(data => {
      if (data.code !== 1) {
        notificationContext.alert(data.msg || "请求数据异常")
        return
      }

      const {list, page} = data.payload
      setPages(page)
      setRowData(list)
    })
  }

  const slideRef = useRef(null)
  const edit = row => {
    setEditRow(row)
    slideRef.current?.slideIn()
  }

  const saveEdit = () => {
    const panel = slideRef.current?.panel(), data = []
    panel.querySelectorAll('input').forEach((ele, i) => {
      data.push(ele.value)
    })

    // request edit saving

    const updated = [...rowData]
    const row = Object.assign({}, editRow)
    delete row.index
    updated[editRow.index] = row
    setRowData(updated)

    slideRef.current?.slideOut()
  }

  const onInput = (key, val) => {
    const row = Object.assign({}, editRow)
    row[key] = val
    setEditRow(row)
  }

  const styles = {
    layout: 'table-fixed',
    height: `h-[444px]`
  }

  const headers = [{
    title: 'id',
    field: 'warehouseId'
  },{
    title: '仓库名称',
    field: 'name'
  }, {
    title: '所在城市',
    field: 'country'
  }, {
    title: '详细地址',
    field: 'address'
  }, {
    title: '虚拟仓',
    field: 'isVirtual',
    format: val => parseInt(val) === 1 ? "是" : ""
  }]

  return (
    <>
      <Table name="warehouse" headers={headers} rows={rowData} pages={pages} pageCallback={flip} editCallback={edit} styles={styles} />
      <SlideOver title={"仓库编辑"} save={saveEdit} ref={slideRef}>
        <div className="flex flex-col gap-4 px-4 py-4 items-start justify-start">
          {headers.filter(each => each.title !== "id").map(each => (
            <div key={"slo-" + each.field} className="w-full flex flex-col gap-2">
              <label htmlFor="username" className="block text-sm font-medium leading-6 pl-1 tracking-widest select-none">{each.title}</label>
              <input id="username" type="text" name="username" required={true}
                     value={editRow[each.field] || ""} disabled={each.editable || false} onChange={e => onInput(each.field, e.target.value)}
                     className="h-10 rounded bg-zinc-100 dark:bg-zinc-700 pl-2 tracking-wider disabled:bg-gray-50"/>
            </div>
          ))}
        </div>
      </SlideOver>
    </>
  )
}

const formatRow = (list) => {
  if (!list || list.length < 1)
    return list

  const rowData = []
  for (let each of list)
    rowData.push([each.warehouseId, each.name, each.country, each.address, each.isVirtual])
  return rowData
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
