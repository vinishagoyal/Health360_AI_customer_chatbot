"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  User,
  Clock,
  CheckCircle
} from "lucide-react";

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

const quickActions: QuickAction[] = [
  {
    id: "products",
    label: "Browse Products",
    icon: <Bot className="h-4 w-4" />,
    action: () => {}
  },
  {
    id: "orders",
    label: "Track Order",
    icon: <Clock className="h-4 w-4" />,
    action: () => {}
  },
  {
    id: "support",
    label: "Get Support",
    icon: <MessageSquare className="h-4 w-4" />,
    action: () => {}
  }
];

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = React.useState(false);
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
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

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

  const generateBotResponse = (userMessage: string): string => {
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
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      sender: "user",
      timestamp: new Date(),
      status: "sent"
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateBotResponse(inputValue),
        sender: "bot",
        timestamp: new Date(),
        status: "delivered"
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickAction = (action: QuickAction) => {
    setInputValue(`I'd like to ${action.label.toLowerCase()}`);
    inputRef.current?.focus();
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 p-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-6rem)] shadow-2xl transition-all duration-300">
          <Card className="h-full flex flex-col border-0 rounded-xl overflow-hidden">
            {/* Header */}
            <CardHeader className="pb-3 bg-primary text-primary-foreground">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-semibold">Health360 AI Assistant</CardTitle>
                    <div className="flex items-center gap-1 text-xs text-primary-foreground/80">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>Online</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 p-0 text-primary-foreground hover:bg-primary-foreground/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <Separator />

            {/* Messages Area */}
            <CardContent className="flex-1 p-0">
              <ScrollArea className="h-full p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex gap-3 max-w-[85%]",
                        message.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                      )}
                    >
                      <div className="flex-shrink-0">
                        {message.sender === "bot" ? (
                          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                            <Bot className="h-4 w-4 text-muted-foreground" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-primary-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="space-y-1">
                        <div
                          className={cn(
                            "rounded-2xl px-4 py-2 text-sm",
                            message.sender === "user"
                              ? "bg-primary text-primary-foreground rounded-br-sm"
                              : "bg-muted text-muted-foreground rounded-bl-sm"
                          )}
                        >
                          {message.content}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{formatTime(message.timestamp)}</span>
                          {message.sender === "user" && message.status && (
                            <CheckCircle className="h-3 w-3" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex gap-3 max-w-[85%] mr-auto">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                          <Bot className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                      <div className="bg-muted rounded-2xl px-4 py-2">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Quick Actions */}
                  {messages.length === 1 && (
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground font-medium">Quick Actions:</p>
                      <div className="flex flex-wrap gap-2">
                        {quickActions.map((action) => (
                          <Button
                            key={action.id}
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuickAction(action)}
                            className="text-xs h-8 gap-1"
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
            </CardContent>

            <Separator />

            {/* Input Area */}
            <div className="p-4 border-t bg-card">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  size="sm"
                  className="px-3"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between mt-2">
                <Badge variant="secondary" className="text-xs">
                  Powered by Health360 AI
                </Badge>
                <span className="text-xs text-muted-foreground">
                  Press Enter to send
                </span>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
