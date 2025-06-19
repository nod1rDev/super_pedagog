"use client"

import { motion } from "framer-motion"
import { Trophy, Users, Calendar, Clock, Star, Filter, Plus, Medal } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

const competitions = [
  {
    id: 1,
    title: "Zamonaviy Pedagogika Usullari",
    description: "Innovatsion ta'lim texnologiyalari haqida maqola yozing va katta sovrinlar yutib oling",
    participants: 47,
    deadline: "15 kun",
    prize: "500,000 so'm",
    status: "active",
    difficulty: "O'rta",
    category: "Maqola",
  },
  {
    id: 2,
    title: "Bolalar Psixologiyasi",
    description: "Maktabgacha yoshdagi bolalar psixologiyasi bo'yicha tadqiqot ishini taqdim eting",
    participants: 23,
    deadline: "8 kun",
    prize: "300,000 so'm",
    status: "active",
    difficulty: "Qiyin",
    category: "Tadqiqot",
  },
  {
    id: 3,
    title: "Raqamli Ta'lim Vositalari",
    description: "Zamonaviy raqamli vositalardan foydalanish tajribasi va natijalarini baham ko'ring",
    participants: 156,
    deadline: "Tugagan",
    prize: "1,000,000 so'm",
    status: "completed",
    difficulty: "Oson",
    category: "Amaliyot",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  }
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

export default function CompetitionsPage() {
  return (
    <motion.div
      className="min-h-screen pb-24 bg-background p-4 space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.header variants={{itemVariants}} className="text-center space-y-3">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
            <Trophy className="h-6 w-6 text-primary-foreground" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-foreground">Tanlovlar</h1>
        <p className="text-muted-foreground">O'z bilimingizni sinab ko'ring va sovrinlar yutib oling</p>
      </motion.header>

      {/* Stats */}
      <motion.section variants={{itemVariants}} className="grid grid-cols-3 gap-3">
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
      <motion.section variants={{itemVariants}}>
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">Faol</TabsTrigger>
            <TabsTrigger value="upcoming">Kelayotgan</TabsTrigger>
            <TabsTrigger value="completed">Tugagan</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4 mt-6">
            {competitions
              .filter((c) => c.status === "active")
              .map((competition, index) => (
                <motion.div
                  key={competition.id}
                  variants={{itemVariants}}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <Card
                    className={cn(
                      "overflow-hidden hover:shadow-xl transition-all duration-300",
                      "group-hover:border-primary/50",
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
                          <p className="text-sm text-muted-foreground leading-relaxed">{competition.description}</p>
                        </div>
                        <Badge variant="secondary" className="ml-4 flex-shrink-0">
                          {competition.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-text-white" />
                          <span className="text-muted-foreground">{competition.participants} ishtirokchi</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-text-white" />
                          <span className="text-muted-foreground">{competition.deadline} qoldi</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Trophy className="h-4 w-4 text-text-white" />
                          <span className="text-muted-foreground">{competition.prize}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-text-white" />
                          <span className="text-muted-foreground">{competition.difficulty}</span>
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

          <TabsContent value="upcoming" className="space-y-4 mt-6">
            <Card className="text-center p-8">
              <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Kelayotgan tanlovlar</h3>
              <p className="text-muted-foreground mb-4">Yangi tanlovlar tez orada e'lon qilinadi</p>
              <Button variant="outline">Xabarnoma olish</Button>
            </Card>
          </TabsContent>

          <TabsContent value="completed" className="space-y-4 mt-6">
            {competitions
              .filter((c) => c.status === "completed")
              .map((competition, index) => (
                <motion.div
                  key={competition.id}
                  variants={{itemVariants}}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="opacity-75 hover:opacity-100 transition-opacity">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1 flex-1">
                          <CardTitle className="text-lg text-foreground">{competition.title}</CardTitle>
                          <p className="text-sm text-muted-foreground">{competition.description}</p>
                        </div>
                        <Badge variant="outline" className="ml-4">
                          Tugagan
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">{competition.participants} ishtirokchi</div>
                        <Button variant="outline" size="sm">
                          Natijalarni ko'rish
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </TabsContent>
        </Tabs>
      </motion.section>
    </motion.div>
  )
}
