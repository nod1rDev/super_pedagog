"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
  Trophy,
  BookOpen,
  FileText,
  Award,
  TrendingUp,
  Star,
  ChevronRight,
  ChevronLeft,
  Target,
  MessageCircle,
  Search,
  Sparkles,
  Video,
  Book,
  GraduationCap,
  Play,
  Download,
  Eye,
  Users,
  Clock,
  Flame,
  Gift,
  Medal,
  BookMarked,
  BarChart3,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useState, useEffect, useMemo } from "react"
import { Header } from "@/components/header"
import { useRouter } from "next/navigation"
import { useArticles } from "@/hooks/use-articles"
import { useBooks } from "@/hooks/use-books"
import { useCompetitions } from "@/hooks/use-competitions"
import { useMethodologies } from "@/hooks/use-methodologies"
import { useVideos } from "@/hooks/use-videos"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
}

export default function HomePage() {
  const router = useRouter()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [searchFocused, setSearchFocused] = useState(false)

  const { articlesMeta }: any = useArticles(1)

  const { books, booksMeta }: any = useBooks(1)
  const { competitions, competitionsMeta }: any = useCompetitions(1)
  const { methodologies, methodologiesMeta }: any = useMethodologies(1)
  const { videos, videosMeta }: any = useVideos(1)

  const quickStats = useMemo(
    () => [
      {
        icon: Trophy,
        label: "Tanlovlar",
        count: competitionsMeta?.count?.toString() || "0",
        color: "text-amber-500",
        bgColor: "bg-amber-500/10",
        borderColor: "border-amber-500/20",
        href: "/competitions",
      },
      {
        icon: BookOpen,
        label: "Kitoblar",
        count: booksMeta?.count?.toString() || "0",
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
        borderColor: "border-blue-500/20",
        href: "/books",
      },
      {
        icon: FileText,
        label: "Maqolalar",
        count: articlesMeta?.count?.toString() || "0",
        color: "text-purple-500",
        bgColor: "bg-purple-500/10",
        borderColor: "border-purple-500/20",
        href: "/articles",
      },
      {
        icon: Video,
        label: "Videolar",
        count: videosMeta?.count?.toString() || "0",
        color: "text-red-500",
        bgColor: "bg-red-500/10",
        borderColor: "border-red-500/20",
        href: "/videos",
      },
      {
        icon: Book,
        label: "Metodikalar",
        count: methodologiesMeta?.count?.toString() || "0",
        color: "text-green-500",
        bgColor: "bg-green-500/10",
        borderColor: "border-green-500/20",
        href: "/methodologies",
      },
    ],
    [articlesMeta?.count, booksMeta?.count, competitionsMeta?.count, methodologiesMeta?.count, videosMeta?.count],
  )

  const featuredContent = useMemo(() => {
    const featured = []

    if (competitions?.data?.[0]) {
      const comp = competitions.data[0]
      featured.push({
        type: "Tanlov",
        title: comp.title,
        description: comp.description || "Tanlovda ishtirok eting va sovrin yutib oling",
        deadline: comp.end_date ? new Date(comp.end_date).toLocaleDateString("uz-UZ") : "Muddatsiz",
        participants: comp.participants_count || 0,
        prize: comp.prize || "Ma'lum emas",
        icon: Trophy,
        gradient: "from-amber-500 via-orange-500 to-red-500",
        status: comp.status || "Faol",
        difficulty: "O'rta",
      })
    }

    if (books?.data?.[0]) {
      const book = books.data[0]
      featured.push({
        type: "Kitob",
        title: book.title,
        description: book.description || "Kitobni o'qing va bilimingizni oshiring",
        pages: book.pages || 0,
        rating: 4.8,
        downloads: book.downloads_count || 0,
        icon: BookOpen,
        gradient: "from-blue-500 via-cyan-500 to-teal-500",
        status: "Yangi",
        category: book.category || "Umumiy",
      })
    }

    if (videos?.data?.[0]) {
      const video = videos.data[0]
      featured.push({
        type: "Video",
        title: video.title,
        description: video.description || "Video darsni tomosha qiling",
        duration: video.duration || "30 daqiqa",
        views: video.views_count || 0,
        author: video.author || "Noma'lum",
        icon: Video,
        gradient: "from-purple-500 via-pink-500 to-rose-500",
        status: "Mashhur",
        quality: "HD",
      })
    }

    if (methodologies?.data?.[0]) {
      const method = methodologies.data[0]
      featured.push({
        type: "Metodika",
        title: method.title,
        description: method.description || "Zamonaviy metodikalarni o'rganing",
        pages: method.pages || 0,
        downloads: method.downloads_count || 0,
        rating: 4.9,
        icon: Book,
        gradient: "from-green-500 via-emerald-500 to-teal-500",
        status: "Tavsiya",
        level: "Boshlang'ich",
      })
    }

    return featured.length > 0
      ? featured
      : [
          {
            type: "Tanlov",
            title: "Zamonaviy Ta'lim Texnologiyalari",
            description: "Raqamli ta'lim vositalari bo'yicha maqola yozing va sovrin yutib oling",
            deadline: "12 kun qoldi",
            participants: 89,
            prize: "750,000 so'm",
            icon: Trophy,
            gradient: "from-amber-500 via-orange-500 to-red-500",
            status: "Faol",
            difficulty: "O'rta",
          },
        ]
  }, [competitions?.data, books?.data, videos?.data, methodologies?.data])

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredContent.length)
  }

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? featuredContent.length - 1 : prev - 1))
  }

  const handleStatClick = (stat: any) => {
    router.push(stat.href)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      handleNextSlide()
    }, 6000)
    return () => clearInterval(timer)
  }, [featuredContent.length])

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Header />

      <div className="px-4 pb-24 space-y-8">
        {/* Search Section */}
        <motion.section  className="pt-6">
          <div className="relative">
            <Search
              className={cn(
                "absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors",
                searchFocused ? "text-primary" : "text-muted-foreground",
              )}
            />
            <Input
              placeholder="Kitob, maqola, video qidiring..."
              className={cn(
                "pl-12 pr-4 py-4 rounded-2xl border-2 transition-all duration-200 text-base",
                searchFocused ? "border-primary shadow-lg shadow-primary/10" : "border-border",
              )}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
        </motion.section>

        {/* Quick Stats Grid */}
        <motion.section >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">Kategoriyalar</h2>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-3">
            {quickStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group cursor-pointer"
                  onClick={() => handleStatClick(stat)}
                >
                  <Card
                    className={cn(
                      "border-2 transition-all duration-200 hover:shadow-lg",
                      stat.borderColor,
                      "hover:shadow-primary/5",
                    )}
                  >
                    <CardContent className="p-4 text-center">
                      <div
                        className={cn(
                          "min-w-16 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center",
                          stat.bgColor,
                        )}
                      >
                        <Icon className={cn("h-6 w-6", stat.color)} />
                      </div>
                      <p className="font-bold text-lg text-foreground">{stat.count}</p>
                      <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* Featured Content Carousel */}
        <motion.section >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-500" />
              Tavsiya etilgan
            </h2>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" onClick={handlePrevSlide} className="h-8 w-8">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleNextSlide} className="h-8 w-8">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {(() => {
                  const content = featuredContent[currentSlide]
                  const Icon = content.icon
                  return (
                    <Card className="overflow-hidden border-0 shadow-xl">
                      <div className={cn("h-2 bg-gradient-to-r", content.gradient)} />
                      <CardContent className="p-6 bg-gradient-to-br from-card to-card/50">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={cn("p-2 rounded-xl bg-gradient-to-r", content.gradient)}>
                              <Icon className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <Badge variant="secondary" className="mb-1">
                                {content.type}
                              </Badge>
                              <Badge variant="outline" className="ml-2 text-xs">
                                {content.status}
                              </Badge>
                            </div>
                          </div>
                          {content.type === "Tanlov" && (
                            <div className="text-right">
                              <div className="flex items-center gap-1 text-amber-600 mb-1">
                                <Clock className="h-3 w-3" />
                                <span className="text-sm font-medium">{content.deadline}</span>
                              </div>
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <Users className="h-3 w-3" />
                                <span className="text-xs">{content.participants} ishtirokchi</span>
                              </div>
                            </div>
                          )}
                        </div>

                        <h3 className="text-xl font-bold mb-3 leading-tight text-foreground">{content.title}</h3>
                        <p className="text-muted-foreground mb-6 leading-relaxed">{content.description}</p>

                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            {content.type === "Tanlov" ? (
                              <div className="flex items-center gap-2">
                                <Gift className="h-4 w-4 text-amber-500" />
                                <span className="font-bold text-amber-600">{content.prize}</span>
                              </div>
                            ) : content.type === "Video" ? (
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Play className="h-3 w-3" />
                                  <span>{content.duration}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Eye className="h-3 w-3" />
                                  <span>{content.views}</span>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span>{content.pages} sahifa</span>
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                  <span>{content.rating}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Download className="h-3 w-3" />
                                  <span>{content.downloads}</span>
                                </div>
                              </div>
                            )}
                          </div>
                          <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                            {content.type === "Tanlov"
                              ? "Ishtirok etish"
                              : content.type === "Video"
                                ? "Ko'rish"
                                : "O'qish"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {featuredContent.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-200",
                  currentSlide === index ? "bg-primary w-6" : "bg-muted-foreground/30",
                )}
              />
            ))}
          </div>
        </motion.section>

        {/* Weekly Goals */}
        <motion.section >
          <Card className="bg-gradient-to-br from-muted/50 to-muted/30 border-2 border-muted">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Target className="h-5 w-5 text-primary" />
                Haftalik Maqsadlar
                <Badge variant="secondary" className="ml-auto">
                  5 kun qoldi
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                {
                  title: "Maqolalar o'qish",
                  current: 7,
                  target: 10,
                  icon: FileText,
                  color: "text-blue-500",
                  bgColor: "bg-blue-500",
                },
                {
                  title: "Video darslar",
                  current: 3,
                  target: 5,
                  icon: Video,
                  color: "text-red-500",
                  bgColor: "bg-red-500",
                },
                {
                  title: "Quiz testlari",
                  current: 8,
                  target: 12,
                  icon: Target,
                  color: "text-green-500",
                  bgColor: "bg-green-500",
                },
              ].map((goal, index) => {
                const Icon = goal.icon
                const progress = (goal.current / goal.target) * 100
                return (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn("p-2 rounded-lg", goal.color.replace("text-", "bg-").replace("500", "500/10"))}
                        >
                          <Icon className={cn("h-4 w-4", goal.color)} />
                        </div>
                        <span className="font-medium text-foreground">{goal.title}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-foreground">
                          {goal.current}/{goal.target}
                        </span>
                        <p className="text-xs text-muted-foreground">
                          {progress >= 100 ? "Bajarildi!" : `${Math.round(progress)}%`}
                        </p>
                      </div>
                    </div>
                    <div className="relative">
                      <Progress value={progress} className="h-2" />
                      {progress >= 100 && (
                        <div className="absolute -top-1 -right-1">
                          <div className="bg-green-500 rounded-full p-1">
                            <Trophy className="h-3 w-3 text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </motion.section>

        {/* Achievement Badges */}
        <motion.section >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Award className="h-5 w-5 text-amber-500" />
              Yutuqlar
            </h2>
            <Button variant="ghost" size="sm">
              Barchasi
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              {
                icon: Flame,
                title: "7 kunlik seriya",
                unlocked: true,
                color: "text-orange-500",
                bgColor: "bg-orange-500/10",
              },
              {
                icon: Medal,
                title: "Birinchi tanlov",
                unlocked: true,
                color: "text-amber-500",
                bgColor: "bg-amber-500/10",
              },
              {
                icon: BookMarked,
                title: "10 kitob",
                unlocked: false,
                color: "text-blue-500",
                bgColor: "bg-blue-500/10",
              },
              {
                icon: Star,
                title: "Top o'quvchi",
                unlocked: false,
                color: "text-purple-500",
                bgColor: "bg-purple-500/10",
              },
              {
                icon: TrendingUp,
                title: "100 ball",
                unlocked: true,
                color: "text-green-500",
                bgColor: "bg-green-500/10",
              },
              {
                icon: GraduationCap,
                title: "Mutaxassis",
                unlocked: false,
                color: "text-cyan-500",
                bgColor: "bg-cyan-500/10",
              },
            ].map((badge, index) => {
              const Icon = badge.icon
              return (
                <motion.div
                  key={badge.title}
                  whileHover={badge.unlocked ? { scale: 1.05 } : {}}
                  whileTap={badge.unlocked ? { scale: 0.95 } : {}}
                >
                  <Card
                    className={cn(
                      "border transition-all duration-200",
                      badge.unlocked ? "bg-card hover:shadow-md" : "bg-muted/30 opacity-60",
                    )}
                  >
                    <CardContent className="p-4 text-center">
                      <div
                        className={cn(
                          "w-12 h-12 rounded-2xl mx-auto mb-2 flex items-center justify-center",
                          badge.bgColor,
                        )}
                      >
                        <Icon className={cn("h-6 w-6", badge.unlocked ? badge.color : "text-muted-foreground")} />
                      </div>
                      <p className="text-xs font-medium text-foreground text-balance">{badge.title}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* Leaderboard Preview */}
        <motion.section >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Yetakchilar
            </h2>
            <Button variant="ghost" size="sm">
              To'liq ko'rish
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <Card>
            <CardContent className="p-0">
              {[
                { name: "Alisher Navoiy", points: 1250, rank: 1 },
                { name: "Abdulla Qodiriy", points: 1180, rank: 2 },
                { name: "Mirza Ulug'bek", points: 1095, rank: 3 },
                { name: "Siz", points: 890, rank: 8 },
              ].map((user, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-center justify-between p-4 border-b last:border-b-0",
                    user.name === "Siz" && "bg-primary/5",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
                        user.rank === 1 && "bg-amber-500 text-white",
                        user.rank === 2 && "bg-gray-400 text-white",
                        user.rank === 3 && "bg-orange-600 text-white",
                        user.rank > 3 && "bg-muted text-muted-foreground",
                      )}
                    >
                      {user.rank}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.points} ball</p>
                    </div>
                  </div>
                  {user.rank <= 3 && (
                    <Trophy
                      className={cn(
                        "h-5 w-5",
                        user.rank === 1 && "text-amber-500",
                        user.rank === 2 && "text-gray-400",
                        user.rank === 3 && "text-orange-600",
                      )}
                    />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.section>

        {/* Active Discussions */}
        <motion.section >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              Muhokamalar
            </h2>
            <Button variant="ghost" size="sm">
              Hammasini ko'rish
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <div className="space-y-3">
            {[
              {
                title: "Raqamli ta'limda yangiliklar",
                category: "Ta'lim",
                replies: 23,
                time: "10 daqiqa oldin",
                hot: true,
              },
              {
                title: "Metodika yozish bo'yicha maslahatlar",
                category: "Metodika",
                replies: 15,
                time: "1 soat oldin",
                hot: false,
              },
              {
                title: "Tanlov g'oliblarini e'lon qilish",
                category: "Tanlovlar",
                replies: 42,
                time: "2 soat oldin",
                hot: true,
              },
            ].map((discussion, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <MessageCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-medium text-foreground text-balance">{discussion.title}</h3>
                        {discussion.hot && <Flame className="h-4 w-4 text-orange-500 flex-shrink-0" />}
                      </div>
                      <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                        <Badge variant="secondary" className="text-xs">
                          {discussion.category}
                        </Badge>
                        <span>{discussion.replies} javob</span>
                        <span>{discussion.time}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>
      </div>
    </motion.div>
  )
}
