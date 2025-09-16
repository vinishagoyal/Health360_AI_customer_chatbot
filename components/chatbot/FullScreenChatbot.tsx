"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  X,
  Send,
  Bot,
  User,
  Clock,
  CheckCircle,
  MessageSquare,
  Minimize2
} from "lucide-react";
import { getOpenRouterClient, OpenRouterMessage } from "@/lib/openrouter";
import { buildChatContext, buildSystemPrompt } from "@/lib/chat-context";
import { Product } from "@/data/types";
import { MarkdownMessage } from "./MarkdownMessage";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  status?: "sent" | "delivered" | "read";
}

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
}

const sampleResponses = {
  greeting: "Hello! I'm your Health360 AI assistant. I'm here to help you with questions about our health supplements, orders, and general inquiries. How can I assist you today?",
  productHelp: "I can help you find the right supplements for your needs! We offer vitamins, minerals, herbal supplements, probiotics, omega-3, and protein products. What specific health goals are you looking to support?",
  orderHelp: "I can help you track your orders, check delivery status, or answer questions about returns and refunds. Could you please provide your order number or email address?",
  generalHelp: "I'm here to help with any questions about Health360 products, orders, or general wellness inquiries. What would you like to know more about?",
  fallback: "I understand you're asking about that. Let me connect you with a human agent who can provide more detailed assistance. In the meantime, is there anything else I can help you with?"
};

interface FullScreenChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FullScreenChatbot({ isOpen, onClose }: FullScreenChatbotProps) {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: "1",
      content: sampleResponses.greeting,
      sender: "bot",
      timestamp: new Date(),
      status: "read"
    }
  ]);
  const [inputValue, setInputValue] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = React.useState<string | null>(null);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Initialize chat context and system prompt
  const [chatContext, setChatContext] = React.useState<{
    products: Product[];
    categories: string[];
    inventorySummary: Record<string, number>;
    businessInfo: {
      name: string;
      shipping: string;
      returns: string;
      support: string;
    };
  } | null>(null);
  
  const [systemPrompt, setSystemPrompt] = React.useState<string>("");
  
  React.useEffect(() => {
    const initializeChatContext = async () => {
      const context = await buildChatContext();
      setChatContext(context);
      setSystemPrompt(buildSystemPrompt(context));
    };
    
    initializeChatContext();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  React.useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  // Handle escape key to close
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    try {
      setError(null);
      
      if (!chatContext) {
        return "I'm still loading product information. Please try again in a moment.";
      }

      const conversationHistory: OpenRouterMessage[] = [
        { role: "system", content: systemPrompt },
        ...messages
          .filter(msg => msg.sender !== "bot" || msg.id !== "1")
          .map(msg => ({
            role: msg.sender === "user" ? "user" as const : "assistant" as const,
            content: msg.content
          })),
        { role: "user", content: userMessage }
      ];

      const client = getOpenRouterClient();
      const aiResponse = await client.chat(conversationHistory, {
        temperature: 0.7,
        maxTokens: 500
      });

      return aiResponse;
    } catch (error) {
      console.error("AI Response Error:", error);
      setError("AI service temporarily unavailable");

      const lowerMessage = userMessage.toLowerCase();
      if (lowerMessage.includes("product") || lowerMessage.includes("supplement") || lowerMessage.includes("vitamin")) {
        return sampleResponses.productHelp;
      } else if (lowerMessage.includes("order") || lowerMessage.includes("shipping") || lowerMessage.includes("delivery")) {
        return sampleResponses.orderHelp;
      } else if (lowerMessage.includes("help") || lowerMessage.includes("assist")) {
        return sampleResponses.generalHelp;
      } else {
        return sampleResponses.fallback;
      }
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessageContent = inputValue.trim();
    const userMessage: Message = {
      id: Date.now().toString(),
      content: userMessageContent,
      sender: "user",
      timestamp: new Date(),
      status: "sent"
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const aiResponse = await generateAIResponse(userMessageContent);

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: "bot",
        timestamp: new Date(),
        status: "delivered"
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error("Failed to get AI response:", error);

      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment, or contact our support team directly.",
        sender: "bot",
        timestamp: new Date(),
        status: "delivered"
      };

      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions: QuickAction[] = [
    {
      id: "products",
      label: "Browse Products",
      icon: <Bot className="h-5 w-5" />,
      action: () => {
        setInputValue("I'd like to see all available products");
      }
    },
    {
      id: "orders",
      label: "Track Order",
      icon: <Clock className="h-5 w-5" />,
      action: () => {
        setInputValue("I'd like to track my order");
      }
    },
    {
      id: "support",
      label: "Get Support",
      icon: <MessageSquare className="h-5 w-5" />,
      action: () => {
        setInputValue("I need help with something");
      }
    }
  ];

  const handleQuickAction = (action: QuickAction) => {
    action.action();
    inputRef.current?.focus();
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-background">
      {/* Header */}
      <div className="flex-shrink-0 bg-primary text-primary-foreground border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">Health360 AI Assistant</h1>
                <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Online • Full Screen Mode</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-primary-foreground hover:bg-primary-foreground/20"
              >
                <Minimize2 className="h-5 w-5 mr-2" />
                Minimize
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-primary-foreground hover:bg-primary-foreground/20"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col h-[calc(100vh-80px)]">
        {/* Messages */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="max-w-4xl mx-auto p-6 space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-4 max-w-[80%]",
                    message.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                  )}
                >
                  <div className="flex-shrink-0">
                    {message.sender === "bot" ? (
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                        <Bot className="h-5 w-5 text-muted-foreground" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div
                      className={cn(
                        "rounded-2xl px-6 py-4 text-base",
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground rounded-br-sm"
                          : "bg-muted text-muted-foreground rounded-bl-sm"
                      )}
                    >
                      {message.sender === "bot" ? (
                        <MarkdownMessage 
                          content={message.content} 
                          className="text-muted-foreground [&_strong]:text-muted-foreground [&_em]:text-muted-foreground"
                        />
                      ) : (
                        message.content
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground px-2">
                      <span>{formatTime(message.timestamp)}</span>
                      {message.sender === "user" && message.status && (
                        <CheckCircle className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-4 max-w-[80%] mr-auto">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                      <Bot className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="bg-muted rounded-2xl px-6 py-4">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                      <div className="w-3 h-3 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-3 h-3 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              {messages.length === 1 && (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground font-medium">Quick Actions:</p>
                  <div className="flex flex-wrap gap-3">
                    {quickActions.map((action) => (
                      <Button
                        key={action.id}
                        variant="outline"
                        size="lg"
                        onClick={() => handleQuickAction(action)}
                        className="text-base h-12 gap-2"
                      >
                        {action.icon}
                        {action.label}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </div>

        {/* Input Area */}
        <div className="flex-shrink-0 border-t bg-card">
          <div className="max-w-4xl mx-auto p-6">
            <div className="flex gap-4">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 text-base h-12"
                data-testid="fullscreen-chatbot-input"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                size="lg"
                className="px-6 h-12"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex items-center justify-between mt-3">
              <Badge variant="secondary" className="text-sm">
                Powered by Health360 AI
              </Badge>
              <span className="text-sm text-muted-foreground">
                Press Enter to send • Esc to close
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
