import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Plus, Palette, Wand2, Crop, Type, Eye, BarChart3 } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useRef } from "react";
import ProjectAnalysisModal from "@/components/project-analysis-modal";
import type { Project } from "@shared/schema";
import { motion, useInView } from "framer-motion";

interface AICoCreationStudioProps {
  onUploadClick: () => void;
}

export default function AICoCreationStudio({ onUploadClick }: AICoCreationStudioProps) {
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const queryClient = useQueryClient();

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

  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  const cardVariants = {
    hiddenLeft: { opacity: 0, x: -100 },
    hiddenRight: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
    exitLeft: { opacity: 0, x: -100, transition: { duration: 0.5 } },
    exitRight: { opacity: 0, x: 100, transition: { duration: 0.5 } },
  };

  return (
    <section ref={ref} className="min-h-screen w-full px-6 md:px-16 py-12 bg-gradient-to-br from-[#0c0c1e] via-[#1c1c3a] to-[#2a2a4d] text-white">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h2 className="text-4xl font-bold">AI Co-Creation Studio</h2>
          <p className="text-gray-300 mt-2">Collaborate with AI to enhance your creative projects</p>
        </div>
        <motion.button 
          onClick={onUploadClick}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="w-5 h-5" /> New Project
        </motion.button>
      </div>

      <div className="flex flex-col md:flex-row gap-6 justify-center mb-16">
        {projects.slice(0, 3).map((project, index) => (
          <motion.div
            key={project.id}
            initial={index === 0 ? "hiddenLeft" : index === 2 ? "hiddenRight" : "hiddenLeft"}
            animate={isInView ? "visible" : index === 0 ? "exitLeft" : index === 2 ? "exitRight" : "exitLeft"}
            variants={cardVariants}
          >
            <Card className="bg-[#12122a] border border-gray-700 rounded-xl shadow-xl">
              <div className="relative">
                <img 
                  src={project.imageUrl || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&h=300"} 
                  alt={project.title || "Project"} 
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <div className="absolute top-2 right-2">
                  <Button
                    size="sm"
                    onClick={() => handleAnalyzeProject(project)}
                    className="bg-purple-500 hover:bg-purple-600 text-white"
                  >
                    <Eye className="w-4 h-4 mr-1" /> Analyze
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-white text-lg mb-1">{project.title}</h3>
                <p className="text-sm text-gray-400 mb-2">{project.description}</p>
                <div className="flex justify-between items-center mb-3">
                  <Badge 
                    className={`text-white text-xs ${
                      project.category === "Digital Art" ? "bg-purple-600" :
                      project.category === "Web Design" ? "bg-blue-600" :
                      project.category === "Branding" ? "bg-teal-600" :
                      project.category === "Photography" ? "bg-green-600" :
                      "bg-gray-600"
                    }`}
                  >
                    {project.category}
                  </Badge>
                  <div className="flex items-center text-gray-400">
                    <Heart className="w-4 h-4 mr-1" />
                    <span>{project.likes}</span>
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => handleAnalyzeProject(project)}
                  className="w-full bg-[#2e2e5e] text-purple-300 hover:bg-purple-600 hover:text-white border border-purple-600"
                >
                  <BarChart3 className="w-4 h-4 mr-2" /> Get AI Feedback
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* AI Tools Section */}
      <div className="rounded-2xl bg-[#1c1c3a] p-6 shadow-inner">
        <h3 className="text-2xl font-semibold mb-6 text-white">Available AI Tools</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {aiTools.map((tool, index) => (
            <Card key={index} className="bg-[#2a2a4d] text-white p-4 rounded-xl hover:scale-105 transition-transform duration-300">
              <CardContent className="flex flex-col items-center text-center">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 ${
                  tool.color === "purple" ? "bg-purple-500" :
                  tool.color === "blue" ? "bg-blue-500" :
                  tool.color === "teal" ? "bg-teal-500" :
                  tool.color === "yellow" ? "bg-yellow-500" :
                  "bg-gray-500"
                }`}>
                  <tool.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-lg">{tool.title}</h4>
                <p className="text-sm text-gray-300 mt-1">{tool.description}</p>
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
