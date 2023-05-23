import {NextResponse} from "next/server";
import {fetchData} from "../../../../components/fetch";

export async function GET(req) {
  const data = await fetchData(process.env.Server + '/pub')
  return NextResponse.json(data)
}