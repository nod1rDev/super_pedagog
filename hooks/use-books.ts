"use client"

import { useState } from "react"
import useSWR from "swr"
import { getBooks } from "@/lib/api/books"

export function useBooks(initialPage = 1) {
  const [page, setPage] = useState(initialPage)

  const { data, error, isLoading, mutate } = useSWR(["book", page], () => getBooks(page, 10), {
    revalidateOnFocus: false,
    keepPreviousData: true,
  })

  return {
    books: data?.data.data || [],
    booksMeta: data?.data.meta,
    isLoading,
    error,
    refetch: mutate,
    currentPage: page,
    setPage,
  }
}
