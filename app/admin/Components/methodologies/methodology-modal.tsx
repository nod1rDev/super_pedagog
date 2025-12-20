"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createMethodology, updateMethodology } from "@/lib/api/methodologies"
import type { Methodology } from "@/lib/api/methodologies"

interface MethodologyModalProps {
  open: boolean
  onClose: () => void
  methodology: Methodology | null
}

export function MethodologyModal({ open, onClose, methodology }: MethodologyModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    date: "",
    category: "",
  })
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (methodology) {
      setFormData({
        title: methodology.title,
        author: methodology.author,
        description: methodology.description,
        date: methodology.date,
        category: methodology.category,
      })
    } else {
      setFormData({
        title: "",
        author: "",
        description: "",
        date: "",
        category: "",
      })
      setFile(null)
    }
  }, [methodology, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (methodology) {
        await updateMethodology(methodology.id, formData, file)
      } else {
        await createMethodology(formData, file)
      }
      onClose()
    } catch (error) {
      console.error("Error saving methodology:", error)
      alert("Xatolik yuz berdi")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{methodology ? "Metodikani tahrirlash" : "Yangi metodika"}</DialogTitle>
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
            <Label htmlFor="author">Muallif *</Label>
            <Input
              id="author"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
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
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="date">Sana *</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Kategoriya *</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="file">Fayl (PDF/Word) {!methodology && "*"}</Label>
            <Input
              id="file"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              required={!methodology}
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
