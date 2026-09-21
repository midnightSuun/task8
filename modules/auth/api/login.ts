"use server"

import { LoginDocument } from "@/gql/graphql"
import { getGql } from "@/lib/graphql"
import { setTokens } from "../helpers/tokens"
import { redirect } from "next/navigation"

type Params = {
    email: string
    password: string
}

export async function login({ email, password }: Params) {
    const gql = await getGql()
    const data = await gql.request(LoginDocument, { auth: { email, password } })

    await setTokens(data.login.access_token, data.login.refresh_token)

    redirect("/")
}