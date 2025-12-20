"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Lock,
  User,
  FileText,
  UserPlus,
  Sparkles,
  ImageIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/theme-toggle";
import { BASE_URL } from "@/lib/BASE_URL";

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    username: "",
    fio: "",
    password: "",
    bio: "",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatar(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.username ||
      !formData.fio ||
      !formData.password ||
      !formData.bio
    ) {
      toast({
        variant: "destructive",
        title: "Xatolik",
        description: "Barcha maydonlarni to‘ldiring",
      });
      return;
    }

    if (!avatar) {
      toast({
        variant: "destructive",
        title: "Xatolik",
        description: "Iltimos rasm yuklang",
      });
      return;
    }

    setIsLoading(true);

    try {
      const body = new FormData();
      body.append("username", formData.username);
      body.append("fio", formData.fio);
      body.append("password", formData.password);
      body.append("bio", formData.bio);
      body.append("file", avatar);

      const res = await fetch(BASE_URL + "/auth/register", {
        method: "POST",
        body,
      });

      const data = await res.json();
      router.push("/login");
      if (!res.ok) throw new Error(data.message);

      toast({
        title: "Muvaffaqiyatli",
        description: "Ro‘yxatdan o‘tish amalga oshdi",
      });
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Xatolik",
        description: err.message || "Server xatosi",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/10 p-4">
      <div className="fixed top-4 right-4">
        <ThemeToggle />
      </div>

      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-secondary" />
          </div>
          <CardTitle className="text-2xl">Ro‘yxatdan o‘tish</CardTitle>
          <CardDescription>Yangi hisob yarating</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Avatar */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-24 h-24 rounded-full border flex items-center justify-center overflow-hidden">
                {preview ? (
                  <img
                    src={preview}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                )}
              </div>

              <Label
                htmlFor="avatar"
                className="cursor-pointer text-sm text-primary hover:underline"
              >
                Rasm yuklash
              </Label>
              <Input
                id="avatar"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>

            {/* FIO */}
            <div className="space-y-2">
              <Label>To‘liq ism</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  className="pl-10"
                  placeholder="Ism Familiya"
                  value={formData.fio}
                  onChange={(e) =>
                    setFormData({ ...formData, fio: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label>Bio</Label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Textarea
                  className="pl-10"
                  placeholder="O‘zingiz haqingizda..."
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Username */}
            <div className="space-y-2">
              <Label>Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  className="pl-10"
                  placeholder="username"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label>Parol</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  className="pl-10 pr-10"
                  type={showPassword ? "text" : "password"}
                  placeholder="Kamida 3 ta belgi"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <Button className="w-full" disabled={isLoading}>
              <UserPlus className="mr-2 w-5 h-5" />
              Ro‘yxatdan o‘tish
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Hisobingiz bormi?{" "}
              <Link href="/login" className="text-primary font-semibold">
                Kirish
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
