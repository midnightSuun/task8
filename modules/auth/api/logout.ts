"use server"

import { cookies } from "next/headers"
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "../consts"
import { redirect } from "next/navigation"

export async function logout() {
    const cookieStore = await cookies()
    cookieStore.delete(ACCESS_TOKEN_COOKIE)
    cookieStore.delete(REFRESH_TOKEN_COOKIE)

    redirect("/login")
}