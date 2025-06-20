"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  BookOpen,
  FileText,
  Award,
  TrendingUp,
  Star,
  ChevronRight,
  ChevronLeft,
  Zap,
  Target,
  MessageCircle,
  Bell,
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
  ArrowRight,
  Flame,
  Gift,
  Medal,
  BookMarked,
  BarChart3,
  Activity,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { useRouter } from "next/navigation";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

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
};

const quickStats = [
  {
    icon: Trophy,
    label: "Tanlovlar",
    count: "4",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
    href: "/app/competitions",
  },
  {
    icon: BookOpen,
    label: "Kitoblar",
    count: "1",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    href: "/app/bookmarks",
  },
  {
    icon: FileText,
    label: "Maqolalar",
    count: "3",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    href: "/app/articles",
  },
  {
    icon: Video,
    label: "Videolar",
    count: "1",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20",
    href: "/app/vedios",
  },
  {
    icon: Book,
    label: "Metodikalar",
    count: "1",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
    href: "/app/metodeka",
  },
  {
    icon: GraduationCap,
    label: "Dissertatsiya",
    count: "0",
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
    borderColor: "border-indigo-500/20",
    href: "/app/dissertations",
  },
];

const featuredContent = [
  {
    type: "Tanlov",
    title: "Zamonaviy Ta'lim Texnologiyalari",
    description:
      "Raqamli ta'lim vositalari bo'yicha maqola yozing va sovrin yutib oling",
    deadline: "12 kun qoldi",
    participants: 89,
    prize: "750,000 so'm",
    icon: Trophy,
    gradient: "from-amber-500 via-orange-500 to-red-500",
    status: "Faol",
    difficulty: "O'rta",
  },
  {
    type: "Kitob",
    title: "Pedagogik Psixologiya Asoslari",
    description:
      "Prof. A. Qodirov tomonidan yozilgan fundamental asarni o'qing",
    pages: 245,
    rating: 4.8,
    downloads: 1247,
    icon: BookOpen,
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
    status: "Yangi",
    category: "Psixologiya",
  },
  {
    type: "Video",
    title: "Immersiv Ta'lim Texnologiyalari",
    description:
      "Virtual va kengaytirilgan reallik asosidagi ta'lim metodikasi",
    duration: "45 daqiqa",
    views: 1890,
    author: "Dr. M. Karimov",
    icon: Video,
    gradient: "from-purple-500 via-pink-500 to-rose-500",
    status: "Mashhur",
    quality: "HD",
  },
  {
    type: "Metodika",
    title: "Interfaol Ta'lim Usullari",
    description:
      "Zamonaviy pedagogik metodlar va ularning amaliy qo'llanilishi",
    pages: 180,
    downloads: 567,
    rating: 4.9,
    icon: Book,
    gradient: "from-green-500 via-emerald-500 to-teal-500",
    status: "Tavsiya",
    level: "Boshlang'ich",
  },
];

const recentActivities = [
  {
    icon: BookOpen,
    title: "Pedagogik psixologiya kitobi",
    subtitle: "3-bob o'qildi • 15 sahifa",
    time: "2 soat oldin",
    progress: 65,
    type: "reading",
  },
  {
    icon: Award,
    title: "Yangi yutuq qo'lga kiritildi",
    subtitle: "5 ta maqola o'qildi",
    time: "5 soat oldin",
    points: "+50 XP",
    type: "achievement",
  },
  {
    icon: MessageCircle,
    title: "AI Chat yordamchisi",
    subtitle: "3 ta savolga javob olindi",
    time: "6 soat oldin",
    responses: 3,
    type: "chat",
  },
  {
    icon: Video,
    title: "Video dars yakunlandi",
    subtitle: "Ta'lim psixologiyasi asoslari",
    time: "1 kun oldin",
    duration: "25 min",
    type: "video",
  },
];

const weeklyGoals = [
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
];

export default function HomePage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchFocused, setSearchFocused] = useState(false);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredContent.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? featuredContent.length - 1 : prev - 1
    );
  };

  const handleStatClick = (stat: (typeof quickStats)[0]) => {
    router.push(stat.href);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, []);

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
        <motion.section variants={{ itemVariants }} className="pt-6">
          <div className="relative">
            <Search
              className={cn(
                "absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors",
                searchFocused ? "text-primary" : "text-muted-foreground"
              )}
            />
            <Input
              placeholder="Kitob, maqola, video qidiring..."
              className={cn(
                "pl-12 pr-4 py-4 rounded-2xl border-2 transition-all duration-200 text-base",
                searchFocused
                  ? "border-primary shadow-lg shadow-primary/10"
                  : "border-border"
              )}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
        </motion.section>

        {/* Quick Stats Grid */}
        <motion.section variants={{ itemVariants }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">Kategoriyalar</h2>
            <Button variant="ghost" size="sm" className="text-primary">
              Barchasi <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {quickStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  variants={{itemVariants}}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group cursor-pointer"
                  onClick={() => handleStatClick(stat)}
                >
                  <Card
                    className={cn(
                      "border-2 transition-all duration-200 hover:shadow-lg",
                      stat.borderColor,
                      "hover:shadow-primary/5"
                    )}
                  >
                    <CardContent className="p-4 text-center">
                      <div
                        className={cn(
                          "w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center",
                          stat.bgColor
                        )}
                      >
                        <Icon className={cn("h-6 w-6", stat.color)} />
                      </div>
                      <p className="font-bold text-lg text-foreground">
                        {stat.count}
                      </p>
                      <p className="text-xs text-muted-foreground font-medium">
                        {stat.label}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Featured Content Carousel */}
        <motion.section variants={{ itemVariants }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-500" />
              Tavsiya etilgan
            </h2>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrevSlide}
                className="h-8 w-8"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNextSlide}
                className="h-8 w-8"
              >
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
                  const content = featuredContent[currentSlide];
                  const Icon = content.icon;
                  return (
                    <Card className="overflow-hidden border-0 shadow-xl">
                      <div
                        className={cn("h-2 bg-gradient-to-r", content.gradient)}
                      />
                      <CardContent className="p-6 bg-gradient-to-br from-card to-card/50">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                "p-2 rounded-xl bg-gradient-to-r",
                                content.gradient
                              )}
                            >
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
                                <span className="text-sm font-medium">
                                  {content.deadline}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <Users className="h-3 w-3" />
                                <span className="text-xs">
                                  {content.participants} ishtirokchi
                                </span>
                              </div>
                            </div>
                          )}
                        </div>

                        <h3 className="text-xl font-bold mb-3 leading-tight text-foreground">
                          {content.title}
                        </h3>
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          {content.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            {content.type === "Tanlov" ? (
                              <div className="flex items-center gap-2">
                                <Gift className="h-4 w-4 text-amber-500" />
                                <span className="font-bold text-amber-600">
                                  {content.prize}
                                </span>
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
                  );
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
                  currentSlide === index
                    ? "bg-primary w-6"
                    : "bg-muted-foreground/30"
                )}
              />
            ))}
          </div>
        </motion.section>

        {/* Weekly Goals */}
        <motion.section variants={{ itemVariants }}>
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
              {weeklyGoals.map((goal, index) => {
                const Icon = goal.icon;
                const progress = (goal.current / goal.target) * 100;
                return (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "p-2 rounded-lg",
                            goal.color
                              .replace("text-", "bg-")
                              .replace("500", "500/10")
                          )}
                        >
                          <Icon className={cn("h-4 w-4", goal.color)} />
                        </div>
                        <span className="font-medium text-foreground">
                          {goal.title}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-foreground">
                          {goal.current}/{goal.target}
                        </span>
                        <p className="text-xs text-muted-foreground">
                          {progress >= 100
                            ? "Bajarildi!"
                            : `${Math.round(progress)}%`}
                        </p>
                      </div>
                    </div>
                    <div className="relative">
                      <Progress value={progress} className="h-3" />
                      <div
                        className={cn(
                          "absolute inset-0 rounded-full opacity-20",
                          goal.bgColor
                        )}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                );
              })}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <Flame className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-medium text-foreground">
                    Streak: 7 kun
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm text-muted-foreground">
                    +250 XP kerak
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Recent Activities */}
        <motion.section variants={{ itemVariants }}>
          <Card className="border-2 border-border">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                So'nggi Faoliyat
                <Badge variant="outline" className="ml-auto">
                  Bugun
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <motion.div
                    key={index}
                    variants={{ itemVariants }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-all duration-200 cursor-pointer border border-transparent hover:border-border"
                  >
                    <div
                      className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm",
                        activity.type === "reading"
                          ? "bg-blue-500/10 text-blue-500"
                          : activity.type === "achievement"
                          ? "bg-amber-500/10 text-amber-500"
                          : activity.type === "chat"
                          ? "bg-green-500/10 text-green-500"
                          : "bg-red-500/10 text-red-500"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">
                        {activity.title}
                      </p>
                      <p className="text-sm text-muted-foreground truncate">
                        {activity.subtitle}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                      {activity.progress && (
                        <div className="flex items-center gap-1 mt-1">
                          <div className="w-8 h-1 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-500 rounded-full"
                              style={{ width: `${activity.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-blue-500">
                            {activity.progress}%
                          </span>
                        </div>
                      )}
                      {activity.points && (
                        <Badge variant="secondary" className="text-xs mt-1">
                          {activity.points}
                        </Badge>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </CardContent>
          </Card>
        </motion.section>

        {/* Monthly Book Recommendation */}
        <motion.section variants={{ itemVariants }}>
          <Card className="bg-gradient-to-br from-primary/5 via-primary/3 to-background border-2 border-primary/20">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-foreground">
                <BookMarked className="h-5 w-5 text-primary" />
                Oyning Kitobi
                <Badge className="ml-auto bg-primary/10 text-primary border-primary/20">
                  Tavsiya
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-4">
                <div className="w-20 h-24 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg">
                  <BookOpen className="h-8 w-8 text-primary-foreground" />
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="font-bold text-lg text-foreground leading-tight">
                    Pedagogik Psixologiya Asoslari
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Muallif: Prof. A. Qodirov
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <FileText className="h-3 w-3" />
                      <span>245 sahifa</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      <span className="font-medium">4.8</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Download className="h-3 w-3" />
                      <span>1.2K</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">O'qish jarayoni</span>
                  <span className="font-medium text-foreground">
                    65% (159/245 sahifa)
                  </span>
                </div>
                <div className="relative">
                  <Progress value={65} className="h-2" />
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/40 rounded-full"
                    style={{ width: "65%" }}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1 bg-gradient-to-r from-primary to-primary/80">
                  <Play className="h-4 w-4 mr-2" />
                  Davom etish
                </Button>
                <Button
                  variant="outline"
                  className="border-primary/20 text-primary hover:bg-primary/5"
                >
                  <Target className="h-4 w-4 mr-2" />
                  Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Statistics Overview */}
        <motion.section variants={{ itemVariants }}>
          <Card className="bg-gradient-to-br from-muted/30 to-background">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Bu Hafta Statistikasi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    24
                  </div>
                  <div className="text-xs text-muted-foreground">
                    O'qilgan sahifalar
                  </div>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span className="text-xs text-green-500">+12%</span>
                  </div>
                </div>
                <div className="text-center p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10">
                  <div className="text-2xl font-bold text-amber-600 mb-1">
                    350
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Yig'ilgan XP
                  </div>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span className="text-xs text-green-500">+8%</span>
                  </div>
                </div>
                <div className="text-center p-4 rounded-2xl bg-green-500/5 border border-green-500/10">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    7
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Kun ketma-ketlik
                  </div>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <Flame className="h-3 w-3 text-orange-500" />
                    <span className="text-xs text-orange-500">Streak!</span>
                  </div>
                </div>
                <div className="text-center p-4 rounded-2xl bg-purple-500/5 border border-purple-500/10">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    3
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Yangi yutuqlar
                  </div>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <Medal className="h-3 w-3 text-amber-500" />
                    <span className="text-xs text-amber-500">Yangi!</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </motion.div>
  );
}
