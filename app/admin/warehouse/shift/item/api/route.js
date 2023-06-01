import {getServer} from "../../../../../../components/fetch";
import {NextResponse} from "next/server";

export async function GET(req) {
  const body = req.nextUrl.searchParams
  const token = req.cookies.get(process.env.COOKIE_KEY)
  const data = await getServer(process.env.Server + "/shiftItem/list", body, token.value)
  const state = {
    status: 200,
    headers: {'content-type': 'application/json'}
  }
  return NextResponse.json(data, state)
}