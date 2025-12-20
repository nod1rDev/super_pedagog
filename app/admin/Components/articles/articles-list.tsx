"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2, BookOpen, Clock, User } from "lucide-react"
import type { Article } from "@/lib/api/articles"

interface ArticlesListProps {
  articles: Article[]
  isLoading: boolean
  onEdit: (article: Article) => void
  onDelete: (id: any) => void
}

export function ArticlesList({ articles, isLoading, onEdit, onDelete }: ArticlesListProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="h-64 animate-pulse bg-muted/50" />
        ))}
      </div>
    )
  }

  if (articles.length === 0) {
    return (
      <Card className="flex h-64 flex-col items-center justify-center gap-3 border-dashed">
        <BookOpen className="h-12 w-12 text-muted-foreground/50" />
        <p className="text-muted-foreground">Maqolalar mavjud emas</p>
      </Card>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <Card key={article.id} className="group flex flex-col overflow-hidden transition-all hover:shadow-lg">
          <div className="flex-1 p-5">
            <div className="mb-3 flex items-start justify-between gap-2">
              <h3 className="line-clamp-2 text-lg font-semibold leading-tight">{article.title}</h3>
            </div>

            <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{article.description}</p>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <User className="h-3.5 w-3.5" />
                <span className="line-clamp-1">{article.author}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                <span>{article.read_time}</span>
              </div>
              <div className="mt-3">
                <Badge variant="secondary" className="text-xs">
                  {article.category}
                </Badge>
              </div>
            </div>
          </div>

          <div className="border-t bg-muted/30 p-3">
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(article)}
                className="flex-1 gap-2 hover:bg-background"
              >
                <Pencil className="h-3.5 w-3.5" />
                Tahrirlash
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(article.id)}
                className="gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
