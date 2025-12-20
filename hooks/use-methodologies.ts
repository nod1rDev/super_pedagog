"use client"

import { useState } from "react"
import useSWR from "swr"
import { getMethodologies } from "@/lib/api/methodologies"

export function useMethodologies(initialPage = 1) {
  const [page, setPage] = useState(initialPage)

  const { data, error, isLoading, mutate } = useSWR(["methodologies", page], () => getMethodologies(page, 10), {
    revalidateOnFocus: false,
    keepPreviousData: true,
  })

  return {
    methodologies: data?.data.data || [],
    methodologiesMeta: data?.data.meta,
    isLoading,
    error,
    refetch: mutate,
    currentPage: page,
    setPage,
  }
}
