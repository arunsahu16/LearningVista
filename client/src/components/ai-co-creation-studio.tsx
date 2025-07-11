import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Plus, Palette, Wand2, Crop, Type, Eye, BarChart3 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ProjectAnalysisModal from "@/components/project-analysis-modal";
import type { Project } from "@shared/schema";

interface AICoCreationStudioProps {
  onUploadClick: () => void;
}

export default function AICoCreationStudio({ onUploadClick }: AICoCreationStudioProps) {
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ['/api/projects/my'],
  });

  const handleAnalyzeProject = (project: Project) => {
    setSelectedProject(project);
    setShowAnalysisModal(true);
  };

  const aiTools = [
    { icon: Palette, title: "Color Generator", description: "AI-powered palette creation", color: "purple" },
    { icon: Wand2, title: "Style Transfer", description: "Apply artistic styles instantly", color: "blue" },
    { icon: Crop, title: "Smart Crop", description: "Intelligent composition suggestions", color: "teal" },
    { icon: Type, title: "Text Generator", description: "Creative copy suggestions", color: "yellow" },
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      "Digital Art": "purple",
      "Web Design": "blue",
      "Branding": "teal",
      "Photography": "green",
    };
    return colors[category as keyof typeof colors] || "gray";
  };

  return (
    <section className="animate-slide-up">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">AI Co-Creation Studio</h2>
          <p className="text-gray-600 mt-2">Collaborate with AI to enhance your creative projects</p>
        </div>
        <Button 
          onClick={onUploadClick}
          className="btn-gradient text-white px-6 py-3 hover:shadow-lg transition-all duration-300"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Project
        </Button>
      </div>

      {/* Recent Work Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {projects.slice(0, 3).map((project) => (
          <Card key={project.id} className="shadow-lg card-hover group overflow-hidden">
            <div className="relative">
              <img 
                src={project.imageUrl || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&h=300"} 
                alt={project.title || "Project"} 
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  size="sm"
                  onClick={() => handleAnalyzeProject(project)}
                  className="btn-gradient text-white shadow-lg"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Analyze
                </Button>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{project.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{project.description}</p>
              <div className="flex items-center justify-between mb-3">
                <Badge 
                  variant="secondary" 
                  className={`text-xs bg-${getCategoryColor(project.category || "")}-100 text-${getCategoryColor(project.category || "")}-800`}
                >
                  {project.category}
                </Badge>
                <div className="flex items-center text-gray-500">
                  <Heart className="w-4 h-4 mr-1" />
                  <span>{project.likes}</span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAnalyzeProject(project)}
                className="w-full text-purple-600 hover:text-purple-800 border-purple-200 hover:border-purple-400"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Get AI Feedback
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Tools Panel */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Available AI Tools</h3>
        <div className="grid md:grid-cols-4 gap-4">
          {aiTools.map((tool, index) => (
            <Card key={index} className="text-center card-hover cursor-pointer">
              <CardContent className="p-4">
                <div className={`w-12 h-12 bg-${tool.color}-100 rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <tool.icon className={`text-${tool.color}-600 w-6 h-6`} />
                </div>
                <h4 className="font-medium text-gray-900">{tool.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{tool.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <ProjectAnalysisModal
        open={showAnalysisModal}
        onOpenChange={setShowAnalysisModal}
        project={selectedProject}
      />
    </section>
  );
}
