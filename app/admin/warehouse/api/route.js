import {fetchServer} from "../../../../components/fetch";
import {NextResponse} from "next/server";

export async function POST(req) {
  const body = await req.json()
  const token = req.cookies.get(process.env.COOKIE_KEY)
  const data = await fetchServer(process.env.Server + "/warehouse/list", "post", body, token)
  if (data.code === -2) {
    // refresh token and reset cookies
    console.error("require refresh login")
  }
  else {
    const state = {
      status: 200,
      headers: {'content-type': 'application/json'}
    }
    return NextResponse.json(data, state)
  }
}