"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { VideosList } from "./videos-list"
import { VideoModal } from "./video-modal"
import { deleteVideo } from "@/lib/api/videos"
import type { Video } from "@/lib/api/videos"
import { useVideos } from "@/hooks/use-videos"
import { useState } from "react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export function VideosPage() {
  const { videos, videosMeta, isLoading, refetch, currentPage, setPage } = useVideos()
  const [modalOpen, setModalOpen] = useState(false)
  const [editingVideo, setEditingVideo] = useState<Video | null>(null)

  const handleEdit = (video: Video) => {
    setEditingVideo(video)
    setModalOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (confirm("Videoni o'chirmoqchimisiz?")) {
      try {
        await deleteVideo(String(id))
        refetch()
      } catch (error) {
        console.error("Error deleting video:", error)
      }
    }
  }

  const handleModalClose = () => {
    setModalOpen(false)
    setEditingVideo(null)
    refetch()
  }

  return (
    <div className="container mx-auto p-4 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold lg:text-3xl">Videolar</h1>
        <Button onClick={() => setModalOpen(true)} size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Yangi</span>
        </Button>
      </div>

      <VideosList videos={videos} isLoading={isLoading} onEdit={handleEdit} onDelete={handleDelete} />

      {videosMeta && videosMeta.total_pages > 1 && (
        <div className="mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => currentPage > 1 && setPage(currentPage - 1)}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>

              {Array.from({ length: videosMeta.total_pages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page} className="hidden sm:block">
                  <PaginationLink onClick={() => setPage(page)} isActive={currentPage === page}>
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem className="sm:hidden">
                <span className="px-4 text-sm">
                  {currentPage} / {videosMeta.total_pages}
                </span>
              </PaginationItem>

              <PaginationItem>
                <PaginationNext
                  onClick={() => currentPage < videosMeta.total_pages && setPage(currentPage + 1)}
                  className={currentPage === videosMeta.total_pages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      <VideoModal open={modalOpen} onClose={handleModalClose} video={editingVideo} />
    </div>
  )
}
