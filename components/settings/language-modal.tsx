"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface LanguageModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const languages = [
  { code: "uz", name: "O'zbekcha", flag: "🇺🇿" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
]

export function LanguageModal({ open, onOpenChange }: LanguageModalProps) {
  const [selectedLanguage, setSelectedLanguage] = useState("uz")
  const { toast } = useToast()

  const handleLanguageSelect = (code: string) => {
    setSelectedLanguage(code)
    toast({
      title: "Tez kunda",
      description: "Til almashish funksiyasi tez orada qo'shiladi",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Tilni tanlang</DialogTitle>
          <DialogDescription>Ilova tilini o'zgartiring</DialogDescription>
        </DialogHeader>
        <div className="space-y-2 py-4">
          {languages.map((language) => (
            <Button
              key={language.code}
              variant={selectedLanguage === language.code ? "default" : "outline"}
              className="w-full justify-between h-14"
              onClick={() => handleLanguageSelect(language.code)}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{language.flag}</span>
                <span className="font-medium">{language.name}</span>
              </div>
              {selectedLanguage === language.code && <Check className="h-5 w-5" />}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
