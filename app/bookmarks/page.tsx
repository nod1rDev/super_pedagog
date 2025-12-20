"use client"

import { motion } from "framer-motion"
import { BookOpen, Download, Bookmark, Search, Filter, Star, Eye } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useBooks } from "@/hooks/use-books"

import { useState } from "react"
import { BASE_URL } from "@/lib/BASE_URL"

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

export default function BooksPage() {
  const { books, isLoading } = useBooks()
  const [searchQuery, setSearchQuery] = useState("")
  const [bookmarkedBooks, setBookmarkedBooks] = useState<number[]>([])

  const handleDownload = (fileUrl: string) => {
    window.open(`${fileUrl}`, "_blank")
  }

  const handleView = (fileUrl: string) => {
    window.open(`${fileUrl}`, "_blank")
  }

  const toggleBookmark = (bookId: number) => {
    setBookmarkedBooks((prev) => (prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]))
  }

  const filteredBooks = books.filter((book: any) => book.title.toLowerCase().includes(searchQuery.toLowerCase()))

  const bookmarkedList = filteredBooks.filter((book: any) => bookmarkedBooks.includes(book.id))

  return (
    <motion.div
      className="min-h-screen pb-24 bg-background p-4 space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div  className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Kutubxona</h1>
        <p className="text-muted-foreground">Pedagogik adabiyotlar va saqlangan kitoblar</p>
      </motion.div>

      {/* Search */}
      <motion.div  className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Kitob yoki muallif qidiring..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </motion.div>

      {/* Stats */}
      <motion.div  className="grid grid-cols-3 gap-3">
        <Card className="text-center">
          <CardContent className="p-3">
            <BookOpen className="h-6 w-6 text-primary mx-auto mb-1" />
            <p className="text-lg font-bold">{books.length}</p>
            <p className="text-xs text-muted-foreground">Jami kitoblar</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-3">
            <Bookmark className="h-6 w-6 text-primary mx-auto mb-1" />
            <p className="text-lg font-bold">{bookmarkedBooks.length}</p>
            <p className="text-xs text-muted-foreground">Saqlangan</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-3">
            <Download className="h-6 w-6 text-primary mx-auto mb-1" />
            <p className="text-lg font-bold">
              {books.reduce((acc: number, book: any) => acc + (book.downloads || 0), 0)}
            </p>
            <p className="text-xs text-muted-foreground">Yuklab olingan</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tabs */}
      <motion.div >
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">Barchasi</TabsTrigger>
            <TabsTrigger value="bookmarked">Saqlangan</TabsTrigger>
            <TabsTrigger value="downloaded">Yuklab olingan</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 mt-6">
            {isLoading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Yuklanmoqda...</p>
              </div>
            ) : filteredBooks.length === 0 ? (
              <Card className="text-center p-8">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Kitoblar topilmadi</h3>
                <p className="text-muted-foreground">Hozircha kitoblar mavjud emas</p>
              </Card>
            ) : (
              filteredBooks.map((book: any, index: number) => (
                <motion.div
                  key={book.id}
                  
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-200">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        {/* Cover Image */}
                        {book.cover_image ? (
                          <img
                            src={`${BASE_URL}${book.cover_image}`}
                            className="w-16 h-20 rounded-lg object-cover"
                            alt={book.title}
                          />
                        ) : (
                          <div className="w-16 h-20 bg-accent rounded-lg flex items-center justify-center">
                            <BookOpen className="h-8 w-8 text-primary" />
                          </div>
                        )}

                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-sm leading-tight">{book.title}</h3>
                              <p className="text-xs text-muted-foreground">{book.author || "Muallif ko'rsatilmagan"}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => toggleBookmark(book.id)}
                            >
                              <Bookmark
                                className={`h-4 w-4 ${
                                  bookmarkedBooks.includes(book.id)
                                    ? "fill-primary text-primary"
                                    : "text-muted-foreground"
                                }`}
                              />
                            </Button>
                          </div>

                          <div className="flex items-center gap-2">
                            {book.category && (
                              <Badge variant="secondary" className="text-xs">
                                {book.category}
                              </Badge>
                            )}
                            {book.rating && (
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-xs">{book.rating}</span>
                              </div>
                            )}
                          </div>

                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {book.description || "Tavsif mavjud emas"}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="text-xs text-muted-foreground flex items-center gap-2">
                              {book.pages && <span>{book.pages} sahifa</span>}
                              {book.views && (
                                <div className="flex items-center gap-1">
                                  <Eye className="h-3 w-3" />
                                  {book.views}
                                </div>
                              )}
                            </div>
                            <div className="flex gap-1">
                              
                              <Button size="sm" className="h-7 text-xs" onClick={() => handleDownload(book.pdf_url)}>
                                <Download className="h-3 w-3 mr-1" />
                                Yuklash
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </TabsContent>

          <TabsContent value="bookmarked" className="space-y-4 mt-6">
            {bookmarkedList.length === 0 ? (
              <Card className="text-center p-8">
                <Bookmark className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Saqlangan kitoblar</h3>
                <p className="text-muted-foreground">Hozircha saqlangan kitoblar yo'q</p>
              </Card>
            ) : (
              bookmarkedList.map((book: any, index: number) => (
                <motion.div
                  key={book.id}
                  
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-200">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        {book.cover_image ? (
                          <img
                            src={`${BASE_URL}${book.cover_image}`}
                            className="w-16 h-20 rounded-lg object-cover"
                            alt={book.title}
                          />
                        ) : (
                          <div className="w-16 h-20 bg-accent rounded-lg flex items-center justify-center">
                            <BookOpen className="h-8 w-8 text-primary" />
                          </div>
                        )}
                        <div className="flex-1 space-y-2">
                          <h3 className="font-semibold text-sm">{book.title}</h3>
                          <p className="text-xs text-muted-foreground">{book.author || "Muallif ko'rsatilmagan"}</p>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 text-xs bg-transparent"
                              onClick={() => handleView(book.file)}
                            >
                              Ko'rish
                            </Button>
                            <Button size="sm" className="h-7 text-xs" onClick={() => handleDownload(book.file)}>
                              <Download className="h-3 w-3 mr-1" />
                              Yuklash
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
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
