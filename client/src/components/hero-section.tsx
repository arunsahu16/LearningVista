import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, Play, Video } from "lucide-react";
import { Link } from "wouter";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-white font-sans overflow-hidden">
      {/* 🎥 Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/CreativeAssistant.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 🌓 Darkened Overlay to Dim Video */}
      <div className="absolute inset-0 bg-black/70 z-10"></div>

      {/* 🌈 Optional: Gradient Tint on Top */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-purple-900/30 to-transparent z-10"></div>

      {/* ✨ Foreground Content */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 text-center">
        <div className="animate-fade-up">
          <Badge className="inline-flex items-center px-4 py-2 mb-6 bg-purple-200 text-purple-900 text-sm font-medium rounded-full shadow-md">
            <Bot className="w-4 h-4 mr-2" />
            AI-Powered Creative Mentorship
          </Badge>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
            <span className="block gradient-text">Learn, Practice, Share</span>
            <span className="block gradient-text">with AI Guidance</span>
          </h1>

          <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
            Experience personalized learning journeys, intelligent feedback, and meaningful 
            community connections powered by advanced AI that understands your creative goals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/learning-path">
              <Button 
                size="lg" 
                className="relative bg-black text-white px-8 py-4 text-lg font-semibold rounded-xl hover:bg-gray-900 transition-all duration-300 group shadow-lg"
              >
                <span className="absolute left-0 top-0 h-full w-12 flex items-center justify-center bg-purple-600 rounded-l-xl group-hover:bg-purple-700 transition">
                  <Play className="w-5 h-5" />
                </span>
                <span className="pl-12">Start Your Journey</span>
              </Button>
            </Link>

            <Button 
              size="lg"
              className="bg-black text-white px-8 py-4 text-lg flex items-center gap-2 rounded-xl hover:bg-gray-900 transition-all duration-300"
              onClick={() => {
                document.getElementById('ai-studio')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Video className="w-5 h-5" />
              <span>Watch Demo</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
