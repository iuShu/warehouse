import {NextResponse} from "next/server";

const ipCounter = {}

export function middleware(req) {
  ratelimit(req)

  const pathname = req.nextUrl.pathname
  const token = req.cookies.get(process.env.COOKIE_KEY)?.value
  console.log(process.env.COOKIE_KEY, token)
  if (!token || token !== 'WH_FAKE_TOKEN_abc123') {
    if (!pathname.startsWith('/login'))
      return NextResponse.redirect(new URL("/login", req.url))
  }
  else if (pathname === '/' || pathname === '/login')
     return NextResponse.redirect(new URL("/admin", req.url))
}

export const config = {
  matcher: ["/", "/login/:path*", "/admin/:path*"]
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
