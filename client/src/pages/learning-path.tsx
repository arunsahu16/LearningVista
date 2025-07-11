import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle, Clock, Star, Target, Lightbulb, Book, Trophy } from "lucide-react";
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

  const currentRoadmap = mockRoadmap[selectedGoal as keyof typeof mockRoadmap] || mockRoadmap["Digital Illustration"];

  if (showRoadmap) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center mb-8">
            <Button 
              variant="ghost" 
              onClick={() => setShowRoadmap(false)}
              className="mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Setup
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Your Personalized Learning Roadmap</h1>
          </div>

          {/* Roadmap Overview */}
          <Card className="mb-8 shadow-lg">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900">{selectedGoal}</h3>
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
          <div className="space-y-6">
            {currentRoadmap.phases.map((phase, index) => (
              <Card key={index} className="shadow-lg card-hover">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center">
                        {phase.progress === 100 ? (
                          <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                        ) : phase.progress > 0 ? (
                          <div className="w-5 h-5 rounded-full border-2 border-blue-600 bg-blue-100 mr-2" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-gray-300 mr-2" />
                        )}
                        {phase.title}
                      </CardTitle>
                      <p className="text-sm text-gray-600">Weeks {phase.weeks}</p>
                    </div>
                    <Badge 
                      variant={phase.progress === 100 ? "default" : phase.progress > 0 ? "secondary" : "outline"}
                      className={phase.progress === 100 ? "bg-green-100 text-green-800" : ""}
                    >
                      {phase.progress}% Complete
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Progress value={phase.progress} className="mb-4" />
                  <div className="grid sm:grid-cols-3 gap-2">
                    {phase.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="flex items-center text-sm">
                        <Book className="w-4 h-4 text-purple-600 mr-2 flex-shrink-0" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link href="/">
              <Button className="btn-gradient text-white flex-1">
                <Trophy className="w-4 h-4 mr-2" />
                Start Learning Journey
              </Button>
            </Link>
            <Button variant="outline" className="flex-1">
              <Lightbulb className="w-4 h-4 mr-2" />
              Get AI Recommendations
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Let's Create Your Perfect Learning Path
          </h1>
          <p className="text-lg text-gray-600">
            Tell us about your goals, and our AI will design a personalized journey just for you.
          </p>
        </div>

        <div className="space-y-8">
          {/* Primary Goal Selection */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 text-purple-600 mr-2" />
                What do you want to learn?
              </CardTitle>
              <p className="text-gray-600">Choose your primary creative goal</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {creativeGoals.map((goal) => (
                  <Button
                    key={goal}
                    variant={selectedGoal === goal ? "default" : "outline"}
                    className={`h-auto p-4 ${selectedGoal === goal ? "btn-gradient text-white" : ""}`}
                    onClick={() => setSelectedGoal(goal)}
                  >
                    {goal}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Experience Level */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="w-5 h-5 text-blue-600 mr-2" />
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
                  <div className="text-center">
                    <p className="font-semibold text-gray-900">
                      {experienceLabels[experienceLevel]}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Time Commitment */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 text-green-600 mr-2" />
                  Time Commitment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={timeCommitment}
                    onChange={(e) => setTimeCommitment(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="text-center">
                    <p className="font-semibold text-gray-900">
                      {timeCommitment} hours per week
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preferred Style */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Preferred Style</CardTitle>
              <p className="text-gray-600">What aesthetic appeals to you most?</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {styleOptions.map((style) => (
                  <Button
                    key={style}
                    variant={preferredStyle === style ? "default" : "outline"}
                    className={`${preferredStyle === style ? "btn-gradient text-white" : ""}`}
                    onClick={() => setPreferredStyle(style)}
                  >
                    {style}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Generate Button */}
          <div className="text-center">
            <Button
              size="lg"
              onClick={generateRoadmap}
              disabled={!selectedGoal}
              className="btn-gradient text-white px-12 py-4 text-lg hover:shadow-lg transition-all duration-300"
            >
              <Lightbulb className="w-5 h-5 mr-2" />
              Generate My Learning Path
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}