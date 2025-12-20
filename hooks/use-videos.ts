"use client"

import { useState } from "react"
import useSWR from "swr"
import { getVideos } from "@/lib/api/videos"

export function useVideos(initialPage = 1) {
  const [page, setPage] = useState(initialPage)

  const { data, error, isLoading, mutate } = useSWR(["videos", page], () => getVideos(page, 10), {
    revalidateOnFocus: false,
    keepPreviousData: true,
  })

  return {
    videos: data?.data.data || [],
    videosMeta: data?.data.meta,
    isLoading,
    error,
    refetch: mutate,
    currentPage: page,
    setPage,
  }
}
