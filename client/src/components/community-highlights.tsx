import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Crown, Star, Rocket } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { User } from "@shared/schema";

export default function CommunityHighlights() {
  const { data: topCreators = [] } = useQuery<User[]>({
    queryKey: ['/api/community/creators'],
  });

  const getBadgeIcon = (badgeLevel: string) => {
    switch (badgeLevel) {
      case "Master": return Crown;
      case "Expert": return Star;
      case "Rising": return Rocket;
      default: return Star;
    }
  };

  const getBadgeColor = (badgeLevel: string) => {
    switch (badgeLevel) {
      case "Master": return "from-yellow-400 to-orange-400";
      case "Expert": return "from-purple-400 to-blue-400";
      case "Rising": return "from-teal-400 to-green-400";
      default: return "from-gray-400 to-gray-500";
    }
  };

  const mockCreators = [
    {
      id: 1,
      name: "Sarah Chen",
      specialty: "Digital Illustrator",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?auto=format&fit=crop&w=40&h=40",
      badgeLevel: "Master",
      followers: 2100,
      bio: "Just completed an amazing piece exploring color psychology in digital art. The AI feedback helped me refine the emotional impact!",
      likes: 156,
      comments: 23,
    },
    {
      id: 2,
      name: "Alex Rivera",
      specialty: "UX Designer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=40&h=40",
      badgeLevel: "Expert",
      followers: 987,
      bio: "Loving the new AI-powered user journey mapping tool! It's helping me create more intuitive interfaces faster than ever.",
      likes: 89,
      comments: 12,
    },
    {
      id: 3,
      name: "Emma Thompson",
      specialty: "Brand Designer",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=40&h=40",
      badgeLevel: "Rising",
      followers: 543,
      bio: "The AI collaboration feature is a game-changer! Just launched a brand identity that perfectly captures the client's vision.",
      likes: 67,
      comments: 8,
    },
  ];

  const liveUpdates = [
    { user: "@sarah_designs", message: "Just got amazing feedback on my latest illustration! 🎨" },
    { user: "@alexux", message: "The AI helped me optimize my user flow - incredible results! 🚀" },
    { user: "@emma_brands", message: "Collaboration feature is next level! Thanks for the inspiration ✨" },
    { user: "@mike_motion", message: "AI motion suggestions saved me hours of work today! 🎬" },
  ];

  return (
    <section className="animate-slide-up">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Community Highlights</h2>
          <p className="text-gray-600 mt-2">Discover amazing work from our creative community</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="link" className="text-purple-600 hover:text-purple-800 font-medium">
            All
          </Button>
          <Button variant="link" className="text-gray-500 hover:text-purple-600">
            Featured
          </Button>
          <Button variant="link" className="text-gray-500 hover:text-purple-600">
            Rising
          </Button>
        </div>
      </div>

      {/* Badge Creator Showcase */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {mockCreators.map((creator) => {
          const BadgeIcon = getBadgeIcon(creator.badgeLevel);
          return (
            <Card key={creator.id} className="shadow-lg card-hover overflow-hidden">
              <div className="h-32 bg-gradient-to-br from-purple-100 to-blue-100"></div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Avatar className="w-8 h-8 mr-2">
                      <AvatarImage src={creator.avatar} alt={creator.name} />
                      <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900">{creator.name}</h3>
                      <p className="text-xs text-gray-600">{creator.specialty}</p>
                    </div>
                  </div>
                  <Badge className={`bg-gradient-to-r ${getBadgeColor(creator.badgeLevel)} text-white text-xs border-0`}>
                    <BadgeIcon className="w-3 h-3 mr-1" />
                    {creator.badgeLevel}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">"{creator.bio}"</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{creator.followers.toLocaleString()} followers</span>
                  <div className="flex space-x-3">
                    <span className="flex items-center">
                      <Heart className="w-4 h-4 mr-1" />
                      {creator.likes}
                    </span>
                    <span className="flex items-center">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      {creator.comments}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Sliding Comments/Updates */}
      <div className="bg-gray-100 rounded-2xl p-6 overflow-hidden">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Live Community Updates</h3>
        <div className="relative h-16 overflow-hidden">
          <div className="sliding-content whitespace-nowrap">
            {liveUpdates.map((update, index) => (
              <span key={index} className="inline-block mr-8 bg-white rounded-lg px-4 py-2 shadow-sm">
                <strong className="text-purple-600">{update.user}:</strong> 
                <span className="ml-1">{update.message}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
