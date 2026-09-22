"use client"

import debounce from "debounce"
import { usePathname, useRouter } from "next/navigation"
import { ChangeEvent, useEffect, useMemo, useState } from "react"

type Props = {
  limit: number
  search: string
}

const SEARCH_DEBOUNCE_MS = 500

export function SearchInput({ limit, search }: Props) {
  const path = usePathname()
  const router = useRouter()
  const [value, setValue] = useState(search)
  const [prevSearch, setPrevSearch] = useState(search)

  if (search !== prevSearch) {
    setPrevSearch(search)

    if (value === prevSearch) setValue(search)
  }

  const updateSearch = useMemo(
    () =>
      debounce((nextPath: string, nextLimit: number, nextSearch: string) => {
        const params = new URLSearchParams({
          page: "1",
          limit: String(nextLimit),
          search: nextSearch,
        })

        router.replace(`${nextPath}?${params.toString()}`)
      }, SEARCH_DEBOUNCE_MS),
    [router],
  )

  useEffect(() => {
    return () => {
      updateSearch.clear()
    }
  }, [updateSearch])

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value

    setValue(nextValue)
    updateSearch(path, limit, nextValue)
  }

  return (
    <input
      type="text"
      value={value}
      onChange={handleSearch}
      placeholder="Search"
    />
  )
}
