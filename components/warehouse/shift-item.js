'use client';

import {Table} from "../table";
import {SlideOver} from "../slideover";
import {useEffect, useRef, useState} from "react";
import {getAuth, postAuth} from "../fetch";
import {useNotificationContext} from "../../providers/notification";
import {useAuthContext} from "../../providers/auth";

const pageSize = 10

export function ShiftItemTable() {
  const [rowData, setRowData] = useState(Array)
  const [editRow, setEditRow] = useState({})
  const [pages, setPages] = useState({})
  const notificationContext = useNotificationContext()
  const authContext = useAuthContext()

  const loadData = body => {
    getAuth("/admin/warehouse/shift/item/api", body, authContext.loginHandler).then(data => {
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
    postAuth("/admin/warehouse/shift/item/api", body, authContext.loginHandler).then(data => {
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
    title: '产品',
    field: 'productId'
  }, {
    title: '数量',
    field: 'quantity'
  }, {
    title: '损耗',
    field: 'splitshippingCost'
  }, {
    title: '备注',
    field: 'notes',
  }]

  return (
    <>
      <Table name="warehouse" headers={headers} rows={rowData} pages={pages} pageCallback={flip} editCallback={edit} styles={styles} />
      <SlideOver title={"产品移仓编辑"} save={saveEdit} ref={slideRef} fields={headers} editRow={editRow} onInput={onInput} />
    </>
  )
}