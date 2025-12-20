"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Download,
  Eye,
  Calendar,
  Clock,
  FileDown,
  Search,
} from "lucide-react";
import { useMemo, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import { useArticles } from "@/hooks/use-articles";

export default function ArticlesPage() {
  const { articles, isLoading } = useArticles();
  const [searchQuery, setSearchQuery] = useState("");

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("uz-UZ", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateReadTime = (description: string) => {
    const wordsPerMinute = 200;
    const words = description.split(" ").length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} daqiqa`;
  };

  const filteredArticles = useMemo(() => {
    return articles.filter((article: any) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [articles, searchQuery]);

  const totalViews = filteredArticles.reduce(
    (acc: number, item: any) => acc + (item.views || 0),
    0
  );

  const totalDownloads = filteredArticles.reduce(
    (acc: number, item: any) => acc + (item.downloads || 0),
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
          Ilmiy maqolalar
        </h1>
        <p className="text-muted-foreground">
          Pedagogika sohasidagi so'nggi tadqiqotlar
        </p>
      </div>

      {/* Search */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Maqola nomi yoki tavsifi bo‘yicha qidiring..."
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
            <FileText className="h-6 w-6 text-primary mx-auto mb-1" />
            <p className="text-lg font-bold">
              {filteredArticles.length}
            </p>
            <p className="text-xs text-muted-foreground">
              Jami maqolalar
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

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isLoading ? (
          <div className="col-span-full text-center py-8">
            <p className="text-muted-foreground">Yuklanmoqda...</p>
          </div>
        ) : filteredArticles.length === 0 ? (
          <Card className="text-center p-6">
            <h3 className="text-xl font-bold">
              Maqolalar topilmadi
            </h3>
            <p className="text-muted-foreground">
              Qidiruv bo‘yicha natija yo‘q
            </p>
          </Card>
        ) : (
          filteredArticles.map((article: any) => (
            <Card
              key={article.id}
              className="overflow-hidden hover:shadow-lg transition-all"
            >
              <CardContent className="p-5">
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {article.description}
                </p>

                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(article.created_at)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {calculateReadTime(article.description || "")}
                  </div>
                  <div className="flex items-center gap-1">
                    <FileText className="h-4 w-4" />
                    PDF
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {article.views || 0}
                    </div>
                    <div className="flex items-center gap-1">
                      <FileDown className="h-4 w-4" />
                      {article.downloads || 0}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Dialog>
                      <DialogContent className="max-w-4xl h-[80vh]">
                        <iframe
                          src={article.pdf_url}
                          className="w-full h-full"
                          title={article.title}
                        />
                      </DialogContent>
                    </Dialog>

                    <Button
                      size="sm"
                      onClick={() =>
                        window.open(article.pdf_url)
                      }
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Yuklash
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
