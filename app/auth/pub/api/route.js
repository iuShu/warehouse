import {NextResponse} from "next/server";
import {fetchServer} from "../../../../components/fetch";

export async function GET(req) {
  const data = await fetchServer(process.env.Server + '/pub')
  return NextResponse.json(data)
}