import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, User } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";

type User = {
  avatar?: string;
  // add other user properties if needed
};

export default function Navigation() {
  const { data: user } = useQuery<User>({
    queryKey: ['/api/user'],
  });
  const [location] = useLocation();

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-gradient-to-br from-[#2e026d]/80 via-[#7e22ce]/80 to-[#fca5a5]/80 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <h1 className="text-2xl font-bold text-white cursor-pointer">Domestika</h1>
            </Link>
          </div>

          {/* Main Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="/learning-path">
                <span
                  className={`px-3 py-2 rounded-md text-sm font-medium cursor-pointer transition-all duration-200 ${
                    location === '/learning-path'
                      ? 'text-white border-b-2 border-white'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  My Learning
                </span>
              </Link>

              <button
                onClick={() => {
                  if (location === '/') {
                    document.getElementById('ai-assistant')?.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.location.href = '/#ai-assistant';
                  }
                }}
                className="text-white/80 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
              >
                AI Assistant
              </button>

              <button
                onClick={() => {
                  if (location === '/') {
                    document.getElementById('community')?.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.location.href = '/#community';
                  }
                }}
                className="text-white/80 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
              >
                Community
              </button>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-yellow-300 transition"
                onClick={() => {
                  alert('New: Your project analysis is ready! AI feedback available for "Abstract Composition"');
                }}
              >
                <Bell className="w-5 h-5" />
                <span className="notification-dot absolute top-1 right-1 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white"></span>
              </Button>
            </div>

            {/* Profile */}
            <div className="relative">
              <Button variant="ghost" size="icon" className="text-white hover:text-purple-200 transition">
                <Avatar className="w-8 h-8 border border-white/30">
                  <AvatarImage src={user?.avatar} alt="Profile" />
                  <AvatarFallback>
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
