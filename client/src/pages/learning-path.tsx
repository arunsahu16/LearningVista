import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle, Clock, Star, Target, Lightbulb, Book, Trophy, PlayCircle, Users, Award } from "lucide-react";
import { Link } from "wouter";

export default function LearningPath() {
  const [selectedGoal, setSelectedGoal] = useState("");
  const [experienceLevel, setExperienceLevel] = useState(0);
  const [timeCommitment, setTimeCommitment] = useState(5);
  const [preferredStyle, setPreferredStyle] = useState("");
  const [showRoadmap, setShowRoadmap] = useState(false);

  const creativeGoals = [
    "Digital Illustration", "Photography", "Animation",
    "UI/UX Design", "Watercolor", "Character Design"
  ];

  const styleOptions = [
    "Realistic", "Abstract", "Minimalist", "Vintage", "Modern", "Experimental"
  ];

  const experienceLabels = ["Complete Beginner", "Some Experience", "Intermediate", "Advanced"];
  
  const generateRoadmap = () => {
    setShowRoadmap(true);
  };

  const mockRoadmap = {
    "Digital Illustration": {
      duration: "12 weeks",
      phases: [
        {
          title: "Foundation Skills",
          weeks: "1-3",
          skills: ["Digital Drawing Basics", "Tool Mastery", "Color Theory"],
          progress: 100
        },
        {
          title: "Character Development",
          weeks: "4-6",
          skills: ["Anatomy", "Expressions", "Poses"],
          progress: 65
        },
        {
          title: "Environment Design",
          weeks: "7-9",
          skills: ["Perspective", "Lighting", "Composition"],
          progress: 30
        },
        {
          title: "Portfolio Creation",
          weeks: "10-12",
          skills: ["Style Development", "Project Planning", "Presentation"],
          progress: 0
        }
      ]
    }
  };

  const allCourses = [
    {
      title: "Digital Painting Fundamentals",
      instructor: "Maria Garcia",
      duration: "6 weeks",
      rating: 4.9,
      students: 1247,
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop"
    },
    {
      title: "Character Design Masterclass",
      instructor: "Alex Chen",
      duration: "8 weeks",
      rating: 4.8,
      students: 892,
      level: "Intermediate",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
    },
    {
      title: "Advanced Digital Illustration",
      instructor: "Sophie Williams",
      duration: "10 weeks",
      rating: 4.9,
      students: 654,
      level: "Advanced",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop"
    },
    {
      title: "Photography Composition",
      instructor: "David Park",
      duration: "4 weeks",
      rating: 4.7,
      students: 2103,
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop"
    },
    {
      title: "Animation Principles",
      instructor: "Lisa Rodriguez",
      duration: "12 weeks",
      rating: 4.8,
      students: 567,
      level: "Intermediate",
      image: "https://images.unsplash.com/photo-1626379616459-b2ce1d9877c3?w=400&h=300&fit=crop"
    },
    {
      title: "UI/UX Design Complete",
      instructor: "Michael Thompson",
      duration: "8 weeks",
      rating: 4.9,
      students: 1834,
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=400&h=300&fit=crop"
    }
  ];

  const currentRoadmap = mockRoadmap[selectedGoal as keyof typeof mockRoadmap] || mockRoadmap["Digital Illustration"];

  if (showRoadmap) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                onClick={() => setShowRoadmap(false)}
                className="mr-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Setup
              </Button>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {selectedGoal || "Digital Illustration"} Learning Path
                </h1>
                <p className="text-gray-600 mt-1">
                  Your personalized {currentRoadmap.duration} journey
                </p>
              </div>
            </div>
            <Button 
              className="btn-gradient text-white"
              onClick={() => {
                document.getElementById('all-courses')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Book className="w-4 h-4 mr-2" />
              View All Courses
            </Button>
          </div>

          {/* Roadmap Overview */}
          <Card className="mb-8 shadow-lg">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900">{selectedGoal || "Digital Illustration"}</h3>
                  <p className="text-sm text-gray-600">Primary Goal</p>
                </div>
                <div className="text-center">
                  <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900">{currentRoadmap.duration}</h3>
                  <p className="text-sm text-gray-600">Total Duration</p>
                </div>
                <div className="text-center">
                  <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900">{timeCommitment}h/week</h3>
                  <p className="text-sm text-gray-600">Time Commitment</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Learning Phases */}
          <div className="space-y-6 mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Learning Roadmap</h2>
            {currentRoadmap.phases.map((phase, index) => (
              <Card key={index} className="shadow-lg card-hover">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center">
                        {phase.progress === 100 ? (
                          <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                        ) : phase.progress > 0 ? (
                          <PlayCircle className="w-5 h-5 text-blue-600 mr-2" />
                        ) : (
                          <Clock className="w-5 h-5 text-gray-400 mr-2" />
                        )}
                        {phase.title}
                      </CardTitle>
                      <p className="text-sm text-gray-600">Weeks {phase.weeks}</p>
                    </div>
                    <Badge variant={phase.progress === 100 ? "default" : phase.progress > 0 ? "secondary" : "outline"}>
                      {phase.progress === 100 ? "Completed" : phase.progress > 0 ? "In Progress" : "Upcoming"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Progress</span>
                      <span className="text-sm text-gray-600">{phase.progress}%</span>
                    </div>
                    <Progress value={phase.progress} className="h-2" />
                    <div className="flex flex-wrap gap-2">
                      {phase.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* All Courses Section */}
          <div id="all-courses" className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">All Available Courses</h2>
              <Button variant="outline">
                <Trophy className="w-4 h-4 mr-2" />
                View Certificates
              </Button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allCourses.map((course, index) => (
                <Card key={index} className="shadow-lg card-hover cursor-pointer">
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="bg-white/90">
                        {course.level}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{course.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">by {course.instructor}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {course.duration}
                      </span>
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {course.students.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="text-sm font-medium">{course.rating}</span>
                      </div>
                      <Button size="sm" className="btn-gradient text-white">
                        Enroll Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-8">
          <Link href="/">
            <Button variant="ghost" className="mr-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Create Your Learning Path</h1>
        </div>

        <div className="space-y-8">
          {/* Creative Goal Selection */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2" />
                What's your creative goal?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {creativeGoals.map((goal) => (
                  <Button
                    key={goal}
                    variant={selectedGoal === goal ? "default" : "outline"}
                    className={selectedGoal === goal ? "btn-gradient text-white" : ""}
                    onClick={() => setSelectedGoal(goal)}
                  >
                    {goal}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Experience Level */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="w-5 h-5 mr-2" />
                Experience Level
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <input
                  type="range"
                  min="0"
                  max="3"
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  {experienceLabels.map((label, index) => (
                    <span key={index} className={index === experienceLevel ? "font-medium text-purple-600" : ""}>
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Time Commitment */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Time Commitment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Hours per week</span>
                  <span className="text-lg font-semibold text-purple-600">{timeCommitment}h</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={timeCommitment}
                  onChange={(e) => setTimeCommitment(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>1h</span>
                  <span>10h</span>
                  <span>20h</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Style Preference */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lightbulb className="w-5 h-5 mr-2" />
                Preferred Style
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {styleOptions.map((style) => (
                  <Button
                    key={style}
                    variant={preferredStyle === style ? "default" : "outline"}
                    className={preferredStyle === style ? "btn-gradient text-white" : ""}
                    onClick={() => setPreferredStyle(style)}
                  >
                    {style}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Generate Roadmap */}
          <div className="text-center">
            <Button
              size="lg"
              className="btn-gradient text-white px-8 py-4 text-lg"
              onClick={generateRoadmap}
              disabled={!selectedGoal}
            >
              <Trophy className="w-5 h-5 mr-2" />
              Generate My Learning Roadmap
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}