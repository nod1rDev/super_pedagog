"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Bell } from "lucide-react"

interface NotificationsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NotificationsModal({ open, onOpenChange }: NotificationsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Bildirishnomalar
          </DialogTitle>
          <DialogDescription>Bildirishnoma sozlamalari</DialogDescription>
        </DialogHeader>
        <div className="py-8 text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
            <Bell className="h-8 w-8 text-muted-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Tez kunda</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Bildirishnoma sozlamalari tez orada qo'shiladi. Siz yangi maqolalar, tanlovlar va boshqa yangiliklar
              haqida xabardor bo'lasiz.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
