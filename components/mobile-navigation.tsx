"use client";

import { Home, Trophy, Bookmark, FileText, Settings, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

const navItems = [
  {
    icon: Home,
    href: "/app/home",
    label: "Home",
    labelUz: "Bosh sahifa",
    activeColor: "text-blue-500 dark:text-blue-400",
  },
  {
    icon: Trophy,
    href: "/app/competitions",
    label: "Competitions",
    labelUz: "Tanlovlar",
    activeColor: "text-yellow-500 dark:text-yellow-400",
  },
  {
    icon: Bookmark,
    href: "/app/bookmarks",
    label: "Library",
    labelUz: "Kutubxona",
    activeColor: "text-green-500 dark:text-green-400",
  },
  {
    icon: FileText,
    href: "/app/articles",
    label: "Articles",
    labelUz: "Maqolalar",
    activeColor: "text-purple-500 dark:text-purple-400",
  },
  {
    icon: Settings,
    href: "/app/settings",
    label: "Settings",
    labelUz: "Sozlamalar",
    activeColor: "text-gray-500 dark:text-gray-400",
  },
];

export function MobileNavigation() {
  const pathname = usePathname();
  const { theme } = useTheme();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur-sm safe-bottom dark:border-gray-800">
      <div className="grid grid-cols-5 h-16">
        {navItems.map(({ href, icon: Icon, labelUz, activeColor }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 p-1",
                "transition-all duration-200 ease-in-out",
                isActive
                  ? cn(activeColor, "scale-110")
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 transition-transform",
                  isActive && "transform scale-110"
                )}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span
                className={cn(
                  "text-[10px] font-medium",
                  isActive && "font-semibold"
                )}
              >
                {labelUz}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
