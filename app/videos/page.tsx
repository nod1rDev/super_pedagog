"use client";

import { motion } from "framer-motion";
import {
  Play,
  Eye,
  Clock,
  Calendar,
  Search,
  Video,
} from "lucide-react";
import { useMemo, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

import { useVideos } from "@/hooks/use-videos";

export default function VideosPage() {
  const { videos, isLoading } = useVideos();
  const [searchQuery, setSearchQuery] = useState("");

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("uz-UZ", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  /* Search filter */
  const filteredVideos = useMemo(() => {
    return videos.filter((video: any) =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [videos, searchQuery]);

  /* Stats */
  const totalViews = filteredVideos.reduce(
    (acc: number, video: any) => acc + (video.views || 0),
    0
  );

  return (
    <motion.div
      className="min-h-screen pb-24 bg-background p-4 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Ta’lim videolari
        </h1>
        <p className="text-muted-foreground">
          Video darslar va master-klasslar
        </p>
      </div>

      {/* Search */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Video nomi yoki tavsifi bo‘yicha qidiring..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="text-center">
          <CardContent className="p-3">
            <Video className="h-6 w-6 text-primary mx-auto mb-1" />
            <p className="text-lg font-bold">
              {filteredVideos.length}
            </p>
            <p className="text-xs text-muted-foreground">
              Jami videolar
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-3">
            <Eye className="h-6 w-6 text-primary mx-auto mb-1" />
            <p className="text-lg font-bold">{totalViews}</p>
            <p className="text-xs text-muted-foreground">
              Ko‘rishlar
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isLoading ? (
          <div className="col-span-full text-center py-8">
            <p className="text-muted-foreground">Yuklanmoqda...</p>
          </div>
        ) : filteredVideos.length === 0 ? (
          <Card className="col-span-full text-center p-8">
            <Play className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Videolar topilmadi
            </h3>
            <p className="text-muted-foreground">
              Qidiruv bo‘yicha natija yo‘q
            </p>
          </Card>
        ) : (
          filteredVideos.map((video: any) => (
            <Card
              key={video.id}
              className="overflow-hidden hover:shadow-lg transition-all duration-200"
            >
              <CardContent className="p-4">
                <div className="flex flex-col space-y-4">
                  <div className="flex justify-between items-start">
                    {video.category && (
                      <Badge variant="secondary">
                        {video.category}
                      </Badge>
                    )}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Eye className="h-4 w-4" />
                      {video.views || 0}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2 line-clamp-2">
                      {video.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {video.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    {video.duration && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {typeof video.duration === "number"
                          ? formatDuration(video.duration)
                          : video.duration}
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(video.created_at)}
                    </div>
                  </div>

                  <Button
                    className="w-full gap-2"
                    onClick={() =>
                      window.open(video.stream_url, "_blank")
                    }
                  >
                    <Play className="h-4 w-4" />
                    Videoni ko‘rish
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </motion.div>
  );
}
