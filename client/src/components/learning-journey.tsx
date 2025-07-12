import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  Play,
  Lightbulb,
  Users,
  Trophy,
  Medal,
  Star,
  Route,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import type { LearningProgress } from "@shared/schema";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

export default function LearningJourney() {
  const { data: learningProgress = [] } = useQuery<LearningProgress[]>({
    queryKey: ["/api/learning-progress"],
  });

  const quickActions = [
    { icon: Play, label: "Continue Last Course", color: "purple" },
    { icon: Lightbulb, label: "AI Skill Assessment", color: "blue" },
    { icon: Users, label: "Join Study Group", color: "green" },
  ];

  const achievements = [
    {
      icon: Trophy,
      label: "Course Completed",
      description: "Digital Painting Basics",
      color: "yellow",
    },
    {
      icon: Medal,
      label: "Skill Badge Earned",
      description: "Color Theory Master",
      color: "green",
    },
    {
      icon: Star,
      label: "Community Recognition",
      description: "Top Creator This Month",
      color: "purple",
    },
  ];

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="relative w-full py-20 px-6 bg-gradient-to-br from-[#2e026d] via-[#7e22ce] to-[#ec4899] text-white overflow-hidden"
    >
      {/* Dark film overlay */}
      <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-extrabold text-white">Your Learning Journey</h2>
            <p className="text-purple-100 mt-2 text-lg">
              Track your progress and discover new skills
            </p>
          </div>
          <div className="flex gap-4 flex-wrap">
            <Link href="/learning-path">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition">
                <Route className="w-5 h-5 mr-2" />
                Create Learning Path
              </Button>
            </Link>
            <Button className="bg-white text-purple-700 px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-100 transition">
              View All
            </Button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Progress Card */}
          <div className="bg-white/10 border border-white/20 backdrop-blur-xl rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-4 flex justify-between items-center">
              <span>Overall Progress</span>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
            </h3>
            {learningProgress.map((skill) => (
              <div key={skill.id} className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>{skill.skillName}</span>
                  <span>{skill.progress}%</span>
                </div>
                <Progress value={skill.progress} className="h-2 bg-white/20" />
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-white/10 border border-white/20 backdrop-blur-xl rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {quickActions.map((action, i) => (
                <button
                  key={i}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-white/10 text-${action.color}-300 hover:bg-white/20 transition`}
                >
                  <action.icon className={`w-5 h-5 text-${action.color}-400`} />
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white/10 border border-white/20 backdrop-blur-xl rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-4">Recent Achievements</h3>
            <div className="space-y-4">
              {achievements.map((ach, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-10 h-10 flex items-center justify-center rounded-full bg-${ach.color}-100`}>
                    <ach.icon className={`w-5 h-5 text-${ach.color}-600`} />
                  </div>
                  <div>
                    <p className="font-medium">{ach.label}</p>
                    <p className="text-sm text-purple-100">{ach.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}


