"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2, Calendar } from "lucide-react"
import type { Video } from "@/lib/api/videos"

interface VideosListProps {
  videos: Video[]
  isLoading: boolean
  onEdit: (video: Video) => void
  onDelete: (id: any) => void
}

export function VideosList({ videos, isLoading, onEdit, onDelete }: VideosListProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="h-48 animate-pulse bg-muted" />
        ))}
      </div>
    )
  }

  if (videos.length === 0) {
    return (
      <Card className="flex h-48 items-center justify-center">
        <p className="text-muted-foreground">Videolar mavjud emas</p>
      </Card>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {videos.map((video) => (
        <Card key={video.id} className="p-4">
          <div className="mb-3 flex items-start justify-between gap-2">
            <h3 className="line-clamp-2 font-semibold">{video.title}</h3>
          </div>
          <p className="mb-3 line-clamp-3 text-sm text-muted-foreground">{video.description}</p>
          <div className="mb-3 space-y-1 text-xs text-muted-foreground">
            <p>Muallif: {video.author}</p>
            <p className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {video.publish_date}
            </p>
            <p>Kategoriya: {video.category}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(video)} className="flex-1">
              <Pencil className="mr-1 h-3 w-3" />
              Tahrirlash
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(video.id)}
              className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}
