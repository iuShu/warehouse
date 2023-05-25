import {NextResponse} from "next/server";
import {fetchServer} from "../../../components/fetch";

export async function POST(req) {
  const body = await req.json()
  const data = await fetchServer(process.env.Server + "/auth", "POST", body)
  const state = {
    status: 200,
    headers: {'content-type': 'application/json'}
  }
  const res = new NextResponse(JSON.stringify(data), state)
  if (data.code === 1) {
    res.cookies.set({
      name: process.env.COOKIE_KEY,
      value: data.payload?.token,
      path: "/",
      maxAge: parseInt(process.env.COOKIE_MAX_AGE)
    })
  }
  return res
}

export async function DELETE(req) {
  const state = {
    status: 200,
    headers: {'content-type': 'application/json'}
  }
  const res = new NextResponse(JSON.stringify({code: 1, msg: ''}), state)
  res.cookies.delete(process.env.COOKIE_KEY)
  return res
}