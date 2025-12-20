"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Download,
  Eye,
  Calendar,
  Clock,
  FileDown,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useArticles } from "@/hooks/use-articles";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { BASE_URL } from "@/lib/BASE_URL";

export default function ArticlesPage() {
  const { articles, isLoading } = useArticles();

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

  return (
    <motion.div
      className="min-h-screen pb-24 bg-background p-4 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header */}
      <div className="flex items-center justify-center mb-6">
        <div>
          <h1 className="text-2xl text-center font-bold text-foreground">
            Ilmiy maqolalar
          </h1>
          <p className="text-sm text-center text-muted-foreground">
            Pedagogika sohasidagi so'nggi tadqiqotlar
          </p>
        </div>
      </div>

      {/* PDF Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isLoading ? (
          <div className="col-span-full text-center py-8">
            <p className="text-muted-foreground">Yuklanmoqda...</p>
          </div>
        ) : articles.length === 0 ? (
          <Card className="text-center space-y-2">
            <h3 className="text-3xl font-bold text-foreground">
              Maqolalar topilmadi
            </h3>
            <p className="text-muted-foreground">
              Hozircha maqolalar mavjud emas
            </p>
          </Card>
        ) : (
          articles.map((article: any) => (
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
                          src={`${article.pdf_url}`}
                          className="w-full h-full"
                          title={article.title}
                        />
                      </DialogContent>
                    </Dialog>

                    <Button
                      variant="default"
                      size="sm"
                      onClick={() =>
                        window.open(`${article.pdf_url}`, "_blank")
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
