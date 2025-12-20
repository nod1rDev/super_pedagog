"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Lock, User, LogIn, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

import { ThemeToggle } from "@/components/theme-toggle";
import { loginUser } from "@/lib/auth/auth-service";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      toast({
        variant: "destructive",
        title: "Xatolik",
        description: "Barcha maydonlarni to'ldiring",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await loginUser(formData.username, formData.password);

      if (response.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        toast({
          title: "Muvaffaqiyatli",
          description: "Tizimga muvaffaqiyatli kirdingiz",
        });
        console.log(response);
        if (response.data.user.isAdmin) {
          router.push("/admin");
        } else {
          router.push("/home");
          
        }
      } else {
        toast({
          variant: "destructive",
          title: "Xatolik",
          description: response.error || "Login yoki parol noto'g'ri",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Xatolik",
        description: "Serverda xatolik yuz berdi",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-primary/5">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4 animate-pulse-soft">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance">
              Xush kelibsiz
            </h1>
            <p className="text-muted-foreground text-pretty">
              Davom etish uchun hisobingizga kiring
            </p>
          </div>

          <Card className="border-border/50 shadow-xl backdrop-blur-sm bg-card/95">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <LogIn className="h-5 w-5 text-primary" />
                Tizimga kirish
              </CardTitle>
              <CardDescription className="text-sm">
                Ma'lumotlaringizni kiriting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium">
                    Foydalanuvchi nomi
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="Username"
                      className="pl-11 h-12 text-base"
                      value={formData.username}
                      onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                      }
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
                      placeholder="••••••••"
                      className="pl-11 pr-12 h-12 text-base"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      disabled={isLoading}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors min-h-11 min-w-11 flex items-center justify-center"
                      disabled={isLoading}
                      aria-label={
                        showPassword
                          ? "Parolni yashirish"
                          : "Parolni ko'rsatish"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
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
                      <LogIn className="mr-2 h-5 w-5" />
                      Kirish
                    </>
                  )}
                </Button>

                <div className="text-center pt-2">
                  <p className="text-sm text-muted-foreground">
                    Hisobingiz yo'qmi?{" "}
                    <Link
                      href="/register"
                      className="font-semibold text-primary hover:underline underline-offset-4 transition-all"
                    >
                      Ro'yxatdan o'tish
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground">
            Xavfsiz va ishonchli platforma
          </p>
        </div>
      </div>
    </div>
  );
}
