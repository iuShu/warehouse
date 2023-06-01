'use client';

import {Table} from "../table";
import {useEffect, useRef, useState} from "react";
import {SlideOver} from "../slideover";

const pageSize = 10

export function UserTable() {
  const [rowData, setRowData] = useState(Array)
  const [editRow, setEditRow] = useState({})
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
    field: 'username'
  },{
    title: '账号',
    field: 'username',
    immutable: true
  }, {
    title: '密码',
    field: 'password'
  }, {
    title: '邮箱',
    field: 'emailaddress'
  }]

  return (
    <>
      <Table name="user" headers={headers} rows={rowData} pages={pages} pageCallback={flip} editCallback={edit} styles={styles} />
      <SlideOver title={"用户编辑"} save={saveEdit} ref={slideRef} fields={headers} editRow={editRow} onInput={onInput} />
    </>
  )
}

let fakeId = 1
function fetchPage(pageNo, pageSize) {
  const raw = [
      {username: 'account1', password: 'user@password', emailaddress: 'user@mail.com'},
      {username: 'account2', password: 'user@password', emailaddress: 'user@mail.com'},
      {username: 'account3', password: 'user@password', emailaddress: 'user@mail.com'},
      {username: 'account4', password: 'user@password', emailaddress: 'user@mail.com'},
      {username: 'account5', password: 'user@password', emailaddress: 'user@mail.com'},
      {username: 'account6', password: 'user@password', emailaddress: 'user@mail.com'},
      {username: 'account7', password: 'user@password', emailaddress: 'user@mail.com'},
      {username: 'account8', password: 'user@password', emailaddress: 'user@mail.com'},
      {username: 'account9', password: 'user@password', emailaddress: 'user@mail.com'},
      {username: 'account10', password: 'user@password', emailaddress: 'user@mail.com'},
  ]
  raw.map((row, i) => {
    row.username = "account" + fakeId++
  })
  if (pageNo === 7) {
    raw.pop()
    raw.pop()
    raw.pop()
    raw.pop()
    raw.pop()
    raw.pop()
  }
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
