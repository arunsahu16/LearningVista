import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, RefreshCw } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { TrendingTopic } from "@shared/schema";

export default function TrendingTopics() {
  const queryClient = useQueryClient();

  const { data: trendingTopics = [] } = useQuery<TrendingTopic[]>({
    queryKey: ['/api/trending'],
  });

  const refreshMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/trending/refresh", {});
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/trending'] });
    },
  });

  const groupedTopics = trendingTopics.reduce((acc, topic) => {
    if (!acc[topic.platform]) {
      acc[topic.platform] = [];
    }
    acc[topic.platform].push(topic);
    return acc;
  }, {} as Record<string, TrendingTopic[]>);

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "Instagram": return "fab fa-instagram";
      case "Dribbble": return "fab fa-dribbble";
      case "Behance": return "fab fa-behance";
      default: return "fas fa-chart-line";
    }
  };

  const formatLastUpdate = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <section className="animate-slide-up">
      <div className="trending-gradient rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Trending Creative Topics</h2>
            <p className="opacity-90 mt-2">Real-time insights from multiple platforms</p>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-75">Last updated</p>
            <div className="flex items-center gap-2">
              <p className="font-semibold">{formatLastUpdate()}</p>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => refreshMutation.mutate()}
                disabled={refreshMutation.isPending}
                className="text-white hover:bg-white/20 h-8 w-8"
              >
                <RefreshCw className={`w-4 h-4 ${refreshMutation.isPending ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {Object.entries(groupedTopics).map(([platform, topics]) => (
            <Card key={platform} className="bg-white/10 backdrop-blur-sm border-0">
              <CardContent className="p-4">
                <div className="flex items-center mb-3">
                  <i className={`${getPlatformIcon(platform)} text-2xl mr-3`}></i>
                  <h3 className="font-semibold text-white">{platform}</h3>
                </div>
                <div className="space-y-2">
                  {topics.slice(0, 3).map((topic) => (
                    <div key={topic.id} className="flex items-center justify-between">
                      <span className="text-sm text-white">{topic.topic}</span>
                      <Badge variant="secondary" className="text-xs bg-white/20 text-white border-0">
                        {topic.engagement}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button 
            variant="ghost" 
            className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300"
          >
            <TrendingUp className="w-5 h-5 mr-2" />
            View Detailed Analytics
          </Button>
        </div>
      </div>
    </section>
  );
}
