"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Upload, X } from "lucide-react"
import { API_BASE_URL, BASE_URL } from "@/lib/BASE_URL"


interface UserData {
  id: number
  username: string
  fio: string
  image: string | null
  created_at: string
  updated_at: string
  deleted_at: string | null
  is_admin: boolean
  bio: string
}

interface ProfileEditModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: UserData
  onUpdate: (user: UserData) => void
}

export function ProfileEditModal({ open, onOpenChange, user, onUpdate }: ProfileEditModalProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: user.username,
    fio: user.fio,
    bio: user.bio,
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(user.image ? `${API_BASE_URL}${user.image}` : null)
  const { toast } = useToast()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setImageFile(null)
    setImagePreview(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append("username", formData.username)
      formDataToSend.append("fio", formData.fio)
      formDataToSend.append("bio", formData.bio)

      if (imageFile) {
        formDataToSend.append("file", imageFile)
      }

      const response = await fetch(`${BASE_URL}/auth/profile/${user.id}`, {
        method: "PUT",
        body: formDataToSend,
      })

      if (!response.ok) {
        throw new Error("Profilni yangilashda xatolik")
      }

      const data = await response.json()

      const updatedUser: UserData = {
        ...user,
        ...data,
      }

      onUpdate(updatedUser)
      toast({
        title: "Muvaffaqiyatli",
        description: "Profil ma'lumotlari yangilandi",
      })
      onOpenChange(false)
    } catch (error) {
      console.error("[v0] Profile update error:", error)
      toast({
        title: "Xatolik",
        description: "Profilni yangilashda xatolik yuz berdi",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Profilni tahrirlash</DialogTitle>
          <DialogDescription>Profil ma'lumotlaringizni o'zgartiring</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            {/* Image Upload */}
            <div className="space-y-2">
              <Label>Profil rasmi</Label>
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-full bg-accent flex items-center justify-center overflow-hidden">
                  {imagePreview ? (
                    <>
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-0 right-0 p-1 bg-destructive text-destructive-foreground rounded-full"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </>
                  ) : (
                    <Upload className="h-8 w-8 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-muted-foreground mt-1">JPG, PNG yoki GIF (Maks. 5MB)</p>
                </div>
              </div>
            </div>

            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username">Foydalanuvchi nomi</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="username"
                required
              />
            </div>

            {/* FIO */}
            <div className="space-y-2">
              <Label htmlFor="fio">F.I.O.</Label>
              <Input
                id="fio"
                value={formData.fio}
                onChange={(e) => setFormData({ ...formData, fio: e.target.value })}
                placeholder="To'liq ismingiz"
                required
              />
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="O'zingiz haqingizda qisqacha ma'lumot"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              Bekor qilish
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saqlanmoqda...
                </>
              ) : (
                "Saqlash"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
