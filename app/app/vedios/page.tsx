"use client";

import { motion } from "framer-motion";
import { Play, Eye, Clock, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const educationalVideos = [
  {
    id: 1,
    title: "Immersiv ta'lim texnologiyalari",
    description:
      "Immersiv ta'lim texnologiyalari: virtual va kengaytirilgan haqiqat asoslari",
    videoUrl:
      "https://drive.google.com/file/d/1uW-DtI4ksU6zoFVWR-o24jaTCU-Ds2LM/view",
    duration: "2:11",
    views: 234,
    category: "Immersiv",
    publishDate: "2024-02-15",
    author: "Dilnoaza Ismatova",
  },
];

export default function VideosPage() {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("uz-UZ", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <motion.div
      className="min-h-screen pb-24 bg-background p-4 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Ta'lim videolari
          </h1>
          <p className="text-sm text-muted-foreground">
            Video darslar va master-klasslar
          </p>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {educationalVideos.map((video) => (
          <Card
            key={video.id}
            className="overflow-hidden hover:shadow-lg transition-all duration-200"
          >
            <CardContent className="p-4">
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-start">
                  <Badge variant="secondary" className="mb-2">
                    {video.category}
                  </Badge>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Eye className="h-4 w-4" />
                    {video.views}
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

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {video.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(video.publishDate)}
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full gap-2 bg-primary hover:bg-primary/90"
                  onClick={() => window.open(video.videoUrl, "_blank")}
                >
                  <Play className="h-4 w-4" />
                  Videoni ko'rish
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
