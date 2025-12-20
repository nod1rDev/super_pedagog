"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FileText, ImageIcon } from "lucide-react"
import { createBook, updateBook } from "@/lib/api/books"
import type { Book } from "@/lib/api/books"

interface BookModalProps {
  open: boolean
  onClose: () => void
  book: Book | any
}

export function BookModal({ open, onClose, book }: BookModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
    rating: "",
    category: "",
    is_bookmarked: false,
  })
  const [file, setFile] = useState<File | null>(null)
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        description: book.description,
        author: book.author,
        rating: book.rating,
        category: book.category,
        is_bookmarked: book.is_bookmarked,
      })
    } else {
      setFormData({
        title: "",
        description: "",
        author: "",
        rating: "",
        category: "",
        is_bookmarked: false,
      })
      setFile(null)
      setCoverImage(null)
    }
  }, [book, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (book) {
        await updateBook(book.id, formData, file, )
      } else {
        await createBook(formData, file, )
      }
      onClose()
    } catch (error) {
      console.error("Error saving book:", error)
      alert("Xatolik yuz berdi")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-xl">{book ? "Kitobni tahrirlash" : "Yangi kitob qo'shish"}</DialogTitle>
          <DialogDescription>
            {book ? "Kitob ma'lumotlarini yangilang" : "Yangi kitob uchun barcha maydonlarni to'ldiring"}
          </DialogDescription>
        </DialogHeader>

        {book && (
          <div className="space-y-2">
            <Alert>
              <FileText className="h-4 w-4" />
              <AlertDescription className="text-sm">
                <strong>Joriy PDF:</strong> {book.file_url ? "Yuklangan" : "Mavjud emas"}
              </AlertDescription>
            </Alert>
            {book.cover_image && (
              <Alert>
                <ImageIcon className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  <strong>Joriy muqova:</strong> Yuklangan
                </AlertDescription>
              </Alert>
            )}
            <p className="text-xs text-muted-foreground">Yangi fayl yuklasangiz eski fayllar almashtiriladi</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Kitob nomi <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Kitob nomini kiriting"
              required
              className="h-10"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Tavsif <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Kitob haqida qisqacha ma'lumot"
              required
              rows={4}
              className="resize-none"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="author" className="text-sm font-medium">
                Muallif <span className="text-destructive">*</span>
              </Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                placeholder="Muallif ismi"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rating" className="text-sm font-medium">
                Reyting <span className="text-destructive">*</span>
              </Label>
              <Input
                id="rating"
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                placeholder="4.5"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-medium">
              Kategoriya <span className="text-destructive">*</span>
            </Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              placeholder="Roman, Ilmiy, Tarixiy..."
              required
            />
          </div>

          <div className="flex items-center space-x-2 rounded-lg border p-3">
            <Checkbox
              id="is_bookmarked"
              checked={formData.is_bookmarked}
              onCheckedChange={(checked) => setFormData({ ...formData, is_bookmarked: checked as boolean })}
            />
            <Label htmlFor="is_bookmarked" className="cursor-pointer text-sm font-normal">
              Tanlanganlar ro'yxatiga qo'shish
            </Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="file" className="text-sm font-medium">
              PDF fayl {!book && <span className="text-destructive">*</span>}
            </Label>
            <Input
              id="file"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              required={!book}
              className="cursor-pointer"
            />
            {file && <p className="text-xs text-muted-foreground">Tanlangan: {file.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="cover" className="text-sm font-medium">
              Muqova rasmi
            </Label>
            <Input
              id="cover"
              type="file"
              accept="image/*"
              onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
              className="cursor-pointer"
            />
            {coverImage && <p className="text-xs text-muted-foreground">Tanlangan: {coverImage.name}</p>}
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? "Saqlanmoqda..." : book ? "O'zgarishlarni saqlash" : "Qo'shish"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="min-w-24 bg-transparent"
            >
              Bekor qilish
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
