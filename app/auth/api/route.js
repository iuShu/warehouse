import {NextResponse} from "next/server";

export async function POST(req) {
  const body = await req.json()
  console.log('post', body)
  const state = {
    status: 200,
    headers: {'content-type': 'application/json'}
  }
  const result = {
    success: true,
    msg: '',
    user: {
      username: body['username'],
      password: 'admin@pwd',
      email: 'admin001@mail.com'
    }
  }
  const res = new NextResponse(JSON.stringify(result), state)
  res.cookies.set({
    name: process.env.COOKIE_KEY,
    value: "WH_FAKE_TOKEN_abc123",
    path: "/",
    maxAge: parseInt(process.env.COOKIE_MAX_AGE)
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