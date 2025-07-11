import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Play, Lightbulb, Users, Trophy, Medal, Star, Route } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import type { LearningProgress } from "@shared/schema";

export default function LearningJourney() {
  const { data: learningProgress = [] } = useQuery<LearningProgress[]>({
    queryKey: ['/api/learning-progress'],
  });

  const quickActions = [
    { icon: Play, label: "Continue Last Course", color: "purple" },
    { icon: Lightbulb, label: "AI Skill Assessment", color: "blue" },
    { icon: Users, label: "Join Study Group", color: "teal" },
  ];

  const achievements = [
    { icon: Trophy, label: "Course Completed", description: "Digital Painting Basics", color: "yellow" },
    { icon: Medal, label: "Skill Badge Earned", description: "Color Theory Master", color: "green" },
    { icon: Star, label: "Community Recognition", description: "Top Creator This Month", color: "purple" },
  ];

  return (
    <section className="animate-slide-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Your Learning Journey</h2>
          <p className="text-gray-600 mt-1">Track your progress and discover new skills</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/learning-path">
            <Button className="btn-gradient text-white">
              <Route className="w-4 h-4 mr-2" />
              Create Learning Path
            </Button>
          </Link>
          <Button variant="outline" className="text-purple-600 hover:text-purple-800 font-medium">
            View All
          </Button>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {/* Progress Card */}
        <Card className="shadow-lg card-hover">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Overall Progress</span>
              <div className="w-12 h-12 btn-gradient rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {learningProgress.map((skill) => (
              <div key={skill.id}>
                <div className="flex justify-between text-sm mb-2">
                  <span>{skill.skillName}</span>
                  <span>{skill.progress}%</span>
                </div>
                <Progress value={skill.progress} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-lg card-hover">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action, index) => (
              <Button 
                key={index}
                variant="ghost" 
                className={`w-full text-left p-3 rounded-lg bg-${action.color}-50 hover:bg-${action.color}-100 transition-colors flex items-center`}
              >
                <action.icon className={`text-${action.color}-600 mr-3 w-5 h-5`} />
                <span>{action.label}</span>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Recent Achievements */}
        <Card className="shadow-lg card-hover">
          <CardHeader>
            <CardTitle>Recent Achievements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-10 h-10 bg-${achievement.color}-100 rounded-full flex items-center justify-center mr-3`}>
                  <achievement.icon className={`text-${achievement.color}-600 w-5 h-5`} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{achievement.label}</p>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
