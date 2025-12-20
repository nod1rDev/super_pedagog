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
import { useCompetitions } from "@/hooks/use-competitions";

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
  const { competitions, isLoading } = useCompetitions();

  // Filter competitions by status
  const activeCompetitions = competitions.filter(
    (c: any) => c.status === "active"
  );
  const upcomingCompetitions = competitions.filter(
    (c: any) => c.status === "upcoming"
  );
  const completedCompetitions = competitions.filter(
    (c: any) => c.status === "completed"
  );

  const totalParticipants = competitions.reduce(
    (acc: number, c: any) => acc + (c.participants || 0),
    0
  );

  const calculateDaysLeft = (deadline: string) => {
    const days = Math.ceil(
      (new Date(deadline).getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24)
    );
    return days > 0 ? `${days} kun` : "Tugagan";
  };

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
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.header className="text-center space-y-3">
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
      <motion.section className="grid grid-cols-3 gap-3">
        <Card className="text-center hover:shadow-lg transition-all duration-200">
          <CardContent className="p-4">
            <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mx-auto mb-2">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <p className="text-xl font-bold text-foreground">
              {activeCompetitions.length + 1}
            </p>
            <p className="text-xs text-muted-foreground">Faol tanlovlar</p>
          </CardContent>
        </Card>
        <Card className="text-center hover:shadow-lg transition-all duration-200">
          <CardContent className="p-4">
            <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mx-auto mb-2">
              <Users className="h-6 w-6 text-white" />
            </div>
            <p className="text-xl font-bold text-foreground">
              {totalParticipants}
            </p>
            <p className="text-xs text-muted-foreground">Ishtirokchilar</p>
          </CardContent>
        </Card>
        <Card className="text-center hover:shadow-lg transition-all duration-200">
          <CardContent className="p-4">
            <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mx-auto mb-2">
              <Medal className="h-6 w-6 text-white" />
            </div>
            <p className="text-xl font-bold text-foreground">0</p>
            <p className="text-xs text-muted-foreground">Yutgan tanlovlar</p>
          </CardContent>
        </Card>
      </motion.section>

      {/* Tabs */}
      <motion.section>
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active" className="flex gap-2">
              <Trophy className="h-4 w-4" />
              Faol
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
            {isLoading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Yuklanmoqda...</p>
              </div>
            ) : competitions.length + 1 === 0 ? (
              <Card className="text-center p-8">
                <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Faol tanlovlar yo'q
                </h3>
                <p className="text-muted-foreground">
                  Hozircha faol tanlovlar mavjud emas
                </p>
              </Card>
            ) : (
              competitions.map((competition: any) => (
                <motion.div
                  key={competition.id}
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

                          {/* Show topics if available */}
                          {competition.topics &&
                            competition.topics.length > 0 && (
                              <div className="mt-4 space-y-2">
                                <p className="text-sm font-medium">Mavzular:</p>
                                <div className="grid gap-2">
                                  {competition.topics
                                    .slice(0, 3)
                                    .map((topic: string, i: number) => (
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
                                      + yana {competition.topics.length - 3} ta
                                      mavzu
                                    </Button>
                                  )}
                                </div>
                              </div>
                            )}
                        </div>
                        {competition.category && (
                          <Badge
                            variant="secondary"
                            className="ml-4 flex-shrink-0"
                          >
                            {competition.category}
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span className="text-muted-foreground">
                            {competition.participants || 0} ishtirokchi
                          </span>
                        </div>
                        {competition.deadline && (
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span className="text-muted-foreground">
                              {calculateDaysLeft(competition.deadline)} qoldi
                            </span>
                          </div>
                        )}
                        {competition.prize && (
                          <div className="flex items-center gap-2">
                            <Trophy className="h-4 w-4" />
                            <span className="text-muted-foreground">
                              {competition.prize}
                            </span>
                          </div>
                        )}
                        {competition.difficulty && (
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4" />
                            <span className="text-muted-foreground">
                              {competition.difficulty}
                            </span>
                          </div>
                        )}
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
              ))
            )}
          </TabsContent>

          {/* Upcoming Competitions */}
          <TabsContent value="upcoming" className="space-y-4 mt-6">
            {upcomingCompetitions.length === 0 ? (
              <Card className="text-center p-8">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Kelayotgan tanlovlar yo'q
                </h3>
                <p className="text-muted-foreground">
                  Hozircha rejalashtirilgan tanlovlar mavjud emas
                </p>
              </Card>
            ) : (
              upcomingCompetitions.map((competition: any) => (
                <Card key={competition.id} className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">
                        {competition.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {competition.start_date &&
                          `Boshlanish sanasi: ${formatDate(
                            competition.start_date
                          )}`}
                      </p>
                    </div>
                    <Button variant="outline">Eslatma qo'yish</Button>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Completed Competitions */}
          <TabsContent value="completed" className="space-y-4 mt-6">
            {completedCompetitions.length === 0 ? (
              <Card className="text-center p-8">
                <Medal className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Tugagan tanlovlar yo'q
                </h3>
                <p className="text-muted-foreground">
                  Hozircha yakunlangan tanlovlar mavjud emas
                </p>
              </Card>
            ) : (
              completedCompetitions.map((competition: any) => (
                <Card key={competition.id} className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                      <Trophy className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">
                        {competition.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {competition.winner
                          ? `G'olib: ${competition.winner}`
                          : "G'olib e'lon qilinmagan"}
                      </p>
                    </div>
                    <Button variant="outline">Natijalarni ko'rish</Button>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </motion.section>
    </motion.div>
  );
}
