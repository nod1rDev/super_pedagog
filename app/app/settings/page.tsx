"use client";

import { motion } from "framer-motion";
import {
  Bell,
  Shield,
  User,
  Globe,
  HelpCircle,
  Moon,
  Sun,
  Smartphone,
  Volume2,
  ChevronRight,
  Check,
  BookOpen,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

const settingsItems = [
  {
    icon: Bell,
    title: "Bildirishnomalar",
    description: "Bildirishnoma sozlamalarini boshqaring",
  },
  {
    icon: Shield,
    title: "Maxfiylik",
    description: "Maxfiylik sozlamalarini nazorat qiling",
  },
  {
    icon: User,
    title: "Hisob",
    description: "Hisob ma'lumotlarini boshqaring",
  },
  {
    icon: Globe,
    title: "Til",
    description: "Afzal ko'rgan tilingizni tanlang",
  },
  {
    icon: Volume2,
    title: "Ovoz",
    description: "Ovoz va audio sozlamalari",
  },
  {
    icon: HelpCircle,
    title: "Yordam",
    description: "Yordam va qo'llab-quvvatlash",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
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

export default function SettingsPage() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen pb-24 bg-background p-4">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-48 mx-auto" />
          <div className="h-32 bg-muted rounded" />
          <div className="h-16 bg-muted rounded" />
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-16 bg-muted rounded" />
          ))}
        </div>
      </div>
    );
  }

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  return (
    <motion.div
      className="min-h-screen pb-24 bg-background p-4 space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.header variants={{cardVariants}} className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Sozlamalar</h1>
        <p className="text-muted-foreground">Ilovani o'zingizga moslang</p>
      </motion.header>

      {/* Profile Card */}
      <motion.section variants={{cardVariants}}>
        <Card className="bg-primary text-primary-foreground border-0 shadow-xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <User className="h-8 w-8" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">Dilnoza Karimova</h3>
                <p className="text-sm opacity-90">
                  Toshkent Davlat Pedagogika Universiteti
                </p>
                <Badge
                  variant="secondary"
                  className="bg-primary-foreground/20 text-primary-foreground mt-2 border-0"
                >
                  Premium foydalanuvchi
                </Badge>
              </div>
              <Button
                variant="secondary"
                size="sm"
                className="bg-primary-foreground/20 text-primary-foreground border-0 hover:bg-primary-foreground/30"
              >
                Tahrirlash
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.section>

      {/* Theme Toggle */}
      <motion.section variants={{cardVariants}}>
        <Card className="hover:shadow-lg transition-all duration-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                  {isDark ? (
                    <Moon className="h-6 w-6 text-foreground" />
                  ) : (
                    <Sun className="h-6 w-6 text-foreground" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Mavzu</h3>
                  <p className="text-sm text-muted-foreground">
                    {isDark ? "Qorong'u rejim" : "Yorug' rejim"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  {theme === "system"
                    ? "Avtomatik"
                    : isDark
                    ? "Qorong'u"
                    : "Yorug'"}
                </span>
                <Switch
                  checked={isDark}
                  onCheckedChange={(checked) =>
                    setTheme(checked ? "dark" : "light")
                  }
                  aria-label="Mavzuni almashtirish"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.section>

      {/* Settings Items */}
      <motion.section className="space-y-3">
        {settingsItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              variants={{cardVariants}}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group hover:border-primary/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                      <Icon className="h-6 w-6 text-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.section>

      {/* System Information */}
      <motion.section variants={{cardVariants}}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Smartphone className="h-5 w-5" />
              Tizim ma'lumotlari
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Ilova versiyasi
              </span>
              <span className="text-sm font-medium text-foreground">1.0.0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Oxirgi yangilanish
              </span>
              <span className="text-sm font-medium text-foreground">
                2024-01-15
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Mavzu</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">
                  {theme === "system"
                    ? "Tizim"
                    : isDark
                    ? "Qorong'u"
                    : "Yorug'"}
                </span>
                {theme === "system" && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.section>

      {/* App Info */}
      <motion.section variants={{cardVariants}}>
        <Card>
          <CardContent className="p-6 text-center space-y-4">
            <img src="/logo.jpg" className="h-16 rounded-xl mx-auto w-16" alt="" />

            <div>
              <h3 className="font-semibold text-foreground text-lg">
                Super Pedagog
              </h3>
              <p className="text-sm text-muted-foreground">
                O'zbekiston pedagogika talabalari uchun zamonaviy ta'lim
                platformasi
              </p>
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
                  </span>{" "}
                  © 2024
                </p>
              </a>
            </div>
          </CardContent>
        </Card>
      </motion.section>
    </motion.div>
  );
}
