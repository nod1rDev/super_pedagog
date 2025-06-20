"use client";

import { motion } from "framer-motion";
import { File, Download, Eye, Calendar, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const metodikalar = [
  {
    id: 1,
    title: "Konstruktivistik yondashuv",
    author: "Dilnoza Ismatova",
    description:
      "Konstruktivistik yondashuvga asoslangan raqamli-interaktiv o‘qitish metodikasi",
    fileUrl: "/metodika1.docx",
    downloads: 145,
    views: 324,
    date: "2024-02-10",
    category: "Konstruktivistik ",
    pages: 1,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
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

export default function MetodikaPage() {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("uz-UZ", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Rename function to better reflect its purpose
  const handleViewFile = (fileUrl: string) => {
    window.open(fileUrl, "_blank");
  };

  return (
    <motion.div
      className="min-h-screen pb-24 bg-background p-4 space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={{ itemVariants }} className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Metodik qo'llanmalar
        </h1>
        <p className="text-muted-foreground">
          Zamonaviy pedagogik metodika va ishlanmalar
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={{ itemVariants }}
        className="grid grid-cols-3 gap-3"
      >
        <Card className="text-center">
          <CardContent className="p-3">
            <File className="h-6 w-6 text-primary mx-auto mb-1" />
            <p className="text-lg font-bold">1</p>
            <p className="text-xs text-muted-foreground">Jami metodikalar</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-3">
            <Eye className="h-6 w-6 text-primary mx-auto mb-1" />
            <p className="text-lg font-bold">324</p>
            <p className="text-xs text-muted-foreground">Ko'rilgan</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-3">
            <Download className="h-6 w-6 text-primary mx-auto mb-1" />
            <p className="text-lg font-bold">145</p>
            <p className="text-xs text-muted-foreground">Yuklab olingan</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Metodikalar ro'yhati */}
      <motion.div variants={{ itemVariants }} className="space-y-4">
        {metodikalar.map((metodika) => (
          <Card
            key={metodika.id}
            className="overflow-hidden hover:shadow-lg transition-all duration-200"
          >
            <CardContent className="p-4">
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <Badge variant="secondary" className="mb-2">
                      {metodika.category}
                    </Badge>
                    <h3 className="font-semibold text-lg">{metodika.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {metodika.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(metodika.date)}
                  </div>
                  <div className="flex items-center gap-1">
                    <File className="h-4 w-4" />
                    {metodika.pages} bet
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {metodika.author}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {metodika.views}
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      {metodika.downloads}
                    </div>
                  </div>

                  <Button
                    onClick={() => handleViewFile(metodika.fileUrl)}
                    className="gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    Ko'rish
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </motion.div>
  );
}
