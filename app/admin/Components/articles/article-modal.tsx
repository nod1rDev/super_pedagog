"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FileText } from "lucide-react"
import { createArticle, updateArticle } from "@/lib/api/articles"
import type { Article } from "@/lib/api/articles"

interface ArticleModalProps {
  open: boolean
  onClose: () => void
  article: Article | any
}

export function ArticleModal({ open, onClose, article }: any) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
    read_time: "",
    category: "",
  })
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (article) {
      setFormData({
        title: article.title,
        description: article.description,
        author: article.author,
        read_time: article.read_time,
        category: article.category,
      })
    } else {
      setFormData({
        title: "",
        description: "",
        author: "",
        read_time: "",
        category: "",
      })
      setFile(null)
    }
  }, [article, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (article) {
        await updateArticle(article.id, formData, file)
      } else {
        await createArticle(formData, file)
      }
      onClose()
    } catch (error) {
      console.error("Error saving article:", error)
      alert("Xatolik yuz berdi")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-xl">{article ? "Maqolani tahrirlash" : "Yangi maqola qo'shish"}</DialogTitle>
          <DialogDescription>
            {article ? "Maqola ma'lumotlarini yangilang" : "Yangi maqola uchun barcha maydonlarni to'ldiring"}
          </DialogDescription>
        </DialogHeader>

        {article && (
          <Alert>
            <FileText className="h-4 w-4" />
            <AlertDescription className="text-sm">
              <strong>Joriy fayl:</strong> {article.file_url ? "Yuklangan" : "Mavjud emas"}
              <br />
              <span className="text-xs text-muted-foreground">Yangi fayl yuklasangiz eski fayl almashtiriladi</span>
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Sarlavha <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Maqola sarlavhasi"
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
              placeholder="Maqola haqida qisqacha ma'lumot"
              required
              rows={4}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">{formData.description.length} / 500 belgi</p>
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
              <Label htmlFor="read_time" className="text-sm font-medium">
                O'qish vaqti <span className="text-destructive">*</span>
              </Label>
              <Input
                id="read_time"
                value={formData.read_time}
                onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                placeholder="12 daqiqa"
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
              placeholder="Texnologiya, Ta'lim, Fan..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="file" className="text-sm font-medium">
              Fayl {!article && <span className="text-destructive">*</span>}
            </Label>
            <Input
              id="file"
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              required={!article}
              className="cursor-pointer"
            />
            {file && <p className="text-xs text-muted-foreground">Tanlangan: {file.name}</p>}
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? "Saqlanmoqda..." : article ? "O'zgarishlarni saqlash" : "Qo'shish"}
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
