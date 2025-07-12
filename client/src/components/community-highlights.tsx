import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Crown, Star, Rocket, Bookmark } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@shared/schema";
import { useState } from "react";

export default function CommunityHighlights() {
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [savedPosts, setSavedPosts] = useState<Set<number>>(new Set());
  const [filter, setFilter] = useState<string>("All");

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: topCreators = [] } = useQuery<User[]>({
    queryKey: ["/api/community/creators"],
  });

  const likeMutation = useMutation({
    mutationFn: async (projectId: number) => {
      const response = await apiRequest("POST", `/api/projects/${projectId}/like`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({ title: "Liked!", description: "Thanks for showing your support!" });
    },
  });

  const handleLike = (postId: number) => {
    const newLikedPosts = new Set(likedPosts);
    newLikedPosts.has(postId) ? newLikedPosts.delete(postId) : newLikedPosts.add(postId);
    setLikedPosts(newLikedPosts);
    likeMutation.mutate(postId);
  };

  const handleSave = (postId: number) => {
    const newSavedPosts = new Set(savedPosts);
    newSavedPosts.has(postId) ? newSavedPosts.delete(postId) : newSavedPosts.add(postId);
    setSavedPosts(newSavedPosts);
    toast({ title: "Saved to Inspiration!", description: "Find it in your board later." });
  };

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
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c",
      badgeLevel: "Master",
      followers: 2100,
      bio: "Explored color psychology in art. AI helped refine emotional tone!",
      likes: 156,
      comments: 23,
      projectImage: "https://images.unsplash.com/photo-1541961017774-22349e4a1262",
      projectTitle: "Color Psychology Study",
      aiInsight: "AI suggested 3 layouts & 5 palettes for emotional impact."
    },
    {
      id: 2,
      name: "Alex Rivera",
      specialty: "UX Designer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      badgeLevel: "Expert",
      followers: 987,
      bio: "AI journey mapping tool helps create intuitive UX faster.",
      likes: 89,
      comments: 12,
      projectImage: "https://images.unsplash.com/photo-1559028006-448665bd7c7f",
      projectTitle: "Mobile Banking App",
      aiInsight: "Used AI flow suggestions and usability predictions."
    },
    {
      id: 3,
      name: "Emma Thompson",
      specialty: "Brand Designer",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      badgeLevel: "Rising",
      followers: 543,
      bio: "Launched identity capturing client vision via AI co-creation.",
      likes: 67,
      comments: 8,
      projectImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
      projectTitle: "Sustainable Fashion Brand",
      aiInsight: "AI offered naming concepts and visual consistency checks."
    },
  ];

  const liveUpdates = [
    { user: "@sarah_designs", message: "Got amazing feedback on my latest work! 🎨" },
    { user: "@alexux", message: "AI optimized my UX flows — mind blown! 🚀" },
    { user: "@emma_brands", message: "Love the AI collab features 💫" },
    { user: "@mike_motion", message: "AI motion ideas saved hours today! 🎬" },
  ];

  return (
    <section className="animate-slide-up px-4 md:px-8 py-10 bg-gradient-to-br from-[#1c1c3a] via-[#2a2a4d] to-[#0c0c1e] text-white">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-4xl font-extrabold text-white">Community Highlights</h2>
          <p className="text-gray-300 mt-2">Discover amazing work from our creative community</p>
        </div>
        <div className="flex space-x-3">
          {['All', 'UX Designer', 'Digital Illustrator', 'Brand Designer'].map(cat => (
            <Button
              key={cat}
              variant={filter === cat ? "secondary" : "ghost"}
              className="text-sm"
              onClick={() => setFilter(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {mockCreators.filter(c => filter === "All" || c.specialty === filter).map((creator) => {
          const BadgeIcon = getBadgeIcon(creator.badgeLevel);
          return (
            <Card
              key={creator.id}
              className="bg-[#12122a] border border-gray-700 shadow-lg hover:scale-[1.02] transition-transform duration-300 overflow-hidden"
            >
              <div className="relative h-52 overflow-hidden">
                <img src={creator.projectImage} alt={creator.projectTitle} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 z-10">
                  <Badge className={`bg-gradient-to-r ${getBadgeColor(creator.badgeLevel)} text-white text-xs font-semibold border-none shadow-md`}>
                    <BadgeIcon className="w-3 h-3 mr-1" />
                    {creator.badgeLevel}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-5">
                <div className="flex items-center mb-4">
                  <Avatar className="w-10 h-10 mr-3">
                    <AvatarImage src={creator.avatar} />
                    <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-white">{creator.name}</h3>
                    <p className="text-xs text-gray-400">{creator.specialty}</p>
                  </div>
                  <Button size="icon" variant="ghost" className="ml-auto" onClick={() => handleSave(creator.id)}>
                    <Bookmark className={`w-4 h-4 ${savedPosts.has(creator.id) ? "text-yellow-400" : "text-gray-400"}`} />
                  </Button>
                </div>
                <h4 className="text-lg font-medium text-white mb-1">{creator.projectTitle}</h4>
                <p className="text-sm text-gray-300 italic mb-2">"{creator.bio}"</p>
                <p className="text-xs text-blue-400 mb-4">💡 {creator.aiInsight}</p>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>{creator.followers.toLocaleString()} followers</span>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleLike(creator.id)}
                      className={`flex items-center ${likedPosts.has(creator.id) ? "text-red-400" : "text-gray-400 hover:text-red-400"} transition-colors`}
                    >
                      <Heart className={`w-4 h-4 mr-1 ${likedPosts.has(creator.id) ? "fill-current" : ""}`} />
                      {creator.likes + (likedPosts.has(creator.id) ? 1 : 0)}
                    </button>
                    <div className="flex items-center text-gray-400 hover:text-blue-400 transition">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      {creator.comments}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="bg-[#191932] p-6 shadow-inner">
        <h3 className="text-2xl font-semibold text-white mb-4">Live Community Updates</h3>
        <div className="overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-purple-500">
          <div className="flex space-x-6 animate-slide-horizontal">
            {liveUpdates.map((update, index) => (
              <div key={index} className="bg-[#23234a] text-white px-4 py-2 shadow-sm">
                <strong className="text-purple-400">{update.user}:</strong>
                <span className="ml-2">{update.message}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
