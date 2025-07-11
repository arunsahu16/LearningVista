import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import LearningJourney from "@/components/learning-journey";
import AICoCreationStudio from "@/components/ai-co-creation-studio";
import AIAssistantChat from "@/components/ai-assistant-chat";
import TrendingTopics from "@/components/trending-topics";
import CommunityHighlights from "@/components/community-highlights";
import UploadModal from "@/components/upload-modal";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [showUploadModal, setShowUploadModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main>
        <HeroSection />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
          <LearningJourney />
          <div id="ai-studio">
            <AICoCreationStudio onUploadClick={() => setShowUploadModal(true)} />
          </div>
          <div id="ai-assistant">
            <AIAssistantChat />
          </div>
          <TrendingTopics />
          <div id="community">
            <CommunityHighlights />
          </div>
        </div>
      </main>

      {/* Floating AI Assistant Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button 
          size="lg"
          className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl btn-gradient animate-float"
          title="Quick AI Help"
          onClick={() => {
            document.getElementById('ai-assistant')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <Bot className="w-6 h-6" />
        </Button>
      </div>

      <UploadModal 
        open={showUploadModal} 
        onOpenChange={setShowUploadModal} 
      />
    </div>
  );
}
