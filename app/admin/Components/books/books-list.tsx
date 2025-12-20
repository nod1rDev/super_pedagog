"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2, BookOpen, Star, User, Eye } from "lucide-react"
import type { Book } from "@/lib/api/books"
import { FileViewerModal } from "../file-viewer-modal"
import { API_BASE_URL } from "@/lib/BASE_URL"



interface BooksListProps {
  books: Book[]
  isLoading: boolean
  onEdit: (book: Book) => void
  onDelete: (id: any) => void
}

export function BooksList({ books, isLoading, onEdit, onDelete }: BooksListProps) {
  const [viewerOpen, setViewerOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<{ url: string; name: string; type: string } | null>(null)

  const handleViewFile = (book: any) => {
    if (book.file_url) {
      const fileExt = book.file_url.split(".").pop()?.toLowerCase() || ""
      let fileType: "pdf" | "doc" | "docx" | "image" | "video" = "pdf"

      if (["doc", "docx"].includes(fileExt)) fileType = fileExt as "doc" | "docx"

      setSelectedFile({
        url: book.file_url,
        name: book.title,
        type: fileType,
      })
      setViewerOpen(true)
    }
  }

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="h-72 animate-pulse bg-muted/50" />
        ))}
      </div>
    )
  }

  if (books.length === 0) {
    return (
      <Card className="flex h-64 flex-col items-center justify-center gap-3 border-dashed">
        <BookOpen className="h-12 w-12 text-muted-foreground/50" />
        <p className="text-muted-foreground">Kitoblar mavjud emas</p>
      </Card>
    )
  }

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {books.map((book:any) => (
          <Card key={book.id} className="group flex flex-col overflow-hidden transition-all hover:shadow-lg">
            {book.cover_image && (
              <div className="relative h-40 overflow-hidden bg-muted">
                <img
                  src={book.cover_image.startsWith("http") ? book.cover_image : `${API_BASE_URL}${book.cover_image}`}
                  alt={book.title}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
            )}

            <div className="flex-1 p-4">
              <div className="mb-3 flex items-start justify-between gap-2">
                <h3 className="line-clamp-2 font-semibold leading-tight">{book.title}</h3>
                {book.is_bookmarked && (
                  <Badge variant="secondary" className="shrink-0 text-xs">
                    ⭐
                  </Badge>
                )}
              </div>

              <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{book.description}</p>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <User className="h-3.5 w-3.5" />
                  <span className="line-clamp-1">{book.author}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-medium">{book.rating}</span>
                </div>
                <div className="mt-2">
                  <Badge variant="outline" className="text-xs">
                    {book.category}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="border-t bg-muted/30 p-3">
              <div className="flex gap-2">
                {book.file_url && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleViewFile(book)}
                    className="flex-1 gap-2 hover:bg-background"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    Ko'rish
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(book)}
                  className="flex-1 gap-2 hover:bg-background"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Tahrirlash
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(book.id)}
                  className="gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {selectedFile && (
        <FileViewerModal
          open={viewerOpen}
          onClose={() => {
            setViewerOpen(false)
            setSelectedFile(null)
          }}
          fileUrl={selectedFile.url}
          fileName={selectedFile.name}
          fileType={selectedFile.type as "pdf" | "doc" | "docx" | "image" | "video"}
        />
      )}
    </>
  )
}
