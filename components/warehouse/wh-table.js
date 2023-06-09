'use client';

import {Table} from "../table";
import {SlideOver} from "../slideover";
import {useEffect, useRef, useState} from "react";
import {getAuth, postAuth} from "../fetch";
import {useNotificationContext} from "../../providers/notification";
import {useAuthContext} from "../../providers/auth";

const pageSize = 10

export function WarehouseTable() {
  const [rowData, setRowData] = useState(Array)
  const [editRow, setEditRow] = useState({})
  const [pages, setPages] = useState({})
  const notificationContext = useNotificationContext()
  const authContext = useAuthContext()

  const loadData = body => {
    getAuth("/admin/warehouse/api", body, authContext.loginHandler).then(data => {
      if (data.code !== 1) {
        notificationContext.alert(data.msg || "请求数据异常")
        return
      }

      const {list, page} = data.payload
      setPages(page)
      setRowData(list)
    })
  }

  useEffect(() => {
    loadData({
      pageNo: 1,
      pageSize: pageSize
    })
  }, [])

  const flip = (pageNo) => {
    if (pageNo > pages.totalPage || pageNo < 1)
      return
    const p = Object.assign({}, pages)
    p.pageNo = pageNo
    loadData(p)
  }

  const slideRef = useRef(null)
  const edit = row => {
    setEditRow(row)
    slideRef.current?.slideIn()
  }

  const saveEdit = () => {
    const body = Object.assign({}, editRow)
    delete body.index
    postAuth("/admin/warehouse/api", body, authContext.loginHandler).then(data => {
      if (data.code !== 1) {
        notificationContext.alert(data.msg || "编辑保存失败")
        return
      }

      const updated = [...rowData]
      updated[editRow.index] = body
      setRowData(updated)

      slideRef.current?.slideOut()
      notificationContext.notify("编辑保存成功")
    })
  }

  const onInput = (key, val) => {
    const row = Object.assign({}, editRow)
    row[key] = val
    setEditRow(row)
    console.log('input', row)
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
    ele: "toggle",
    format: val => val === "1" ? "是" : ""
  }]

  return (
    <>
      <Table name="warehouse" headers={headers} rows={rowData} pages={pages} pageCallback={flip} editCallback={edit} styles={styles} />
      <SlideOver title={"仓库编辑"} save={saveEdit} ref={slideRef} fields={headers} editRow={editRow} onInput={onInput} />
    </>
  )
}