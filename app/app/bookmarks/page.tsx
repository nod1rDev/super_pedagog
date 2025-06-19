"use client"

import { motion } from "framer-motion"
import { BookOpen, Download, Bookmark, Search, Filter, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const books = [
  {
    id: 1,
    title: "Pedagogik Psixologiya Asoslari",
    author: "Prof. A. Qodirov",
    category: "Psixologiya",
    pages: 245,
    rating: 4.8,
    downloads: 1247,
    isBookmarked: true,
    description: "Pedagogik psixologiyaning nazariy va amaliy asoslari",
  },
  {
    id: 2,
    title: "Zamonaviy Ta'lim Texnologiyalari",
    author: "Dr. M. Karimova",
    category: "Texnologiya",
    pages: 189,
    rating: 4.6,
    downloads: 892,
    isBookmarked: false,
    description: "Raqamli davrdagi ta'lim usullari va vositalari",
  },
  {
    id: 3,
    title: "Bolalar Adabiyoti va Tarbiya",
    author: "O. Nazarov",
    category: "Adabiyot",
    pages: 156,
    rating: 4.9,
    downloads: 2156,
    isBookmarked: true,
    description: "Bolalar adabiyotining tarbiyaviy ahamiyati",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

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
}

export default function BookmarksPage() {
  return (
    <motion.div
      className="min-h-screen pb-24 bg-background p-4 space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={{itemVariants}} className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Kutubxona</h1>
        <p className="text-muted-foreground">Pedagogik adabiyotlar va saqlangan kitoblar</p>
      </motion.div>

      {/* Search */}
      <motion.div variants={{itemVariants}} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Kitob yoki muallif qidiring..." className="pl-10" />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </motion.div>

      {/* Stats */}
      <motion.div variants={{itemVariants}} className="grid grid-cols-3 gap-3">
        <Card className="text-center">
          <CardContent className="p-3">
            <BookOpen className="h-6 w-6 text-primary mx-auto mb-1" />
            <p className="text-lg font-bold">156</p>
            <p className="text-xs text-muted-foreground">Jami kitoblar</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-3">
            <Bookmark className="h-6 w-6 text-primary mx-auto mb-1" />
            <p className="text-lg font-bold">23</p>
            <p className="text-xs text-muted-foreground">Saqlangan</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-3">
            <Download className="h-6 w-6 text-primary mx-auto mb-1" />
            <p className="text-lg font-bold">12</p>
            <p className="text-xs text-muted-foreground">Yuklab olingan</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={{itemVariants}}>
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
                variants={{itemVariants}}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="w-16 h-20 bg-accent rounded-lg flex items-center justify-center">
                        <BookOpen className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-sm leading-tight">{book.title}</h3>
                            <p className="text-xs text-muted-foreground">{book.author}</p>
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Bookmark
                              className={`h-4 w-4 ${
                                book.isBookmarked ? "fill-primary text-primary" : "text-muted-foreground"
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

                        <p className="text-xs text-muted-foreground line-clamp-2">{book.description}</p>

                        <div className="flex items-center justify-between">
                          <div className="text-xs text-muted-foreground">
                            {book.pages} sahifa • {book.downloads} yuklab olindi
                          </div>
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline" className="h-7 text-xs">
                              Ko'rish
                            </Button>
                            <Button size="sm" className="h-7 text-xs">
                              Yuklab olish
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
                  variants={{itemVariants}}
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
                          <h3 className="font-semibold text-sm">{book.title}</h3>
                          <p className="text-xs text-muted-foreground">{book.author}</p>
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline" className="h-7 text-xs">
                              Ko'rish
                            </Button>
                            <Button size="sm" className="h-7 text-xs">
                              Yuklab olish
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
              <h3 className="text-lg font-semibold mb-2">Yuklab olingan kitoblar</h3>
              <p className="text-muted-foreground">Hozircha yuklab olingan kitoblar yo'q</p>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  )
}
