"use client"

import { motion } from "framer-motion"
import { FileText, Heart, MessageCircle, Share, Plus, TrendingUp, Eye } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const articles = [
  {
    id: 1,
    title: "Raqamli Ta'limda Yangi Yondashuvlar",
    excerpt: "Zamonaviy texnologiyalardan foydalanib, ta'lim samaradorligini oshirish usullari haqida...",
    author: "Dilnoza Karimova",
    authorAvatar: "https://cdn-icons-png.flaticon.com/512/9187/9187604.png",
    publishDate: "2 kun oldin",
    readTime: "5 daqiqa",
    likes: 24,
    comments: 8,
    views: 156,
    category: "Texnologiya",
    isLiked: false,
  },
  {
    id: 2,
    title: "Bolalar Psixologiyasida Zamonaviy Metodlar",
    excerpt: "Maktabgacha yoshdagi bolalar bilan ishlashda qo'llaniladigan eng samarali usullar...",
    author: "Aziz Toshmatov",
    authorAvatar: "https://cdn-icons-png.flaticon.com/512/9187/9187604.png",
    publishDate: "1 hafta oldin",
    readTime: "8 daqiqa",
    likes: 42,
    comments: 15,
    views: 289,
    category: "Psixologiya",
    isLiked: true,
  },
  {
    id: 3,
    title: "Kreativ Fikrlashni Rivojlantirish",
    excerpt: "Talabalarning ijodiy qobiliyatlarini oshirish uchun amaliy mashqlar va usullar...",
    author: "Malika Nazarova",
    authorAvatar: "https://cdn-icons-png.flaticon.com/512/9187/9187604.png",
    publishDate: "3 kun oldin",
    readTime: "6 daqiqa",
    likes: 18,
    comments: 5,
    views: 98,
    category: "Metodika",
    isLiked: false,
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

export default function ArticlesPage() {
  return (
    <motion.div
      className="min-h-screen pb-24 bg-background p-4 space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={{itemVariants}} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Maqolalar</h1>
          <p className="text-muted-foreground">Pedagogika bo'yicha eng so'nggi maqolalar</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Yozish
        </Button>
      </motion.div>

      {/* Stats */}
      <motion.div variants={{itemVariants}} className="grid grid-cols-3 gap-3">
        <Card className="text-center">
          <CardContent className="p-3">
            <FileText className="h-6 w-6 text-primary mx-auto mb-1" />
            <p className="text-lg font-bold">47</p>
            <p className="text-xs text-muted-foreground">Jami maqolalar</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-3">
            <TrendingUp className="h-6 w-6 text-primary mx-auto mb-1" />
            <p className="text-lg font-bold">12</p>
            <p className="text-xs text-muted-foreground">Mening maqolalarim</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-3">
            <Heart className="h-6 w-6 text-destructive mx-auto mb-1" />
            <p className="text-lg font-bold">156</p>
            <p className="text-xs text-muted-foreground">Jami layklar</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={{itemVariants}}>
        <Tabs defaultValue="recent" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="recent">So'nggi</TabsTrigger>
            <TabsTrigger value="popular">Mashhur</TabsTrigger>
            <TabsTrigger value="my">Mening</TabsTrigger>
          </TabsList>

          <TabsContent value="recent" className="space-y-4 mt-6">
            {articles.map((article, index) => (
              <motion.div
                key={article.id}
                variants={{itemVariants}}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 space-y-3">
                    {/* Author Info */}
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={article.authorAvatar || "/placeholder.svg"} />
                        <AvatarFallback>{article.author[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{article.author}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{article.publishDate}</span>
                          <span>•</span>
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {article.category}
                      </Badge>
                    </div>

                    {/* Article Content */}
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg leading-tight">{article.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`h-8 gap-1 ${article.isLiked ? "text-destructive" : "text-muted-foreground"}`}
                        >
                          <Heart className={`h-4 w-4 ${article.isLiked ? "fill-destructive" : ""}`} />
                          <span className="text-xs">{article.likes}</span>
                        </Button>

                        <Button variant="ghost" size="sm" className="h-8 gap-1 text-muted-foreground">
                          <MessageCircle className="h-4 w-4" />
                          <span className="text-xs">{article.comments}</span>
                        </Button>

                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Eye className="h-4 w-4" />
                          <span className="text-xs">{article.views}</span>
                        </div>
                      </div>

                      <Button variant="ghost" size="sm" className="h-8">
                        <Share className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="popular" className="space-y-4 mt-6">
            {articles
              .sort((a, b) => b.likes - a.likes)
              .map((article, index) => (
                <motion.div
                  key={article.id}
                  variants={{itemVariants}}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold">
                          {index + 1}
                        </div>
                        <h3 className="font-semibold flex-1">{article.title}</h3>
                        <div className="flex items-center gap-1 text-destructive">
                          <Heart className="h-4 w-4 fill-destructive" />
                          <span className="text-sm font-medium">{article.likes}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{article.author}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </TabsContent>

          <TabsContent value="my" className="space-y-4 mt-6">
            <Card className="text-center p-8">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Sizning maqolalaringiz</h3>
              <p className="text-muted-foreground mb-4">Hozircha maqola yozmagansiz</p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Birinchi maqolani yozing
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  )
}
