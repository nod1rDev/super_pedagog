"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { MethodologiesList } from "./methodologies-list"
import { MethodologyModal } from "./methodology-modal"
import { deleteMethodology } from "@/lib/api/methodologies"
import type { Methodology } from "@/lib/api/methodologies"
import { useMethodologies } from "@/hooks/use-methodologies"
import { useState } from "react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export function MethodologiesPage() {
  const { methodologies, methodologiesMeta, isLoading, refetch, currentPage, setPage } = useMethodologies()
  const [modalOpen, setModalOpen] = useState(false)
  const [editingMethodology, setEditingMethodology] = useState<Methodology | null>(null)

  const handleEdit = (methodology: Methodology) => {
    setEditingMethodology(methodology)
    setModalOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (confirm("Metodikani o'chirmoqchimisiz?")) {
      try {
        await deleteMethodology(id)
        refetch()
      } catch (error) {
        console.error("Error deleting methodology:", error)
      }
    }
  }

  const handleModalClose = () => {
    setModalOpen(false)
    setEditingMethodology(null)
    refetch()
  }

  return (
    <div className="container mx-auto p-4 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold lg:text-3xl">Metodikalar</h1>
        <Button onClick={() => setModalOpen(true)} size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Yangi</span>
        </Button>
      </div>

      <MethodologiesList
        methodologies={methodologies}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {methodologiesMeta && methodologiesMeta.total_pages > 1 && (
        <div className="mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => currentPage > 1 && setPage(currentPage - 1)}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>

              {Array.from({ length: methodologiesMeta.total_pages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page} className="hidden sm:block">
                  <PaginationLink onClick={() => setPage(page)} isActive={currentPage === page}>
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem className="sm:hidden">
                <span className="px-4 text-sm">
                  {currentPage} / {methodologiesMeta.total_pages}
                </span>
              </PaginationItem>

              <PaginationItem>
                <PaginationNext
                  onClick={() => currentPage < methodologiesMeta.total_pages && setPage(currentPage + 1)}
                  className={currentPage === methodologiesMeta.total_pages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      <MethodologyModal open={modalOpen} onClose={handleModalClose} methodology={editingMethodology} />
    </div>
  )
}
