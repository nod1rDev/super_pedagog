"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    const user = localStorage.getItem("user")

    if (!token || !user || user === "undefined") {
      router.push("/login")
      return
    }

    try {
      const userData = JSON.parse(user)
      if (userData && userData.isAdmin) {
        router.push("/admin")
      } else {
        router.push("/user")
      }
    } catch (error) {
      console.error("JSON parse error:", error)
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      router.push("/login")
    }
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-muted-foreground">Yuklanmoqda...</p>
      </div>
    </div>
  )
}
