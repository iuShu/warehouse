import {NextResponse} from "next/server";

export async function POST(req) {
  const state = {
    status: 200,
    headers: {'content-type': 'application/json'}
  }
  const res = new NextResponse(JSON.stringify({success: true, msg: ''}), state)
  res.cookies.set({
    name: process.env.COOKIE_KEY,
    value: "WH_FAKE_TOKEN_abc123",
    path: "/",
    maxAge: 10
  })
  return res
}

export async function DELETE(req) {
  const state = {
    status: 200,
    headers: {'content-type': 'application/json'}
  }
  const res = new NextResponse(JSON.stringify({success: true, msg: ''}), state)
  res.cookies.delete(process.env.COOKIE_KEY)
  return res
}