import type React from "react"

import { ThemeProvider } from "@/components/theme-provider"
import { AdminSidebar } from "./admin-sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider>
      <div className="flex h-screen overflow-hidden bg-background">
        <AdminSidebar />
        <main className="flex-1 pt-20 overflow-y-auto">{children}</main>
      </div>
    </ThemeProvider>
  )
}
