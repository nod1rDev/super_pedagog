"use client";

import { useState } from "react";
import useSWR from "swr";
import { getArticles } from "@/lib/api/articles";

export function useArticles(initialPage = 1) {
  const [page, setPage] = useState(initialPage);

  const { data, error, isLoading, mutate } = useSWR(
    ["article", page],
    () => getArticles(page, 10),
    {
      revalidateOnFocus: false,
      keepPreviousData: true,
    }
  );

  return {
    articles: data?.data.data || [],
    articlesMeta: data?.data.meta,
    isLoading,
    error,
    refetch: mutate,
    currentPage: page,
    setPage,
  };
}
