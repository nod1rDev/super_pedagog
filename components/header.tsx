"use client";

import { BookOpen, MessageSquareText, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function Header() {
  const { theme } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-sm dark:border-gray-800">
      <div className="container flex h-12 items-center justify-between">
        <div className="flex items-center gap-2 mr-auto">
          <img src="/logo.jpg" className="w-[34px] rounded-md h-[34px]" alt="" />
          <span className="text-sm font-semibold dark:text-gray-200">
            Super Pedagog
          </span>
        </div>

        <Link href="/app/ai-chat">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "relative group h-8 px-3",
              "bg-ai-gradient dark:bg-ai-gradient-dark",
              "text-white dark:text-white",
              "hover:opacity-90 transition-all duration-300",

              "shadow-lg hover:shadow-xl",
              "rounded-full",
              "border border-blue-400/20 dark:border-blue-300/20"
            )}
          >
            <MessageSquareText
              className="h-4 w-4 mr-1.5 animate-pulse-soft"
              strokeWidth={2.5}
            />
            <span className="text-xs font-medium">AI Yordamchi</span>
            <Sparkles
              className={cn(
                "absolute -top-1 -right-1 h-3 w-3",
                "text-yellow-300 dark:text-yellow-200",
                "animate-pulse-soft"
              )}
            />
          </Button>
        </Link>
      </div>
    </header>
  );
}
