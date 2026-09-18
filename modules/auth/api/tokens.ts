import { cookies } from "next/headers"

export const ACCESS_TOKEN_COOKIE = "access_token"
export const REFRESH_TOKEN_COOKIE = "refresh_token"

const ACCESS_TOKEN_MAX_AGE = 9 * 60
const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60

const baseCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
}

export const setAccessToken = async (token: string) => {
    (await cookies()).set(ACCESS_TOKEN_COOKIE, token, {
        ...baseCookieOptions,
        maxAge: ACCESS_TOKEN_MAX_AGE,
    })
}

export const setRefreshToken = async (token: string) => {
    (await cookies()).set(REFRESH_TOKEN_COOKIE, token, {
        ...baseCookieOptions,
        maxAge: REFRESH_TOKEN_MAX_AGE,
    })
}