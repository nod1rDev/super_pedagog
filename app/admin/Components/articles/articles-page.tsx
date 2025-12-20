"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { ArticlesList } from "./articles-list"
import { ArticleModal } from "./article-modal"
import { deleteArticle } from "@/lib/api/articles"
import type { Article } from "@/lib/api/articles"
import { useArticles } from "@/hooks/use-articles"
import { useState } from "react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export function ArticlesPage() {
  const { articles, articlesMeta, isLoading, refetch, currentPage, setPage } = useArticles()
  const [modalOpen, setModalOpen] = useState(false)
  const [editingArticle, setEditingArticle] = useState<Article | null>(null)

  const handleEdit = (article: Article) => {
    setEditingArticle(article)
    setModalOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (confirm("Maqolani o'chirmoqchimisiz?")) {
      try {
        await deleteArticle(String(id))
        refetch()
      } catch (error) {
        console.error("Error deleting article:", error)
      }
    }
  }

  const handleModalClose = () => {
    setModalOpen(false)
    setEditingArticle(null)
    refetch()
  }

  return (
    <div className="container mx-auto p-4 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold lg:text-3xl">Maqolalar</h1>
        <Button onClick={() => setModalOpen(true)} size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Yangi</span>
        </Button>
      </div>

      <ArticlesList articles={articles} isLoading={isLoading} onEdit={handleEdit} onDelete={handleDelete} />

      {articlesMeta && articlesMeta.total_pages > 1 && (
        <div className="mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => currentPage > 1 && setPage(currentPage - 1)}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>

              {Array.from({ length: articlesMeta.total_pages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page} className="hidden sm:block">
                  <PaginationLink onClick={() => setPage(page)} isActive={currentPage === page}>
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem className="sm:hidden">
                <span className="px-4 text-sm">
                  {currentPage} / {articlesMeta.total_pages}
                </span>
              </PaginationItem>

              <PaginationItem>
                <PaginationNext
                  onClick={() => currentPage < articlesMeta.total_pages && setPage(currentPage + 1)}
                  className={currentPage === articlesMeta.total_pages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      <ArticleModal open={modalOpen} onClose={handleModalClose} article={editingArticle} />
    </div>
  )
}
