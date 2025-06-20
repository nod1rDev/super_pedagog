"use client";

import { motion } from "framer-motion";
import {
  Trophy,
  Users,
  Calendar,
  Clock,
  Star,
  Filter,
  Plus,
  Medal,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const competitionsData = {
  active: [
    {
      id: 1,
      title: "📘 Ilmiy maqola tanlovi",
      description: "Zamonaviy ta'lim texnologiyalari bo'yicha ilmiy maqola",
      type: "article",
      topics: [
        "Zamonaviy ta'limda sun'iy intellekt imkoniyatlari",
        "Immersiv texnologiyalar asosida raqamli o'quv muhiti yaratish",
        "Raqamli pedagogikaning konstruktivistik yondashuvlari",
      ],
      prize: "BHM × 3",
      deadline: "15 kun",
      participants: 47,
      difficulty: "Professional",
    },
    {
      id: 2,
      title: "📗 Ilmiy tezis tanlovi",
      description: "Raqamli pedagogika yo'nalishida ilmiy tezislar",
      type: "thesis",
      topics: [
        "Bo'lajak pedagoglarning raqamli kompetensiyasini shakllantirish yo'llari",
        "Kiberijtimoiylashuv – raqamli davrning yangi pedagogik yo'nalishi",
        "Ta'limda sun'iy intellekt: imkoniyat va xavf omillari",
      ],
      prize: "BHM × 3",
      deadline: "8 kun",
      participants: 23,
      difficulty: "Professional",
    },
    {
      id: 3,
      title: "📕 Ijodiy insho tanlovi",
      description: "Ta'lim kelajagi haqida erkin fikrlar",
      type: "essay",
      topics: [
        "Kelajak ta'limi qanday bo'ladi?",
        "Zamonaviy o'qituvchining qiyofasi",
        "Ta'lim texnologiyalari hayotimda",
      ],
      prize: "BHM × 3",
      deadline: "12 kun",
      participants: 156,
      difficulty: "O'rta",
    },
  ],
  upcoming: [
    {
      id: 4,
      title: "📘 Yangi avlod pedagogikasi",
      description: "Kelgusi oy boshlanadi",
      type: "article",
      startDate: "2024-03-01",
      prize: "BHM × 3",
    },
    {
      id: 5,
      title: "📗 Smart ta'lim tizimi",
      description: "Kelgusi hafta boshlanadi",
      type: "thesis",
      startDate: "2024-02-25",
      prize: "BHM × 3",
    },
  ],
  completed: [
    {
      id: 6,
      title: "📘 Raqamli pedagogika",
      description: "O'tgan oydagi tanlov",
      type: "article",
      participants: 234,
      winner: "Azizov B.",
    },
  ],
};

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

export default function CompetitionsPage() {
  return (
    <motion.div
      className="min-h-screen pb-24 bg-background p-4 space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.header
        variants={{ itemVariants }}
        className="text-center space-y-3"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
            <Trophy className="h-6 w-6 text-primary-foreground" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-foreground">Tanlovlar</h1>
        <p className="text-muted-foreground">
          O'z bilimingizni sinab ko'ring va sovrinlar yutib oling
        </p>
      </motion.header>

      {/* Stats */}
      <motion.section
        variants={{ itemVariants }}
        className="grid grid-cols-3 gap-3"
      >
        <Card className="text-center hover:shadow-lg transition-all duration-200">
          <CardContent className="p-4">
            <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mx-auto mb-2">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <p className="text-xl font-bold text-foreground">12</p>
            <p className="text-xs text-muted-foreground">Faol tanlovlar</p>
          </CardContent>
        </Card>
        <Card className="text-center hover:shadow-lg transition-all duration-200">
          <CardContent className="p-4">
            <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mx-auto mb-2">
              <Users className="h-6 w-6 text-white" />
            </div>
            <p className="text-xl font-bold text-foreground">1,247</p>
            <p className="text-xs text-muted-foreground">Ishtirokchilar</p>
          </CardContent>
        </Card>
        <Card className="text-center hover:shadow-lg transition-all duration-200">
          <CardContent className="p-4">
            <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mx-auto mb-2">
              <Medal className="h-6 w-6 text-white" />
            </div>
            <p className="text-xl font-bold text-foreground">3</p>
            <p className="text-xs text-muted-foreground">Yutgan tanlovlar</p>
          </CardContent>
        </Card>
      </motion.section>

      {/* Tabs */}
      <motion.section variants={{ itemVariants }}>
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active" className="flex gap-2">
              <Trophy className="h-4 w-4" />
              Faol tanlovlar
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="flex gap-2">
              <Calendar className="h-4 w-4" />
              Kelayotgan
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex gap-2">
              <Medal className="h-4 w-4" />
              Tugagan
            </TabsTrigger>
          </TabsList>

          {/* Active Competitions */}
          <TabsContent value="active" className="space-y-4 mt-6">
            {competitionsData.active.map((competition: any) => (
              <motion.div
                key={competition.id}
                variants={{ itemVariants }}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 }}
                className="group"
              >
                <Card
                  className={cn(
                    "overflow-hidden hover:shadow-xl transition-all duration-300",
                    "group-hover:border-primary/50"
                  )}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                            <Trophy className="h-4 w-4 text-white" />
                          </div>
                          <CardTitle className="text-lg text-foreground group-hover:text-primary transition-colors">
                            {competition.title}
                          </CardTitle>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {competition.description}
                        </p>

                        {/* Show available topics */}
                        <div className="mt-4 space-y-2">
                          <p className="text-sm font-medium">Mavzular:</p>
                          <div className="grid gap-2">
                            {competition.topics
                              .slice(0, 3)
                              .map((topic: any, i: number) => (
                                <div
                                  key={i}
                                  className="flex items-start gap-2 text-sm"
                                >
                                  <span className="text-primary">•</span>
                                  <span className="text-muted-foreground">
                                    {topic}
                                  </span>
                                </div>
                              ))}
                            {competition.topics.length > 3 && (
                              <Button
                                variant="link"
                                className="text-xs text-primary justify-start px-0"
                              >
                                + yana {competition.topics.length - 3} ta mavzu
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary" className="ml-4 flex-shrink-0">
                        {competition.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span className="text-muted-foreground">
                          {competition.participants} ishtirokchi
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span className="text-muted-foreground">
                          {competition.deadline} qoldi
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4" />
                        <span className="text-muted-foreground">
                          {competition.prize}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4" />
                        <span className="text-muted-foreground">
                          {competition.difficulty}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button className="flex-1">
                        <Plus className="h-4 w-4 mr-2" />
                        Ishtirok etish
                      </Button>
                      <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          {/* Upcoming Competitions */}
          <TabsContent value="upcoming" className="space-y-4 mt-6">
            {competitionsData.upcoming.map((competition) => (
              <Card key={competition.id} className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{competition.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {competition.description}
                    </p>
                  </div>
                  <Button variant="outline">Eslatma qo'yish</Button>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Completed Competitions */}
          <TabsContent value="completed" className="space-y-4 mt-6">
            {competitionsData.completed.map((competition) => (
              <Card key={competition.id} className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                    <Trophy className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{competition.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      G'olib: {competition.winner}
                    </p>
                  </div>
                  <Button variant="outline">Natijalarni ko'rish</Button>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </motion.section>
    </motion.div>
  );
}
