"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2, Users, Award, Clock } from "lucide-react"
import type { Competition } from "@/lib/api/competitions"

interface CompetitionsListProps {
  competitions: Competition[]
  isLoading: boolean
  onEdit: (competition: Competition) => void
  onDelete: (id: any) => void
}

export function CompetitionsList({ competitions, isLoading, onEdit, onDelete }: CompetitionsListProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="h-64 animate-pulse bg-muted" />
        ))}
      </div>
    )
  }

  if (competitions.length === 0) {
    return (
      <Card className="flex h-48 items-center justify-center">
        <p className="text-muted-foreground">Tanlovlar mavjud emas</p>
      </Card>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {competitions.map((competition) => (
        <Card key={competition.id} className="p-4">
          <div className="mb-3 flex items-start justify-between gap-2">
            <h3 className="line-clamp-2 font-semibold">{competition.title}</h3>
          </div>
          <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">{competition.description}</p>
          <div className="mb-3 space-y-2">
            <Badge variant="secondary">{competition.type}</Badge>
            <div className="flex flex-wrap gap-1">
              {competition.topics.map((topic, i) => (
                <Badge key={i} variant="outline" className="text-xs">
                  {topic}
                </Badge>
              ))}
            </div>
          </div>
          <div className="mb-3 space-y-1 text-xs text-muted-foreground">
            <p className="flex items-center gap-1">
              <Award className="h-3 w-3" />
              {competition.prize}
            </p>
            <p className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {competition.deadline}
            </p>
            <p className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {competition.participants} ishtirokchi
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(competition)} className="flex-1">
              <Pencil className="mr-1 h-3 w-3" />
              Tahrirlash
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(competition.id)}
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
