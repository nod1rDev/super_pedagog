"use client";

import type React from "react";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

import { Loader2, Upload, X } from "lucide-react";
import { API_BASE_URL, BASE_URL } from "@/lib/BASE_URL";

/* ===================== TYPES ===================== */

interface UserData {
  id: number;
  username: string;
  fio: string;
  image: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  is_admin: boolean;
  bio: string;
}

interface ProfileEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserData;
  onUpdate: (user: UserData) => void;
}

/* ===================== COMPONENT ===================== */

export function ProfileEditModal({
  open,
  onOpenChange,
  user,
  onUpdate,
}: ProfileEditModalProps) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: user.username,
    fio: user.fio,
    bio: user.bio,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    user.image ? `${BASE_URL + "/file/download?filename="}${user.image}` : null
  );

  const { toast } = useToast();

  /* ===================== IMAGE ===================== */

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  /* ===================== SUBMIT ===================== */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("username", formData.username);
      formDataToSend.append("fio", formData.fio);
      formDataToSend.append("bio", formData.bio);

      if (imageFile) {
        formDataToSend.append("file", imageFile);
      }

      const response = await fetch(`${BASE_URL}/auth/profile/${user.id}`, {
        method: "PUT",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Profilni yangilashda xatolik");
      }

      const data = await response.json();

      const updatedUser: UserData = {
        ...user,
        ...data,
      };

      onUpdate(updatedUser);

      toast({
        title: "Muvaffaqiyatli",
        description: "Profil ma'lumotlari yangilandi",
      });

      onOpenChange(false);
    } catch (error) {
      console.error("Profile update error:", error);
      toast({
        title: "Xatolik",
        description: "Profilni yangilashda xatolik yuz berdi",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  /* ===================== RENDER ===================== */

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Profilni tahrirlash</DialogTitle>
          <DialogDescription>
            Profil ma'lumotlaringizni o‘zgartiring
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-5 py-4">
            {/* ================= IMAGE UPLOAD ================= */}
            <div className="space-y-2">
              <Label>Profil rasmi</Label>

              <div className="flex items-center gap-5">
                <div className="relative group w-24 h-24">
                  <div className="w-24 h-24 rounded-full overflow-hidden border bg-muted flex items-center justify-center">
                    {imagePreview ? (
                      <img
                        src={`${imagePreview}`}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Upload className="h-8 w-8 text-muted-foreground" />
                    )}
                  </div>

                  <label
                    htmlFor="image-upload"
                    className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition"
                  >
                    <span className="text-xs text-white font-medium">
                      Rasm tanlash
                    </span>
                  </label>

                  {imagePreview && (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 shadow"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>

                <div className="flex-1">
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <p className="text-sm text-muted-foreground">
                    JPG, PNG yoki GIF
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Maksimal hajm: 5MB
                  </p>
                </div>
              </div>
            </div>

            {/* ================= USERNAME ================= */}
            <div className="space-y-2">
              <Label htmlFor="username">Foydalanuvchi nomi</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                required
              />
            </div>

            {/* ================= FIO ================= */}
            <div className="space-y-2">
              <Label htmlFor="fio">F.I.O.</Label>
              <Input
                id="fio"
                value={formData.fio}
                onChange={(e) =>
                  setFormData({ ...formData, fio: e.target.value })
                }
                required
              />
            </div>

            {/* ================= BIO ================= */}
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
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
  );
}
