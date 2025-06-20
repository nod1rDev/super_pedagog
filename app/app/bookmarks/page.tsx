"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Download,
  Bookmark,
  Search,
  Filter,
  Star,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const books = [
  {
    id: 1,
    title: "The Great Didactic of John Amos Comenius",
    author: "M. W. Keatinge",
    category: "Didaktika ",
    pages: 300,
    rating: 4.8,
    downloads: 4500,
    isBookmarked: true,
    description:
      "Comenius bu asarda zamonaviy ta’lim tizimining asosi bo‘lgan g‘oyalarni ilgari surgan — ya’ni, hammani o‘qitish, bosqichli o‘rganish, tabiatga mos metodlar, va boshqalar.",
    pdfUrl: "/kitob1.pdf",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
};

export default function BookmarksPage() {
  const handleDownload = (pdfUrl: string) => {
    window.open(pdfUrl, "_blank");
  };

  return (
    <motion.div
      className="min-h-screen pb-24 bg-background p-4 space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={{ itemVariants }} className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Kutubxona</h1>
        <p className="text-muted-foreground">
          Pedagogik adabiyotlar va saqlangan kitoblar
        </p>
      </motion.div>

      {/* Search */}
      <motion.div variants={{ itemVariants }} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Kitob yoki muallif qidiring..."
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={{ itemVariants }}
        className="grid grid-cols-3 gap-3"
      >
        <Card className="text-center">
          <CardContent className="p-3">
            <BookOpen className="h-6 w-6 text-primary mx-auto mb-1" />
            <p className="text-lg font-bold">1</p>
            <p className="text-xs text-muted-foreground">Jami kitoblar</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-3">
            <Bookmark className="h-6 w-6 text-primary mx-auto mb-1" />
            <p className="text-lg font-bold">1</p>
            <p className="text-xs text-muted-foreground">Saqlangan</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-3">
            <Download className="h-6 w-6 text-primary mx-auto mb-1" />
            <p className="text-lg font-bold">0</p>
            <p className="text-xs text-muted-foreground">Yuklab olingan</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={{ itemVariants }}>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">Barchasi</TabsTrigger>
            <TabsTrigger value="bookmarked">Saqlangan</TabsTrigger>
            <TabsTrigger value="downloaded">Yuklab olingan</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 mt-6">
            {books.map((book, index) => (
              <motion.div
                key={book.id}
                variants={{ itemVariants }}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-200">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <img
                        src="/kitob1.jpg"
                        className="w-16 h-20 rounded-lg"
                        alt=""
                      />

                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-sm leading-tight">
                              {book.title}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              {book.author}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Bookmark
                              className={`h-4 w-4 ${
                                book.isBookmarked
                                  ? "fill-primary text-primary"
                                  : "text-muted-foreground"
                              }`}
                            />
                          </Button>
                        </div>

                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {book.category}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs">{book.rating}</span>
                          </div>
                        </div>

                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {book.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="text-xs text-muted-foreground">
                            {book.pages} sahifa • {book.downloads} yuklab olindi
                          </div>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 text-xs"
                            >
                              Ko'rish
                            </Button>
                            <Button
                              size="sm"
                              className="h-7 text-xs"
                              onClick={() => handleDownload(book.pdfUrl)}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Yuklash
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="bookmarked" className="space-y-4 mt-6">
            {books
              .filter((book) => book.isBookmarked)
              .map((book, index) => (
                <motion.div
                  key={book.id}
                  variants={{ itemVariants }}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="w-16 h-20 bg-accent rounded-lg flex items-center justify-center">
                          <BookOpen className="h-8 w-8 text-primary" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <h3 className="font-semibold text-sm">
                            {book.title}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {book.author}
                          </p>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 text-xs"
                            >
                              Ko'rish
                            </Button>
                            <Button
                              size="sm"
                              className="h-7 text-xs"
                              onClick={() => handleDownload(book.pdfUrl)}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Yuklash
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </TabsContent>

          <TabsContent value="downloaded" className="space-y-4 mt-6">
            <Card className="text-center p-8">
              <Download className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Yuklab olingan kitoblar
              </h3>
              <p className="text-muted-foreground">
                Hozircha yuklab olingan kitoblar yo'q
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}
