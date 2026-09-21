import { cookies } from "next/headers"

import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "../consts"

export async function isAuthorized() {
  const cookieStore = await cookies()
  const hasAccess = !!cookieStore.get(ACCESS_TOKEN_COOKIE)
  const hasRefresh = !!cookieStore.get(REFRESH_TOKEN_COOKIE)

  return hasAccess || hasRefresh
}
