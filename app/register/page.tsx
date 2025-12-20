"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Lock, User, FileText, UserPlus, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { registerUser } from "@/lib/auth/auth-service"
import { ThemeToggle } from "@/components/theme-toggle"


export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    fio: "",
    password: "",
    bio: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.username || !formData.fio || !formData.password || !formData.bio) {
      toast({
        variant: "destructive",
        title: "Xatolik",
        description: "Barcha maydonlarni to'ldiring",
      })
      return
    }

    if (formData.password.length < 3) {
      toast({
        variant: "destructive",
        title: "Xatolik",
        description: "Parol kamida 3 ta belgidan iborat bo'lishi kerak",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await registerUser(formData.username, formData.fio, formData.password, formData.bio)

      if (response.success) {
        localStorage.setItem("user", JSON.stringify(response.data))

        toast({
          title: "Muvaffaqiyatli",
          description: "Ro'yxatdan o'tish muvaffaqiyatli amalga oshirildi",
        })

        toast({
          title: "Iltimos tizimga kiring",
          description: "Davom etish uchun login qiling",
        })
        router.push("/login")
      } else {
        toast({
          variant: "destructive",
          title: "Xatolik",
          description: response.error || "Ro'yxatdan o'tishda xatolik",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Xatolik",
        description: "Serverda xatolik yuz berdi",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-secondary/5">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 py-8">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary/10 mb-4 animate-pulse-soft">
              <Sparkles className="w-8 h-8 text-secondary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance">Ro'yxatdan o'tish</h1>
            <p className="text-muted-foreground text-pretty">Yangi hisob yaratish uchun ma'lumotlaringizni kiriting</p>
          </div>

          <Card className="border-border/50 shadow-xl backdrop-blur-sm bg-card/95">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-secondary" />
                Yangi hisob yaratish
              </CardTitle>
              <CardDescription className="text-sm">Hamma maydonlarni to'ldiring</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fio" className="text-sm font-medium">
                    To'liq ismingiz
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                    <Input
                      id="fio"
                      type="text"
                      placeholder="Ism Familiya"
                      className="pl-11 h-12 text-base"
                      value={formData.fio}
                      onChange={(e) => setFormData({ ...formData, fio: e.target.value })}
                      disabled={isLoading}
                      autoComplete="name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium">
                    Foydalanuvchi nomi
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="username"
                      className="pl-11 h-12 text-base"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      disabled={isLoading}
                      autoComplete="username"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Parol
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Kamida 3 ta belgi"
                      className="pl-11 pr-12 h-12 text-base"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      disabled={isLoading}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors min-h-11 min-w-11 flex items-center justify-center"
                      disabled={isLoading}
                      aria-label={showPassword ? "Parolni yashirish" : "Parolni ko'rsatish"}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-sm font-medium">
                    Bio (O'zingiz haqingizda)
                  </Label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 h-5 w-5 text-muted-foreground pointer-events-none" />
                    <Textarea
                      id="bio"
                      placeholder="Men dasturchi va texnologiya ishqiboziman..."
                      className="pl-11 min-h-[100px] text-base resize-none"
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-base font-semibold transition-transform active:scale-95"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                      Yuklanmoqda...
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-5 w-5" />
                      Ro'yxatdan o'tish
                    </>
                  )}
                </Button>

                <div className="text-center pt-2">
                  <p className="text-sm text-muted-foreground">
                    Hisobingiz bormi?{" "}
                    <Link
                      href="/login"
                      className="font-semibold text-primary hover:underline underline-offset-4 transition-all"
                    >
                      Tizimga kirish
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground">Xavfsiz va ishonchli platforma</p>
        </div>
      </div>
    </div>
  )
}
