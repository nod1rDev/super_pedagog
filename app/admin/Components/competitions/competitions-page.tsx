"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { CompetitionsList } from "./competitions-list"
import { CompetitionModal } from "./competition-modal"
import { deleteCompetition } from "@/lib/api/competitions"
import type { Competition } from "@/lib/api/competitions"
import { useCompetitions } from "@/hooks/use-competitions"
import { useState } from "react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export function CompetitionsPage() {
  const { competitions, competitionsMeta, isLoading, refetch, currentPage, setPage } = useCompetitions()
  const [modalOpen, setModalOpen] = useState(false)
  const [editingCompetition, setEditingCompetition] = useState<Competition | null>(null)

  const handleEdit = (competition: Competition) => {
    setEditingCompetition(competition)
    setModalOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (confirm("Tanlovni o'chirmoqchimisiz?")) {
      try {
        await deleteCompetition(id)
        refetch()
      } catch (error) {
        console.error("Error deleting competition:", error)
      }
    }
  }

  const handleModalClose = () => {
    setModalOpen(false)
    setEditingCompetition(null)
    refetch()
  }

  return (
    <div className="container mx-auto p-4 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold lg:text-3xl">Tanlovlar</h1>
        <Button onClick={() => setModalOpen(true)} size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Yangi</span>
        </Button>
      </div>

      <CompetitionsList competitions={competitions} isLoading={isLoading} onEdit={handleEdit} onDelete={handleDelete} />

      {competitionsMeta && competitionsMeta.total_pages > 1 && (
        <div className="mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => currentPage > 1 && setPage(currentPage - 1)}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>

              {Array.from({ length: competitionsMeta.total_pages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page} className="hidden sm:block">
                  <PaginationLink onClick={() => setPage(page)} isActive={currentPage === page}>
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem className="sm:hidden">
                <span className="px-4 text-sm">
                  {currentPage} / {competitionsMeta.total_pages}
                </span>
              </PaginationItem>

              <PaginationItem>
                <PaginationNext
                  onClick={() => currentPage < competitionsMeta.total_pages && setPage(currentPage + 1)}
                  className={currentPage === competitionsMeta.total_pages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      <CompetitionModal open={modalOpen} onClose={handleModalClose} competition={editingCompetition} />
    </div>
  )
}
