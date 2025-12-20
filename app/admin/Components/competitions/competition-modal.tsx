"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createCompetition, updateCompetition } from "@/lib/api/competitions"
import type { Competition } from "@/lib/api/competitions"
import { X } from "lucide-react"

interface CompetitionModalProps {
  open: boolean
  onClose: () => void
  competition: Competition | null
}

export function CompetitionModal({ open, onClose, competition }: CompetitionModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    topics: [] as string[],
    prize: "",
    deadline: "",
    participants: 0,
    difficulty: "",
  })
  const [topicInput, setTopicInput] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (competition) {
      setFormData({
        title: competition.title,
        description: competition.description,
        type: competition.type,
        topics: competition.topics,
        prize: competition.prize,
        deadline: competition.deadline,
        participants: competition.participants,
        difficulty: competition.difficulty,
      })
    } else {
      setFormData({
        title: "",
        description: "",
        type: "",
        topics: [],
        prize: "",
        deadline: "",
        participants: 0,
        difficulty: "",
      })
    }
    setTopicInput("")
  }, [competition, open])

  const addTopic = () => {
    if (topicInput.trim()) {
      setFormData({
        ...formData,
        topics: [...formData.topics, topicInput.trim()],
      })
      setTopicInput("")
    }
  }

  const removeTopic = (index: number) => {
    setFormData({
      ...formData,
      topics: formData.topics.filter((_, i) => i !== index),
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (competition) {
        await updateCompetition(competition.id, formData)
      } else {
        await createCompetition(formData)
      }
      onClose()
    } catch (error) {
      console.error("Error saving competition:", error)
      alert("Xatolik yuz berdi")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{competition ? "Tanlovni tahrirlash" : "Yangi tanlav"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Sarlavha *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Tavsif *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="type">Turi *</Label>
            <Input
              id="type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              required
            />
          </div>

          <div>
            <Label>Mavzular *</Label>
            <div className="flex gap-2">
              <Input
                value={topicInput}
                onChange={(e) => setTopicInput(e.target.value)}
                placeholder="Mavzu qo'shish"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addTopic()
                  }
                }}
              />
              <Button type="button" onClick={addTopic} variant="outline">
                Qo'shish
              </Button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.topics.map((topic, i) => (
                <div key={i} className="flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-sm">
                  {topic}
                  <button
                    type="button"
                    onClick={() => removeTopic(i)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="prize">Mukofot *</Label>
            <Input
              id="prize"
              value={formData.prize}
              onChange={(e) => setFormData({ ...formData, prize: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="deadline">Muddat *</Label>
            <Input
              id="deadline"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              placeholder="15 kun"
              required
            />
          </div>

          <div>
            <Label htmlFor="participants">Ishtirokchilar soni *</Label>
            <Input
              id="participants"
              type="number"
              value={formData.participants}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  participants: Number.parseInt(e.target.value) || 0,
                })
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="difficulty">Qiyinlik darajasi *</Label>
            <Input
              id="difficulty"
              value={formData.difficulty}
              onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
              required
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? "Saqlanmoqda..." : "Saqlash"}
            </Button>
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Bekor qilish
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
