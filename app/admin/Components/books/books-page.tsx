"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { BooksList } from "./books-list"
import { BookModal } from "./book-modal"
import { deleteBook } from "@/lib/api/books"
import type { Book } from "@/lib/api/books"
import { useBooks } from "@/hooks/use-books"
import { useState } from "react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export function BooksPage() {
  const { books, booksMeta, isLoading, refetch, currentPage, setPage } = useBooks()
  const [modalOpen, setModalOpen] = useState(false)
  const [editingBook, setEditingBook] = useState<Book | null>(null)

  const handleEdit = (book: Book) => {
    setEditingBook(book)
    setModalOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (confirm("Kitobni o'chirmoqchimisiz?")) {
      try {
        await deleteBook(String(id))
        refetch()
      } catch (error) {
        console.error("Error deleting book:", error)
      }
    }
  }

  const handleModalClose = () => {
    setModalOpen(false)
    setEditingBook(null)
    refetch()
  }

  return (
    <div className="container mx-auto p-4 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold lg:text-3xl">Kitoblar</h1>
        <Button onClick={() => setModalOpen(true)} size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Yangi</span>
        </Button>
      </div>

      <BooksList books={books} isLoading={isLoading} onEdit={handleEdit} onDelete={handleDelete} />

      {booksMeta && booksMeta.total_pages > 1 && (
        <div className="mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => currentPage > 1 && setPage(currentPage - 1)}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>

              {Array.from({ length: booksMeta.total_pages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page} className="hidden sm:block">
                  <PaginationLink onClick={() => setPage(page)} isActive={currentPage === page}>
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem className="sm:hidden">
                <span className="px-4 text-sm">
                  {currentPage} / {booksMeta.total_pages}
                </span>
              </PaginationItem>

              <PaginationItem>
                <PaginationNext
                  onClick={() => currentPage < booksMeta.total_pages && setPage(currentPage + 1)}
                  className={currentPage === booksMeta.total_pages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      <BookModal open={modalOpen} onClose={handleModalClose} book={editingBook} />
    </div>
  )
}
