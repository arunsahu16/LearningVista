import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Bot, Send, Paperclip, Mic, MoreHorizontal, Palette, Upload, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { ChatMessage, Activity } from "@shared/schema";

export default function AIAssistantChat() {
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();

  const { data: chatMessages = [] } = useQuery<ChatMessage[]>({
    queryKey: ['/api/chat/messages'],
  });

  const { data: activities = [] } = useQuery<Activity[]>({
    queryKey: ['/api/activities'],
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await apiRequest("POST", "/api/chat/messages", { message });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/chat/messages'] });
      setMessage("");
    },
  });

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessageMutation.mutate(message);
    }
  };

  const formatTime = (date: Date | string | undefined) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getActivityIcon = (action: string) => {
    if (action.includes("palette")) return Palette;
    if (action.includes("upload")) return Upload;
    if (action.includes("feedback")) return MessageCircle;
    return MessageCircle;
  };

  const getActivityTimeAgo = (date: Date | string | undefined) => {
    if (!date) return "";
    const d = new Date(date);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours === 0) return "Just now";
    if (diffInHours === 1) return "1 hour ago";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    return `${Math.floor(diffInHours / 24)} day${Math.floor(diffInHours / 24) > 1 ? 's' : ''} ago`;
  };

  return (
    <section className="animate-slide-up">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="w-10 h-10 mr-3">
                    <AvatarFallback className="btn-gradient">
                      <Bot className="w-5 h-5 text-white" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-xl">AI Creative Assistant</CardTitle>
                    <p className="text-sm text-green-600">Online • Ready to help</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Chat Messages */}
              <div className="h-80 overflow-y-auto mb-4 space-y-4 custom-scrollbar">
                {chatMessages.length === 0 && (
                  <div className="flex items-start chat-bubble">
                    <Avatar className="w-8 h-8 mr-3">
                      <AvatarFallback className="btn-gradient">
                        <Bot className="w-4 h-4 text-white" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                      <p className="text-sm text-gray-800">
                        Hi! I'm here to help you with your creative projects. What would you like to work on today?
                      </p>
                      <span className="text-xs text-gray-500 mt-1 block">
                        {formatTime(new Date())}
                      </span>
                    </div>
                  </div>
                )}
                
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`flex items-start chat-bubble ${msg.isAi ? '' : 'justify-end'}`}>
                    {msg.isAi && (
                      <Avatar className="w-8 h-8 mr-3">
                        <AvatarFallback className="btn-gradient">
                          <Bot className="w-4 h-4 text-white" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div className={`rounded-lg p-3 max-w-xs ${msg.isAi ? 'bg-gray-100' : 'btn-gradient text-white mr-3'}`}>
                      <p className={`text-sm ${msg.isAi ? 'text-gray-800' : 'text-white'}`}>
                        {msg.message}
                      </p>
                      <span className={`text-xs mt-1 block ${msg.isAi ? 'text-gray-500' : 'text-white opacity-75'}`}>
                        {formatTime(msg.createdAt)}
                      </span>
                    </div>
                    {!msg.isAi && (
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=40&h=40" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="flex items-center space-x-3">
                <div className="flex-1 relative">
                  <Input
                    placeholder="Ask your AI assistant anything..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="pr-20"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-2">
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Mic className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <Button 
                  onClick={handleSendMessage}
                  disabled={sendMessageMutation.isPending}
                  className="btn-gradient text-white"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity & Progress */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {activities.slice(0, 3).map((activity) => {
                const ActivityIcon = getActivityIcon(activity.action);
                return (
                  <div key={activity.id} className="flex items-center">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <ActivityIcon className="text-purple-600 w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">{getActivityTimeAgo(activity.createdAt)}</p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Weekly Progress */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">This Week's Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Projects Created</span>
                  <span className="font-semibold">3</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>AI Interactions</span>
                  <span className="font-semibold">28</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Skills Improved</span>
                  <span className="font-semibold">2</span>
                </div>
                <Progress value={40} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
