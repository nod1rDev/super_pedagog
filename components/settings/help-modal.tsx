"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { BookOpen, Mail, Phone, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HelpModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function HelpModal({ open, onOpenChange }: HelpModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Super Pedagog haqida
          </DialogTitle>
          <DialogDescription>O'zbekiston pedagogika talabalari uchun zamonaviy ta'lim platformasi</DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {/* Logo va asosiy ma'lumot */}
          <div className="text-center space-y-3">
            <img src="/logo.jpg" alt="Super Pedagog" className="h-20 w-20 rounded-xl mx-auto" />
            <div>
              <h3 className="font-bold text-xl text-foreground">Super Pedagog</h3>
              <p className="text-sm text-muted-foreground">Versiya 1.0.0</p>
            </div>
          </div>

          {/* Tavsif */}
          <div className="bg-muted p-4 rounded-lg space-y-2">
            <h4 className="font-semibold text-foreground">Platforma haqida</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Super Pedagog - bu O'zbekiston pedagogika talabalari uchun maxsus ishlab chiqilgan zamonaviy ta'lim
              platformasi. Platforma orqali siz pedagogika sohasidagi eng so'nggi maqolalar, metodikalar, kitoblar va
              videolardan foydalanishingiz mumkin.
            </p>
          </div>

          {/* Imkoniyatlar */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Asosiy imkoniyatlar:</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Pedagogika sohasidagi maqolalar va tadqiqotlar</span>
              </li>
             
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>O'quv metodikalari va qo'llanmalar</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Tanlovlar va olimpiadalar haqida ma'lumot</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>O'quv video materiallari</span>
              </li>
            </ul>
          </div>

          {/* Aloqa */}
          <div className="space-y-3 pt-4 border-t">
            <h4 className="font-semibold text-foreground">Biz bilan bog'laning:</h4>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <a href="mailto:support@superpedagog.uz">
                  <Mail className="h-4 w-4 mr-2" />
                  support@superpedagog.uz
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <a href="tel:+998901234567">
                  <Phone className="h-4 w-4 mr-2" />
                  +998 90 123 45 67
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <a href="https://superpedagog.uz" target="_blank" rel="noopener noreferrer">
                  <Globe className="h-4 w-4 mr-2" />
                  superpedagog.uz
                </a>
              </Button>
            </div>
          </div>

          
        </div>
      </DialogContent>
    </Dialog>
  )
}
