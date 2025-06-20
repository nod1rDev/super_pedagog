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
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const pdfArticles = [
  {
    id: 1,
    title: "Kelajak o'qituvchisi",
    description:
      "Kelajak o'qituvchisi tayyorlashning pedagogik, pisixologik va ijtimoiy xususiyatlari",
    author: "Dilnoazaxon",
    publishDate: "2024-01-15",
    readTime: "12 daqiqa",
    category: "Innovatsion pedagogika",
    pdfUrl: "/xabarnoma1.pdf",
    downloads: 156,
    views: 342,
    pageCount: 4,
  },
  {
    id: 2,
    title: "Ijtimoiy-gumanitar fanlarning dolzarb muamolari",
    description:
      "Ijtimoiy-gumanitar fanlar — bu jamiyat, inson, madaniyat, til, tarix, huquq va axloq kabi sohalarni o‘rganadigan fanlar majmuasidir.",
    author: "Dilnozaxon",
    publishDate: "2024-01-20",
    readTime: "8 daqiqa",
    category: "Amaliy pedagogika",
    pdfUrl: "/xabornoma2.pdf",
    downloads: 89,
    views: 245,
    pageCount: 5,
  },
  {
    id: 3,
    title: "Maktabgacha va Maktab ta'limida ",
    description:
      "Pedagogik,psixometodologik va tabiiy fanlarga ixtsoslahgan ilmiy jurnal",
    author: "Dilnozaxon",
    publishDate: "2024-02-01",
    readTime: "15 daqiqa",
    category: "Masofaviy ta'lim",
    pdfUrl: "/xabornoma4.pdf",
    downloads: 234,
    views: 567,
    pageCount: 18,
  },
];

export default function ArticlesPage() {
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
            Ilmiy maqolalar
          </h1>
          <p className="text-sm text-muted-foreground">
            Pedagogika sohasidagi so'nggi tadqiqotlar
          </p>
        </div>
      </div>

      {/* PDF Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pdfArticles.map((article) => (
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
                  {formatDate(article.publishDate)}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {article.readTime}
                </div>
                <div className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  {article.pageCount} bet
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {article.views}
                  </div>
                  <div className="flex items-center gap-1">
                    <FileDown className="h-4 w-4" />
                    {article.downloads}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Dialog>
                    <DialogContent className="max-w-4xl h-[80vh]">
                      <iframe
                        src={article.pdfUrl}
                        className="w-full h-full"
                        title={article.title}
                      />
                    </DialogContent>
                  </Dialog>

                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => window.open(article.pdfUrl, "_blank")}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Yuklash
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
