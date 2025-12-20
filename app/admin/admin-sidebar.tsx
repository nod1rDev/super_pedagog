"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useTheme } from "next-themes"
import {
  Menu,
  FileText,
  BookOpen,
  Trophy,
  FileStack,
  Video,
  Moon,
  Sun,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"

const sections = [
  { name: "Maqolalar", href: "/admin/articles", icon: FileText },
  { name: "Kitoblar", href: "/admin/books", icon: BookOpen },
  { name: "Tanlovlar", href: "/admin/competitions", icon: Trophy },
  { name: "Metodikalar", href: "/admin/methodologies", icon: FileStack },
  { name: "Videolar", href: "/admin/videos", icon: Video },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    router.replace("/login")
  }

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b border-border px-4">
        <h1 className="text-lg font-semibold">Admin Panel</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {sections.map((section) => {
          const Icon = section.icon
          const isActive = pathname === section.href

          return (
            <Link
              key={section.href}
              href={section.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              {section.name}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-border p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-950"
        >
          <LogOut className="h-5 w-5" />
          Chiqish
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Drawer */}
      <div className="lg:hidden">
        <div className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-between border-b border-border bg-background px-4">
          <h1 className="text-lg font-semibold">Admin Panel</h1>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 p-0">
                <SidebarContent />
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <div className="h-16" />
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden w-64 border-r border-border bg-card lg:block">
        <SidebarContent />
      </aside>
    </>
  )
}
