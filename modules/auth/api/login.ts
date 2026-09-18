"use server"

import { LoginDocument } from "@/gql/graphql"
import { getGql } from "@/lib/graphql"
import { setAccessToken, setRefreshToken } from "./tokens"

type Params = {
    email: string
    password: string
}

export async function login({ email, password }: Params) {
    const gql = await getGql()
    const data = await gql.request(LoginDocument, { auth: { email, password } })

    await setAccessToken(data.login.access_token)
    await setRefreshToken(data.login.refresh_token)
}