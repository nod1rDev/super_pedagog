"use client";

import { motion } from "framer-motion";
import {
  File,
  Download,
  Eye,
  Calendar,
  Users,
  Search,
} from "lucide-react";
import { useMemo, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

import { useMethodologies } from "@/hooks/use-methodologies";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export default function MetodikaPage() {
  const { methodologies, isLoading } = useMethodologies();
  const [searchQuery, setSearchQuery] = useState("");

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("uz-UZ", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleViewFile = (fileUrl: string) => {
    window.open(fileUrl, "_blank");
  };

  /* Search filter */
  const filteredMethodologies = useMemo(() => {
    return methodologies.filter((m: any) =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.author?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [methodologies, searchQuery]);

  const totalViews = filteredMethodologies.reduce(
    (acc: number, m: any) => acc + (m.views || 0),
    0
  );

  const totalDownloads = filteredMethodologies.reduce(
    (acc: number, m: any) => acc + (m.downloads || 0),
    0
  );

  return (
    <motion.div
      className="min-h-screen pb-24 bg-background p-4 space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Metodik qo‘llanmalar
        </h1>
        <p className="text-muted-foreground">
          Zamonaviy pedagogik metodika va ishlanmalar
        </p>
      </div>

      {/* Search */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Metodika nomi, tavsifi yoki muallif bo‘yicha qidiring..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="text-center">
          <CardContent className="p-3">
            <File className="h-6 w-6 text-primary mx-auto mb-1" />
            <p className="text-lg font-bold">
              {filteredMethodologies.length}
            </p>
            <p className="text-xs text-muted-foreground">
              Jami metodikalar
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-3">
            <Eye className="h-6 w-6 text-primary mx-auto mb-1" />
            <p className="text-lg font-bold">{totalViews}</p>
            <p className="text-xs text-muted-foreground">
              Ko‘rilgan
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-3">
            <Download className="h-6 w-6 text-primary mx-auto mb-1" />
            <p className="text-lg font-bold">
              {totalDownloads}
            </p>
            <p className="text-xs text-muted-foreground">
              Yuklab olingan
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Metodikalar ro‘yxati */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Yuklanmoqda...</p>
          </div>
        ) : filteredMethodologies.length === 0 ? (
          <Card className="text-center p-8">
            <File className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Metodikalar topilmadi
            </h3>
            <p className="text-muted-foreground">
              Qidiruv bo‘yicha natija yo‘q
            </p>
          </Card>
        ) : (
          filteredMethodologies.map((metodika: any) => (
            <Card
              key={metodika.id}
              className="overflow-hidden hover:shadow-lg transition-all duration-200"
            >
              <CardContent className="p-4">
                <div className="flex flex-col space-y-4">
                  <div>
                    {metodika.category && (
                      <Badge variant="secondary" className="mb-2">
                        {metodika.category}
                      </Badge>
                    )}
                    <h3 className="font-semibold text-lg">
                      {metodika.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {metodika.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(metodika.created_at)}
                    </div>
                    <div className="flex items-center gap-1">
                      <File className="h-4 w-4" />
                      DOCX
                    </div>
                    {metodika.author && (
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {metodika.author}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {metodika.views || 0}
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        {metodika.downloads || 0}
                      </div>
                    </div>

                    <Button
                      onClick={() =>
                        handleViewFile(metodika.file_url)
                      }
                      className="gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      Ko‘rish
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </motion.div>
  );
}
