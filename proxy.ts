import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
 
export async function proxy(request: NextRequest) {
  const cookieStore = await cookies()
  const isAuthorized = !!cookieStore.get("access_token")

  const targetPage = request.nextUrl.pathname

  if (isAuthorized && targetPage === "/login" ) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  if (!isAuthorized && targetPage !== "/login" ) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};