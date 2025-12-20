"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createVideo, updateVideo } from "@/lib/api/videos";
import type { Video } from "@/lib/api/videos";

interface VideoModalProps {
  open: boolean;
  onClose: () => void;
  video: Video | null;
}

export function VideoModal({ open, onClose, video }: VideoModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    publish_date: "",
    author: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (video) {
      setFormData({
        title: video.title,
        description: video.description,
        category: video.category,
        publish_date: video.publish_date,
        author: video.author,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        category: "",
        publish_date: "",
        author: "",
      });
      setFile(null);
    }
  }, [video, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (video) {
        await updateVideo(video.id, formData, file);
      } else {
        await createVideo(formData, file);
      }
      onClose();
    } catch (error) {
      console.error("Error saving video:", error);
      alert("Xatolik yuz berdi");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {video ? "Videoni tahrirlash" : "Yangi video"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Sarlavha *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Tavsif *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="author">Muallif *</Label>
            <Input
              id="author"
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Kategoriya *</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="publish_date">Nashr sanasi *</Label>
            <Input
              id="publish_date"
              type="date"
              value={formData.publish_date}
              onChange={(e) =>
                setFormData({ ...formData, publish_date: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="file">
              Video fayl {!video && "*"}
            </Label>
            <Input
              id="file"
              type="file"
              accept="video/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              required={!video }
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Video yuklanishi yoki oqim URL kiritilishi kerak
            </p>
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? "Saqlanmoqda..." : "Saqlash"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Bekor qilish
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
