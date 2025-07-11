import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, Play, Video } from "lucide-react";
import { Link } from "wouter";

export default function HeroSection() {
  return (
    <section className="relative hero-gradient py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <Badge variant="secondary" className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-800 text-sm font-medium mb-6">
            <Bot className="w-4 h-4 mr-2" />
            AI-Powered Creative Mentorship
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Learn, Practice, Share</span><br />
            <span className="gradient-text">with AI Guidance</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Experience personalized learning journeys, intelligent feedback, and meaningful 
            community connections powered by advanced AI that understands your creative goals.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/learning-path">
              <Button 
                size="lg" 
                className="btn-gradient text-white px-8 py-4 text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Your Journey
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-gray-300 text-gray-700 px-8 py-4 text-lg hover:border-purple-400 hover:text-purple-600 transition-all duration-300"
              onClick={() => {
                // Scroll to AI Co-Creation Studio section
                document.getElementById('ai-studio')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Video className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
