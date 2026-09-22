"use client"

import { redirect } from "next/navigation"
import { ChangeEvent } from "react"

type Props = {
    limit: number
    search: string
}

export function SearchInput({ limit, search }: Props) {
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        redirect(`/users?page=1&limit=${limit}&search=${e.target.value}`)
    }

    return <input type="text" value={search} onChange={handleSearch} placeholder="Search" />
}