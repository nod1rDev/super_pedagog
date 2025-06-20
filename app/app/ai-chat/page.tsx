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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  const [isLoading, setIsLoading] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Add effect to detect keyboard
  useEffect(() => {
    const handleResize = () => {
      const isKeyboard = window.innerHeight < window.outerHeight * 0.75;
      setIsKeyboardOpen(isKeyboard);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSend = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const newMessage = {
      id: Date.now().toString(),
      content: content.trim(),
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsLoading(true);

    // AI response simulation
    setTimeout(() => {
      const response = {
        id: (Date.now() + 1).toString(),
        content: "Savolingiz qabul qilindi. Tez orada javob beraman.",
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, response]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <main className="flex flex-col h-[100dvh] bg-background relative">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="flex h-14 items-center px-4 gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Bot className="h-6 w-6 text-primary" />
              <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-yellow-400 animate-pulse" />
            </div>
            <div>
              <h1 className="text-sm font-medium">AI Yordamchi</h1>
              <p className="text-xs text-muted-foreground">
                {isLoading ? "Yozmoqda..." : "Online"}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Prompts */}
        <div className="flex gap-2 p-2 overflow-x-auto">
          {quickPrompts.map((prompt) => (
            <Button
              key={prompt.title}
              variant="outline"
              size="sm"
              onClick={() => handleSend(prompt.prompt)}
              className="flex-none"
            >
              <prompt.icon className="h-4 w-4 mr-2" />
              {prompt.title}
            </Button>
          ))}
        </div>
      </header>

      {/* Chat Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4"
        style={{
          paddingBottom: isKeyboardOpen ? "80px" : "120px",
          paddingTop: "20px",
        }}
      >
        <div className="max-w-2xl mx-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`
                  max-w-[80%] rounded-lg px-4 py-2
                  ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }
                `}
              >
                <p className="text-sm">{msg.content}</p>
                <time className="text-xs opacity-70 mt-1 block">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </time>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Area - Updated positioning */}
      <div
        className={`
          fixed left-0 right-0 
          ${isKeyboardOpen ? "bottom-0" : "bottom-16"} 
          border-t bg-background/95 backdrop-blur 
          transition-all duration-200 ease-in-out
          p-4 z-50
        `}
      >
        <div className="max-w-2xl mx-auto flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend(input)}
            onFocus={() => setIsKeyboardOpen(true)}
            onBlur={() => setIsKeyboardOpen(false)}
            placeholder="Xabar yozing..."
            className="flex-1 bg-background"
          />
          <Button
            onClick={() => handleSend(input)}
            disabled={!input.trim() || isLoading}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </main>
  );
}
