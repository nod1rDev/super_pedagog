"use client"

import { Card } from "@/components/ui/card"

export function UsersPage() {
  return (
    <div className="container mx-auto p-4 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold lg:text-3xl">Foydalanuvchilar</h1>
      </div>

      <Card className="flex h-48 items-center justify-center">
        <p className="text-muted-foreground">Foydalanuvchilar bo'limi tez orada qo'shiladi</p>
      </Card>
    </div>
  )
}
