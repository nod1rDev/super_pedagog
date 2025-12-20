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
import { useToast } from "@/hooks/use-toast"
import { Loader2, Eye, EyeOff } from "lucide-react"
import { BASE_URL } from "@/lib/BASE_URL"


interface SecurityModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  userId: number
}

export function SecurityModal({ open, onOpenChange, userId }: SecurityModalProps) {
  const [loading, setLoading] = useState(false)
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  })
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.new_password !== formData.confirm_password) {
      toast({
        title: "Xatolik",
        description: "Yangi parollar mos kelmadi",
        variant: "destructive",
      })
      return
    }

    if (formData.new_password.length < 6) {
      toast({
        title: "Xatolik",
        description: "Parol kamida 6 belgidan iborat bo'lishi kerak",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const response = await fetch(`${BASE_URL}/auth/password/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          old_password: formData.old_password,
          new_password: formData.new_password,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Parolni yangilashda xatolik")
      }

      toast({
        title: "Muvaffaqiyatli",
        description: "Parol muvaffaqiyatli yangilandi",
      })

      setFormData({
        old_password: "",
        new_password: "",
        confirm_password: "",
      })
      onOpenChange(false)
    } catch (error: any) {
      console.error("[v0] Password update error:", error)
      toast({
        title: "Xatolik",
        description: error.message || "Parolni yangilashda xatolik yuz berdi",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Xavfsizlik sozlamalari</DialogTitle>
          <DialogDescription>Parolingizni yangilang</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            {/* Old Password */}
            <div className="space-y-2">
              <Label htmlFor="old_password">Joriy parol</Label>
              <div className="relative">
                <Input
                  id="old_password"
                  type={showOldPassword ? "text" : "password"}
                  value={formData.old_password}
                  onChange={(e) => setFormData({ ...formData, old_password: e.target.value })}
                  placeholder="Joriy parolingizni kiriting"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showOldPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="new_password">Yangi parol</Label>
              <div className="relative">
                <Input
                  id="new_password"
                  type={showNewPassword ? "text" : "password"}
                  value={formData.new_password}
                  onChange={(e) => setFormData({ ...formData, new_password: e.target.value })}
                  placeholder="Yangi parolni kiriting"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirm_password">Parolni tasdiqlang</Label>
              <div className="relative">
                <Input
                  id="confirm_password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirm_password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirm_password: e.target.value,
                    })
                  }
                  placeholder="Yangi parolni qayta kiriting"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="bg-muted p-3 rounded-lg">
              <p className="text-xs text-muted-foreground">Parol kamida 6 belgidan iborat bo'lishi kerak</p>
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
                "Parolni yangilash"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
