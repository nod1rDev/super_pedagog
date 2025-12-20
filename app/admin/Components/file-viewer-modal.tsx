"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Download, ExternalLink } from "lucide-react"
import { API_BASE_URL } from "@/lib/BASE_URL"


interface FileViewerModalProps {
  open: boolean
  onClose: () => void
  fileUrl: string
  fileName: string
  fileType: "pdf" | "doc" | "docx" | "image" | "video"
}

export function FileViewerModal({ open, onClose, fileUrl, fileName, fileType }: FileViewerModalProps) {
  const fullUrl = fileUrl.startsWith("http") ? fileUrl : `${API_BASE_URL}${fileUrl}`

  const handleDownload = () => {
    window.open(fullUrl, "_blank")
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-[95vw] overflow-hidden sm:max-w-4xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="truncate pr-4">{fileName}</DialogTitle>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={handleDownload}>
                <Download className="mr-1 h-4 w-4" />
                Yuklab olish
              </Button>
              <Button size="sm" variant="outline" onClick={() => window.open(fullUrl, "_blank")}>
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="h-[calc(90vh-100px)] overflow-auto rounded-lg border">
          {fileType === "pdf" ? (
            <iframe src={fullUrl} className="h-full w-full" title={fileName} />
          ) : fileType === "image" ? (
            <img src={fullUrl || "/placeholder.svg"} alt={fileName} className="mx-auto h-auto max-w-full" />
          ) : fileType === "video" ? (
            <video src={fullUrl} controls className="h-full w-full">
              Brauzeringiz video qo&apos;llab-quvvatlamaydi
            </video>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
              <p className="text-muted-foreground">
                {fileType === "doc" || fileType === "docx"
                  ? "Word hujjatlarini to'g'ridan-to'g'ri ko'rish qo'llab-quvvatlanmaydi."
                  : "Faylni ko'rish mumkin emas."}
              </p>
              <Button onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Yuklab olish
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
