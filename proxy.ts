import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { isAuthorized } from './modules/auth'

function isPublic(route: string) {
  return ["/login", "/logout"].includes(route)
}
 
export async function proxy(request: NextRequest) {
  const isAuthorizedResult = await isAuthorized()

  const targetPage = request.nextUrl.pathname

  if (isAuthorizedResult && isPublic(targetPage) ) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  if (!isAuthorizedResult && !isPublic(targetPage) ) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};