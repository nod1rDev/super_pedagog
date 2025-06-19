"use client";

import { useState, useRef, useEffect } from "react";
import {
  Send,
  Image,
  Mic,
  Book,
  Users,
  FileCheck,
  ArrowLeft,
  Bot,
  Sparkles,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";

const quickPrompts = [
  {
    title: "Dars",
    prompt: "Dars rejasi tuzishda yordam bering",
    icon: Book,
  },
  {
    title: "Test",
    prompt: "Test tuzishda yordam bering",
    icon: FileCheck,
  },
  {
    title: "Maslahat",
    prompt: "Pedagogik maslahat bering",
    icon: Users,
  },
];

export default function AiChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSend = async (content: string) => {
    if (!content.trim()) return;

    const newMessage: any = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // AI response simulation
      setTimeout(() => {
        const response: any = {
          id: (Date.now() + 1).toString(),
          content: "Savolingiz qabul qilindi. Tez orada javob beraman.",
          role: "assistant",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, response]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Handle image upload
      const reader = new FileReader();
      reader.onload = (e) => {
        const newMessage: any = {
          id: Date.now().toString(),
          content: "Rasm yuborildi",
          role: "user",
          timestamp: new Date(),
          attachments: [e.target?.result as string],
        };
        setMessages((prev) => [...prev, newMessage]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVoice = () => {
    if (!isRecording) {
      // Start recording
      setIsRecording(true);
      // Add voice recording logic here
    } else {
      // Stop recording and send
      setIsRecording(false);
    }
  };

  // Avtomatik scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-[calc(100dvh-3rem)] bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b">
        <div className="flex h-12 items-center px-2 gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="hover:bg-transparent"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-2 flex-1">
            <div className="relative flex-shrink-0">
              <Bot className="h-6 w-6 text-primary" />
              <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-yellow-400 animate-pulse" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium truncate">AI Yordamchi</span>
              <span className="text-[10px] text-muted-foreground">
                {isLoading ? "Yozmoqda..." : "Online"}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Prompts */}
        <div className="flex gap-1.5 px-2 py-1.5 border-t overflow-x-auto scrollbar-none">
          {quickPrompts.map((prompt) => (
            <Button
              key={prompt.title}
              variant="outline"
              size="sm"
              onClick={() => handleSend(prompt.prompt)}
              className="flex-shrink-0 h-7 px-2.5 text-xs rounded-full border-primary/20 hover:bg-primary/5"
            >
              <prompt.icon className="h-3 w-3 mr-1.5 text-primary" />
              {prompt.title}
            </Button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <ScrollArea ref={scrollRef} className="flex-1 px-2 py-4">
        <div className="space-y-3 max-w-lg mx-auto">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`
                  rounded-2xl px-4 py-2 max-w-[85%] shadow-sm
                  ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-white dark:bg-gray-800"
                  }
                `}
              >
                {msg.attachments?.map((att: string) => (
                  <img
                    key={att}
                    src={att}
                    alt="Attached"
                    className="max-w-[200px] rounded-lg mb-2"
                  />
                ))}
                <p className="text-[13px] leading-relaxed whitespace-pre-wrap">
                  {msg.content}
                </p>
                <span className="text-[10px] opacity-70 mt-1 block">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-gray-800 rounded-2xl px-4 py-2 shadow-sm">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input area */}
      <div className="border-t bg-background mb-3 p-2">
        <div className="flex items-center gap-1.5 max-w-lg mx-auto">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileUpload}
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
            className="h-9 w-9 rounded-full hover:bg-primary/5"
          >
            <Image className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleVoice}
            className={`
              h-9 w-9 rounded-full hover:bg-primary/5
              ${isRecording ? "text-red-500 animate-pulse" : ""}
            `}
          >
            <Mic className="h-4 w-4" />
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Xabar yozing..."
            className="h-9 text-sm rounded-full border-primary/20 focus-visible:ring-primary/20"
            onKeyPress={(e) => e.key === "Enter" && handleSend(input)}
          />
          <Button
            onClick={() => handleSend(input)}
            disabled={!input.trim() || isLoading}
            size="icon"
            className="h-9 w-9 rounded-full"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
