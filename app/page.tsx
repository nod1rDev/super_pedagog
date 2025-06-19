"use client";

import { motion } from "framer-motion";
import { BookOpen, Trophy, Users, Star, ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const features = [
  {
    icon: <Trophy className="h-8 w-8" />,
    title: "Tanlovlar",
    description:
      "Pedagogika bo'yicha tanlovlarda ishtirok eting va sovrinlar yutib oling",
  },
  {
    icon: <BookOpen className="h-8 w-8" />,
    title: "Kutubxona",
    description: "Pedagogik adabiyotlarning keng to'plamidan foydalaning",
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Hamjamiyat",
    description: "Boshqa pedagoglar bilan bog'laning va tajriba almashing",
  },
];

const stats = [
  { number: "1000+", label: "Faol foydalanuvchilar" },
  { number: "500+", label: "Pedagogik kitoblar" },
  { number: "50+", label: "Oylik tanlovlar" },
  { number: "95%", label: "Foydalanuvchi mamnunligi" },
];

export default function HomePage() {
  return (
    <div className="pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-4 bg-primary text-primary-foreground">
              O'zbekiston #1 Pedagogika Platformasi
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
              Super Pedagog
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              O'zbekiston pedagogika talabalar uchun zamonaviy ta'lim
              platformasi. Bilim oling, tanlovlarda ishtirok eting va
              karyerangizni rivojlantiring.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/app/home">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Boshlash
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                <Play className="mr-2 h-5 w-5" />
                Demo ko'rish
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Nima uchun Super Pedagog?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Pedagogika sohasidagi eng yaxshi imkoniyatlar bir joyda
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-muted">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Bizning Yutuqlarimiz
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Bugun o'z ta'lim sayohatingizni boshlang
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Minglab pedagoglar bizga ishonib, o'z bilimlarini oshirmoqda
            </p>
            <Link href="/app/home">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Bepul ro'yxatdan o'tish
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">
              Super Pedagog
            </span>
          </div>
          <p className="text-muted-foreground mb-4">
            O'zbekiston pedagogika talabalar uchun zamonaviy ta'lim platformasi
          </p>
          <div className="flex items-center justify-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className="h-4 w-4 fill-yellow-400 text-yellow-400"
              />
            ))}
            <span className="ml-2 text-sm text-muted-foreground">
              4.9/5 (1,247 baho)
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-8">
            © 2024 Super Pedagog. Barcha huquqlar himoyalangan.
          </p>
        </div>
      </footer>
    </div>
  );
}
