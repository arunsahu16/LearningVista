import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, User } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";

export default function Navigation() {
  const { data: user } = useQuery({
    queryKey: ['/api/user'],
  });
  const [location] = useLocation();

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <h1 className="text-2xl font-bold text-purple-600 cursor-pointer">Domestika</h1>
            </Link>
          </div>
          
          {/* Main Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="/learning-path">
                <span className={`px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                  location === '/learning-path' 
                    ? 'text-purple-600 border-b-2 border-purple-600' 
                    : 'text-gray-700 hover:text-purple-600'
                }`}>
                  My Learning
                </span>
              </Link>
              <button 
                onClick={() => {
                  // If we're on home page, scroll to AI assistant section
                  if (location === '/') {
                    document.getElementById('ai-assistant')?.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    // Navigate to home and then scroll
                    window.location.href = '/#ai-assistant';
                  }
                }}
                className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                AI Assistant
              </button>
              <button 
                onClick={() => {
                  // If we're on home page, scroll to community section
                  if (location === '/') {
                    document.getElementById('community')?.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    // Navigate to home and then scroll
                    window.location.href = '/#community';
                  }
                }}
                className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
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
                className="text-gray-600 hover:text-purple-600"
                onClick={() => {
                  // Show notification dropdown or navigate to notifications
                  alert('New: Your project analysis is ready! AI feedback available for "Abstract Composition"');
                }}
              >
                <Bell className="w-5 h-5" />
                <span className="notification-dot absolute top-1 right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </Button>
            </div>
            
            {/* Profile */}
            <div className="relative">
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-purple-600">
                <Avatar className="w-8 h-8">
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
