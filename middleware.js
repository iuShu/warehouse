import {NextResponse} from "next/server";

const ipCounter = {}

export function middleware(req) {
  // ratelimit(req)

  const pathname = req.nextUrl.pathname
  const token = req.cookies.get(process.env.COOKIE_KEY)?.value
  console.log(process.env.COOKIE_KEY, token)
  if (!token || token !== 'WH_FAKE_TOKEN_abc123') {
    if (!pathname.startsWith('/auth')) {
      console.log('to auth')
      return NextResponse.redirect(new URL("/auth", req.url))
    }
  }
  else if (pathname === '/' || pathname === '/auth' || is_login_req(req)) {
    console.log('to admin')
    return NextResponse.redirect(new URL("/admin", req.url))
  }
}

export const config = {
  matcher: ["/", "/auth/:path*", "/admin/:path*"]
}

const is_login_req = (req) => {
  return req.method === 'POST' && req.nextUrl.pathname === '/auth/api'
}

const ratelimit = (req) => {
  const ip = req.headers.get('x-forwarded-for')
  let c = ipCounter[ip]
  if (!c)
    c = 1
  else
    c += 1
  ipCounter[ip] = c
  console.log(ipCounter[ip])
}
