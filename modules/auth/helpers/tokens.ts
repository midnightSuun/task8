import { cookies } from "next/headers"
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "../consts"

const ACCESS_TOKEN_MAX_AGE = 9 * 60 // 9 min
const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60 - 60 // 7 days - 1 min

const baseCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
}

export const setTokens = async (accessToken: string, refreshToken: string) => {
    const cookieStore = await cookies()
    cookieStore.set(ACCESS_TOKEN_COOKIE, accessToken, {
        ...baseCookieOptions,
        maxAge: ACCESS_TOKEN_MAX_AGE,
    })
    cookieStore.set(REFRESH_TOKEN_COOKIE, refreshToken, {
        ...baseCookieOptions,
        maxAge: REFRESH_TOKEN_MAX_AGE,
    })
}