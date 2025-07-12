// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";
// import { 
//   X, 
//   Eye, 
//   Palette, 
//   Layout, 
//   Star, 
//   TrendingUp, 
//   Target, 
//   Lightbulb,
//   CheckCircle,
//   AlertTriangle,
//   ArrowRight
// } from "lucide-react";
// import { useState, useEffect } from "react";
// import type { Project } from "@shared/schema";

// interface ProjectAnalysisModalProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   project: Project | null;
// }

// export default function ProjectAnalysisModal({ open, onOpenChange, project }: ProjectAnalysisModalProps) {
//   const [analysisStep, setAnalysisStep] = useState(0);
//   const [showResults, setShowResults] = useState(false);

//   useEffect(() => {
//     if (open && project) {
//       setAnalysisStep(0);
//       setShowResults(false);

//       const steps = [
//         "Analyzing composition and layout...",
//         "Evaluating color harmony and contrast...",
//         "Assessing technical execution...",
//         "Generating improvement suggestions...",
//         "Finalizing recommendations..."
//       ];

//       let currentStep = 0;
//       const interval = setInterval(() => {
//         currentStep++;
//         setAnalysisStep(currentStep);
//         if (currentStep >= steps.length) {
//           clearInterval(interval);
//           setTimeout(() => setShowResults(true), 500);
//         }
//       }, 800);

//       return () => clearInterval(interval);
//     }
//   }, [open, project]);

//   const mockAnalysis = {
//     overallScore: 85,
//     strengths: [
//       { category: "Composition", score: 92, feedback: "Excellent use of rule of thirds and visual balance" },
//       { category: "Color Theory", score: 78, feedback: "Good color harmony, consider adding complementary accents" },
//       { category: "Technical Skills", score: 88, feedback: "Clean execution with confident brushwork" },
//       { category: "Originality", score: 82, feedback: "Unique perspective with personal style emerging" }
//     ],
//     improvements: [
//       {
//         priority: "High",
//         title: "Enhance Contrast",
//         description: "Increase the contrast between foreground and background elements to improve depth",
//         difficulty: "Beginner",
//         estimatedTime: "15 minutes"
//       },
//       {
//         priority: "Medium",
//         title: "Refine Details",
//         description: "Add more detail to the focal points to draw viewer attention",
//         difficulty: "Intermediate",
//         estimatedTime: "30 minutes"
//       },
//       {
//         priority: "Low",
//         title: "Color Temperature Balance",
//         description: "Consider warming up shadows for more atmospheric lighting",
//         difficulty: "Advanced",
//         estimatedTime: "45 minutes"
//       }
//     ],
//     nextSteps: [
//       "Practice lighting studies to improve depth perception",
//       "Experiment with limited color palettes for stronger impact",
//       "Study master works in similar style for inspiration"
//     ]
//   };

//   const getPriorityColor = (priority: string) => {
//     switch (priority) {
//       case "High": return "bg-red-100 text-red-800 border-red-200";
//       case "Medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
//       case "Low": return "bg-green-100 text-green-800 border-green-200";
//       default: return "bg-gray-100 text-gray-800 border-gray-200";
//     }
//   };

//   const getDifficultyIcon = (difficulty: string) => {
//     switch (difficulty) {
//       case "Beginner": return <Star className="w-4 h-4 text-green-600" />;
//       case "Intermediate": return <TrendingUp className="w-4 h-4 text-yellow-600" />;
//       case "Advanced": return <Target className="w-4 h-4 text-red-600" />;
//       default: return <Star className="w-4 h-4 text-gray-600" />;
//     }
//   };

//   if (!project) return null;

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl rounded-xl bg-white">
//         <DialogHeader>
//           <DialogTitle className="flex items-center justify-between border-b pb-2 mb-2">
//             <span className="flex items-center text-lg font-semibold text-gray-800">
//               <Eye className="w-5 h-5 mr-2 text-purple-600" />
//               AI Project Analysis
//             </span>
//             <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)} className="hover:bg-red-100">
//               <X className="w-5 h-5 text-gray-500 hover:text-red-600 transition" />
//             </Button>
//           </DialogTitle>
//         </DialogHeader>

//         {!showResults ? (
//           <div className="py-12 text-center space-y-6">
//             <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
//               <Eye className="w-8 h-8 text-white" />
//             </div>
//             <div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">Analyzing "{project.title}"</h3>
//               <p className="text-gray-600 mb-4">Our AI is examining your work in detail...</p>
//               <div className="max-w-md mx-auto">
//                 <Progress value={((analysisStep) / 5) * 100} className="h-2 rounded bg-gray-200" />
//                 <p className="text-sm text-gray-500 mt-2 italic">
//                   {
//                     [
//                       "Initializing analysis...",
//                       "Analyzing composition and layout...",
//                       "Evaluating color harmony and contrast...",
//                       "Assessing technical execution...",
//                       "Generating improvement suggestions...",
//                       "Finalizing recommendations..."
//                     ][analysisStep]
//                   }
//                 </p>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="space-y-6">
//             <div className="grid md:grid-cols-2 gap-6">
//               <img 
//                 src={project.imageUrl || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&h=300"} 
//                 alt={project.title || "Project"} 
//                 className="w-full h-48 object-cover rounded-xl"
//               />
//               <Card className="shadow-sm">
//                 <CardContent className="p-4 text-center">
//                   <div className="text-3xl font-bold text-purple-600 mb-2">{mockAnalysis.overallScore}/100</div>
//                   <p className="text-gray-600 mb-4">Overall Score</p>
//                   <Progress value={mockAnalysis.overallScore} className="h-3 rounded" />
//                   <p className="text-sm text-gray-500 mt-2">Excellent work! Your project shows strong technical skills and creativity.</p>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Strengths */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center">
//                   <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
//                   Strengths Analysis
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="grid md:grid-cols-2 gap-4">
//                 {mockAnalysis.strengths.map((s, i) => (
//                   <div key={i} className="border rounded-xl p-4 shadow-sm bg-gray-50">
//                     <div className="flex items-center justify-between mb-2">
//                       <h4 className="font-semibold text-gray-800">{s.category}</h4>
//                       <Badge className="bg-green-100 text-green-800">{s.score}/100</Badge>
//                     </div>
//                     <Progress value={s.score} className="h-2 rounded mb-2" />
//                     <p className="text-sm text-gray-600">{s.feedback}</p>
//                   </div>
//                 ))}
//               </CardContent>
//             </Card>

//             {/* Suggestions */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center">
//                   <Lightbulb className="w-5 h-5 text-yellow-600 mr-2" />
//                   Improvement Suggestions
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {mockAnalysis.improvements.map((imp, i) => (
//                   <div key={i} className="border rounded-xl p-4 bg-white shadow-sm">
//                     <div className="flex justify-between">
//                       <div>
//                         <h4 className="text-gray-800 font-semibold">{imp.title}</h4>
//                         <p className="text-sm text-gray-600 mt-1">{imp.description}</p>
//                         <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
//                           <span className="flex items-center">{getDifficultyIcon(imp.difficulty)}<span className="ml-1">{imp.difficulty}</span></span>
//                           <span>{imp.estimatedTime}</span>
//                         </div>
//                       </div>
//                       <Badge className={`text-xs ${getPriorityColor(imp.priority)}`}>{imp.priority}</Badge>
//                     </div>
//                   </div>
//                 ))}
//               </CardContent>
//             </Card>

//             {/* Next Steps */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center">
//                   <ArrowRight className="w-5 h-5 text-blue-600 mr-2" />
//                   Recommended Next Steps
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-3">
//                 {mockAnalysis.nextSteps.map((step, i) => (
//                   <div key={i} className="flex items-center">
//                     <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
//                     <p className="text-gray-700">{step}</p>
//                   </div>
//                 ))}
//               </CardContent>
//             </Card>

//             {/* Buttons */}
//             <div className="flex flex-col sm:flex-row gap-3 pt-4">
//               <Button className="bg-purple-600 hover:bg-purple-700 text-white flex-1 shadow-sm">
//                 <Target className="w-4 h-4 mr-2" />
//                 Apply Suggestions
//               </Button>
//               <Button variant="outline" className="flex-1">
//                 <Palette className="w-4 h-4 mr-2" />
//                 Generate Variations
//               </Button>
//               <Button variant="outline" className="flex-1">
//                 Save Analysis
//               </Button>
//             </div>
//           </div>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// }

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  X,
  Eye,
  Palette,
  Layout,
  Star,
  TrendingUp,
  Target,
  Lightbulb,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { useState, useEffect } from "react";
import type { Project } from "@shared/schema";

interface ProjectAnalysisModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project | null;
}

export default function ProjectAnalysisModal({
  open,
  onOpenChange,
  project
}: ProjectAnalysisModalProps) {
  const [analysisStep, setAnalysisStep] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (open && project) {
      setAnalysisStep(0);
      setShowResults(false);

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        setAnalysisStep(currentStep);
        if (currentStep >= 5) {
          clearInterval(interval);
          setTimeout(() => setShowResults(true), 500);
        }
      }, 800);

      return () => clearInterval(interval);
    }
  }, [open, project]);

  const mockAnalysis = {
    overallScore: 85,
    strengths: [
      {
        category: "Composition",
        score: 92,
        feedback: "Excellent use of rule of thirds and visual balance"
      },
      {
        category: "Color Theory",
        score: 78,
        feedback: "Good color harmony, consider adding complementary accents"
      },
      {
        category: "Technical Skills",
        score: 88,
        feedback: "Clean execution with confident brushwork"
      },
      {
        category: "Originality",
        score: 82,
        feedback: "Unique perspective with personal style emerging"
      }
    ],
    improvements: [
      {
        priority: "High",
        title: "Enhance Contrast",
        description:
          "Increase the contrast between foreground and background elements to improve depth",
        difficulty: "Beginner",
        estimatedTime: "15 minutes"
      },
      {
        priority: "Medium",
        title: "Refine Details",
        description: "Add more detail to the focal points to draw viewer attention",
        difficulty: "Intermediate",
        estimatedTime: "30 minutes"
      },
      {
        priority: "Low",
        title: "Color Temperature Balance",
        description: "Consider warming up shadows for more atmospheric lighting",
        difficulty: "Advanced",
        estimatedTime: "45 minutes"
      }
    ],
    nextSteps: [
      "Practice lighting studies to improve depth perception",
      "Experiment with limited color palettes for stronger impact",
      "Study master works in similar style for inspiration"
    ]
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return <Star className="w-4 h-4 text-green-600" />;
      case "Intermediate":
        return <TrendingUp className="w-4 h-4 text-yellow-600" />;
      case "Advanced":
        return <Target className="w-4 h-4 text-red-600" />;
      default:
        return <Star className="w-4 h-4 text-gray-600" />;
    }
  };

  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl rounded-xl bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center text-lg font-semibold text-gray-800">
            <Eye className="w-5 h-5 mr-2 text-purple-600" />
            AI Project Analysis
          </DialogTitle>
        </DialogHeader>

        {!showResults ? (
          <div className="py-12 text-center space-y-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Analyzing "{project.title}"
              </h3>
              <p className="text-gray-600 mb-4">Our AI is examining your work in detail...</p>
              <div className="max-w-md mx-auto">
                <Progress value={(analysisStep / 5) * 100} className="h-2 rounded bg-gray-200" />
                <p className="text-sm text-gray-500 mt-2 italic">
                  {
                    [
                      "Initializing analysis...",
                      "Analyzing composition and layout...",
                      "Evaluating color harmony and contrast...",
                      "Assessing technical execution...",
                      "Generating improvement suggestions...",
                      "Finalizing recommendations..."
                    ][analysisStep]
                  }
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <img
                src={
                  project.imageUrl ||
                  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&h=300"
                }
                alt={project.title || "Project"}
                className="w-full h-48 object-cover rounded-xl"
              />
              <Card className="shadow-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {mockAnalysis.overallScore}/100
                  </div>
                  <p className="text-gray-600 mb-4">Overall Score</p>
                  <Progress value={mockAnalysis.overallScore} className="h-3 rounded" />
                  <p className="text-sm text-gray-500 mt-2">
                    Excellent work! Your project shows strong technical skills and creativity.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Strengths */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  Strengths Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                {mockAnalysis.strengths.map((s, i) => (
                  <div key={i} className="border rounded-xl p-4 shadow-sm bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-800">{s.category}</h4>
                      <Badge className="bg-green-100 text-green-800">{s.score}/100</Badge>
                    </div>
                    <Progress value={s.score} className="h-2 rounded mb-2" />
                    <p className="text-sm text-gray-600">{s.feedback}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Suggestions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="w-5 h-5 text-yellow-600 mr-2" />
                  Improvement Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockAnalysis.improvements.map((imp, i) => (
                  <div key={i} className="border rounded-xl p-4 bg-white shadow-sm">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="text-gray-800 font-semibold">{imp.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{imp.description}</p>
                        <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            {getDifficultyIcon(imp.difficulty)}
                            <span className="ml-1">{imp.difficulty}</span>
                          </span>
                          <span>{imp.estimatedTime}</span>
                        </div>
                      </div>
                      <Badge className={`text-xs ${getPriorityColor(imp.priority)}`}>
                        {imp.priority}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ArrowRight className="w-5 h-5 text-blue-600 mr-2" />
                  Recommended Next Steps
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockAnalysis.nextSteps.map((step, i) => (
                  <div key={i} className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                    <p className="text-gray-700">{step}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white flex-1 shadow-sm">
                <Target className="w-4 h-4 mr-2" />
                Apply Suggestions
              </Button>
              <Button variant="outline" className="flex-1">
                <Palette className="w-4 h-4 mr-2" />
                Generate Variations
              </Button>
              <Button variant="outline" className="flex-1">
                Save Analysis
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

