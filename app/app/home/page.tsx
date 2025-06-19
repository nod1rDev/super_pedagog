"use client";

import { motion } from "framer-motion";
import {
  Trophy,
  BookOpen,
  FileText,
  Award,
  TrendingUp,
  Star,
  ChevronRight,
  Zap,
  Target,
  MessageCircle,
  Bell,
  Search,
  Sparkles,
  Video,
  Book,
  GraduationCap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Header } from "@/components/header";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
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

const quickStats = [
  {
    icon: Trophy,
    label: "Tanlovlar",
    value: "3",
    description: "Faol ishtirok",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    href: "/app/competitions",
    isAvailable: true,
  },
  {
    icon: BookOpen,
    label: "Kitoblar",
    value: "12",
    description: "O'qilgan",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    href: "/app/library",
    isAvailable: true,
  },
  {
    icon: FileText,
    label: "Maqolalar",
    value: "8",
    description: "Yozilgan",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    href: "/app/articles",
    isAvailable: true,
  },
  {
    icon: Video,
    label: "Videolar",
    value: "15",
    description: "Video darslar",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    href: "/app/videos",
    isAvailable: true,
  },
  {
    icon: Book,
    label: "Metodikalar",
    value: "6",
    description: "Metodik qo'llanmalar",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    href: "/app/methods",
    isAvailable: true,
  },
  {
    icon: GraduationCap,
    label: "Dissertatsiyalar",
    value: "4",
    description: "Ilmiy ishlar",
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
    href: "/app/dissertations",
    isAvailable: true,
  },
  {
    icon: MessageCircle,
    label: "Muhokamalar",
    value: "25+",
    description: "Forum mavzulari",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    href: "/app/discussions",
    isAvailable: true,
  },
  {
    icon: Star,
    label: "Yutuqlar",
    value: "12",
    description: "Erishilgan natijalar",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    href: "/app/achievements",
    isAvailable: true,
  },
];

const recentActivities = [
  {
    icon: FileText,
    title: "Yangi maqola o'qildi",
    subtitle: "Zamonaviy pedagogika usullari",
    time: "2 soat oldin",
  },
  {
    icon: Trophy,
    title: "Tanlovda ishtirok etildi",
    subtitle: "Pedagogik innovatsiyalar",
    time: "1 kun oldin",
  },
  {
    icon: Award,
    title: "Yangi badge olindi",
    subtitle: "Faol o'quvchi",
    time: "2 kun oldin",
  },
];

const featuredContent = [
  {
    type: "Tanlov",
    title: "Zamonaviy Ta'lim Texnologiyalari",
    description:
      "Raqamli ta'lim vositalari bo'yicha maqola yozing va 750,000 so'm sovrin yutib oling",
    deadline: "12 kun qoldi",
    participants: 89,
    prize: "750,000 so'm",
    icon: Trophy,
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
  },
];

export default function HomePage() {
  const router = useRouter();

  const handleStatClick = (stat: (typeof quickStats)[0]) => {
    if (stat.isAvailable) {
      router.push(stat.href);
    } else {
      toast.info("Bu sahifa tez orada qo'shiladi", {
        description: `${stat.label} bo'limi ustida ishlanmoqda`,
        action: {
          label: "OK",
          onClick: () => toast.dismiss(),
        },
      });
    }
  };

  return (
    <motion.div
      className="min-h-screen pb-24 bg-background"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Header />

      <div className="p-4 space-y-6">
        {/* Welcome Section */}
        <motion.section
          variants={{ itemVariants }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center gap-3">
            <Avatar className="h-14 w-14 border-2 border-border shadow-lg">
              <AvatarImage
                src="https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
                alt="Dilnoza Karimova"
              />
              <AvatarFallback className="bg-primary text-primary-foreground text-lg font-semibold">
                DK
              </AvatarFallback>
            </Avatar>
            <div className="text-left">
              <h2 className="text-xl font-semibold text-foreground">
                Xush kelibsiz, Dilnoza!
              </h2>
              <p className="text-muted-foreground">
                Bugun ham bilim olishga tayyormisiz?
              </p>
            </div>
          </div>
        </motion.section>

        {/* Search Bar */}
        <motion.section variants={{ itemVariants }}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Kitob, maqola yoki tanlov qidiring..."
              className="pl-10 py-3 rounded-2xl"
              aria-label="Qidiruv"
            />
          </div>
        </motion.section>

        {/* Quick Stats */}
        <motion.section
          variants={{ itemVariants }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {quickStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={{itemVariants}}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group"
                onClick={() => handleStatClick(stat)}
              >
                <Card
                  className={cn(
                    "text-center transition-all duration-200 cursor-pointer",
                    "hover:shadow-lg border border-border/50",
                    !stat.isAvailable && "opacity-75 hover:opacity-100"
                  )}
                >
                  <CardContent className="p-4">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3",
                        stat.bgColor,
                        "ring-2 ring-offset-2 ring-offset-background",
                        stat.color
                          .replace("text-", "ring-")
                          .replace("/10", "/20")
                      )}
                    >
                      <Icon className={cn("h-6 w-6", stat.color)} />
                    </div>
                    <p className={cn("text-2xl font-bold mb-1", stat.color)}>
                      {stat.value}
                    </p>
                    <p className="text-sm font-medium text-foreground mb-1">
                      {stat.label}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {stat.description}
                    </p>
                    {!stat.isAvailable && (
                      <div className="mt-2 flex items-center justify-center gap-1">
                        <Sparkles className="h-3 w-3 text-yellow-500 animate-pulse" />
                        <span className="text-[10px] text-muted-foreground">
                          Tez kunda
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.section>

        {/* Featured Content */}
        <motion.section variants={{ itemVariants }} className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">
              Tavsiya etilgan
            </h3>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primary/80"
            >
              Barchasini ko'rish
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          {featuredContent.map((content, index) => {
            const Icon = content.icon;
            return (
              <motion.div
                key={index}
                variants={{ itemVariants }}
                whileHover={{ scale: 1.01 }}
                className="cursor-pointer group"
              >
                <Card className="overflow-hidden bg-primary text-primary-foreground shadow-xl group-hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Icon className="h-5 w-5" />
                        <Badge
                          variant="secondary"
                          className="bg-primary-foreground/20 text-primary-foreground border-0"
                        >
                          {content.type}
                        </Badge>
                      </div>
                      {content.type === "Tanlov" && (
                        <div className="text-right text-sm">
                          <p className="font-medium">{content.deadline}</p>
                          <p className="opacity-80">
                            {content.participants} ishtirokchi
                          </p>
                        </div>
                      )}
                    </div>

                    <h4 className="text-xl font-bold mb-2 leading-tight">
                      {content.title}
                    </h4>
                    <p className="text-primary-foreground/90 mb-4 leading-relaxed">
                      {content.description}
                    </p>

                    <div className="flex items-center justify-between">
                      {content.type === "Tanlov" ? (
                        <div className="text-sm">
                          <p className="font-medium">Sovrin: {content.prize}</p>
                        </div>
                      ) : (
                        <div className="flex items-center gap-4 text-sm">
                          <span>{content.pages} sahifa</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{content.rating}</span>
                          </div>
                        </div>
                      )}
                      <Button
                        variant="secondary"
                        size="sm"
                        className="bg-primary-foreground/20 text-primary-foreground border-0 hover:bg-primary-foreground/30"
                      >
                        {content.type === "Tanlov"
                          ? "Ishtirok etish"
                          : "O'qish"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.section>

        {/* Progress Section */}
        <motion.section variants={{ itemVariants }}>
          <Card className="bg-muted">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Target className="h-5 w-5" />
                Haftalik Maqsadlar
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-foreground">Maqolalar o'qish</span>
                  <span className="font-medium text-primary">7/10</span>
                </div>
                <Progress value={70} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-foreground">Quiz ishlash</span>
                  <span className="font-medium text-primary">3/5</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              <div className="flex items-center gap-2 pt-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span className="text-sm text-muted-foreground">
                  Keyingi daraja uchun 250 XP kerak
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Recent Activities */}
        <motion.section variants={{ itemVariants }}>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                So'nggi Faoliyat
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <motion.div
                    key={index}
                    variants={{ itemVariants }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-accent hover:bg-accent/80 transition-colors cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-sm">
                      <Icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {activity.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.subtitle}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {activity.time}
                    </span>
                  </motion.div>
                );
              })}
            </CardContent>
          </Card>
        </motion.section>

        {/* Monthly Book */}
        <motion.section variants={{ itemVariants }}>
          <Card className="bg-accent">
            <CardHeader className="pb-3">
              <CardTitle className="text-foreground">
                📚 Oyning Kitobi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="w-16 h-20 bg-primary rounded-lg flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">
                    Pedagogik Psixologiya Asoslari
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Muallif: Prof. A. Qodirov
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span>245 sahifa</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                      <span>4.8</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  O'qishni boshlash
                </Button>
                <Button size="sm" variant="outline">
                  Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </motion.div>
  );
}
