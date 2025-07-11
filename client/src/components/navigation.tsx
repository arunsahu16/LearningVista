import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, User } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function Navigation() {
  const { data: user } = useQuery({
    queryKey: ['/api/user'],
  });

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-purple-600">Domestika</h1>
          </div>
          
          {/* Main Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#" className="text-purple-600 hover:text-purple-800 px-3 py-2 rounded-md text-sm font-medium border-b-2 border-purple-600">
                My Learning
              </a>
              <a href="#" className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                AI Assistant
              </a>
              <a href="#" className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Community
              </a>
            </div>
          </div>
          
          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-purple-600">
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
