"use client";

import { motion } from "framer-motion";
import { BookOpen, Trophy, Users, Star, ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  FileText,
  MessageCircle,
  Sparkles,
  Video,
  Book,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
const quickStats = [
  {
    icon: Trophy,
    label: "Tanlovlar",
    value: "4",
    description: "Faol ishtirok",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    href: "/app/competitions",
    isAvailable: true,
  },
  {
    icon: BookOpen,
    label: "Kitoblar",
    value: "1",
    description: "O'qilgan",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    href: "/app/library",
    isAvailable: true,
  },
  {
    icon: FileText,
    label: "Maqolalar",
    value: "3",
    description: "Yozilgan",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    href: "/app/articles",
    isAvailable: true,
  },
  {
    icon: Video,
    label: "Videolar",
    value: "1",
    description: "Video darslar",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    href: "/app/vedios",
    isAvailable: true,
  },
  {
    icon: Book,
    label: "Metodikalar",
    value: "1",
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
 
];

const stats = [
  { number: "1000+", label: "Faol foydalanuvchilar" },
  { number: "500+", label: "Pedagogik kitoblar" },
  { number: "50+", label: "Oylik tanlovlar" },
  { number: "95%", label: "Foydalanuvchi mamnunligi" },
];
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

      {/* Quick Stats */}
      <motion.section
        variants={{ itemVariants }}
        className="grid grid-cols-2 mb-4 md:grid-cols-4 gap-3"
      >
        {quickStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              variants={{ itemVariants }}
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
                      stat.color.replace("text-", "ring-").replace("/10", "/20")
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
            <img src="/logo.jpg" className="w-6  rounded-md h-6" alt="" />
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
          <div className="pt-2 border-t flex items-center justify-center gap-2">
            <a
              href="https://www.apexbart.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2  transition-colors group"
            >
              <p className="text-xs flex ">
                Developed by{" "}
                <span className="text-primary flex mr-1  hover:underline">
                  <img
                    src="/logo.png"
                    alt="ApexBart"
                    className="h-4 mx-1 w-4 object-contain"
                  />{" "}
                  ApexBart Solutions
                </span>
                
              </p>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
