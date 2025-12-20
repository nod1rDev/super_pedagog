"use client"

import { useState } from "react"
import useSWR from "swr"
import { getCompetitions } from "@/lib/api/competitions"

export function useCompetitions(initialPage = 1) {
  const [page, setPage] = useState(initialPage)

  const { data, error, isLoading, mutate } = useSWR(["competition", page], () => getCompetitions(page, 10), {
    revalidateOnFocus: false,
    keepPreviousData: true,
  })

  return {
    competitions: data?.data.data || [],
    competitionsMeta: data?.data.meta,
    isLoading,
    error,
    refetch: mutate,
    currentPage: page,
    setPage,
  }
}
