"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2, Calendar } from "lucide-react"
import type { Methodology } from "@/lib/api/methodologies"

interface MethodologiesListProps {
  methodologies: Methodology[]
  isLoading: boolean
  onEdit: (methodology: Methodology) => void
  onDelete: (id: any) => void
}

export function MethodologiesList({ methodologies, isLoading, onEdit, onDelete }: MethodologiesListProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="h-48 animate-pulse bg-muted" />
        ))}
      </div>
    )
  }

  if (methodologies.length === 0) {
    return (
      <Card className="flex h-48 items-center justify-center">
        <p className="text-muted-foreground">Metodikalar mavjud emas</p>
      </Card>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {methodologies.map((methodology) => (
        <Card key={methodology.id} className="p-4">
          <div className="mb-3 flex items-start justify-between gap-2">
            <h3 className="line-clamp-2 font-semibold">{methodology.title}</h3>
          </div>
          <p className="mb-3 line-clamp-3 text-sm text-muted-foreground">{methodology.description}</p>
          <div className="mb-3 space-y-1 text-xs text-muted-foreground">
            <p>Muallif: {methodology.author}</p>
            <p className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {methodology.date}
            </p>
            <p>Kategoriya: {methodology.category}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(methodology)} className="flex-1">
              <Pencil className="mr-1 h-3 w-3" />
              Tahrirlash
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(methodology.id)}
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
