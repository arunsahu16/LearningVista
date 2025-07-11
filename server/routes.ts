import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProjectSchema, insertChatMessageSchema } from "@shared/schema";
import multer from "multer";

// Extend Express Request interface to include file property
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

// Configure multer for file uploads
const upload = multer({ 
  dest: 'uploads/',
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

export async function registerRoutes(app: Express): Promise<Server> {
  const currentUserId = 1; // Mock current user

  // Get user profile
  app.get("/api/user", async (req, res) => {
    try {
      const user = await storage.getUser(currentUserId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Get learning progress
  app.get("/api/learning-progress", async (req, res) => {
    try {
      const progress = await storage.getLearningProgress(currentUserId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch learning progress" });
    }
  });

  // Get projects
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  // Get user's projects
  app.get("/api/projects/my", async (req, res) => {
    try {
      const projects = await storage.getProjects(currentUserId);
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user projects" });
    }
  });

  // Create new project
  app.post("/api/projects", upload.single('file'), async (req: MulterRequest, res) => {
    try {
      const validatedData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject({
        ...validatedData,
        userId: currentUserId,
        imageUrl: req.file ? `/uploads/${req.file.filename}` : validatedData.imageUrl,
      });
      
      // Create activity
      await storage.createActivity(currentUserId, "Project uploaded", `Created "${project.title}"`);
      
      res.status(201).json(project);
    } catch (error) {
      res.status(400).json({ message: "Failed to create project" });
    }
  });

  // Like project
  app.post("/api/projects/:id/like", async (req, res) => {
    try {
      const projectId = parseInt(req.params.id);
      await storage.likeProject(projectId);
      res.json({ message: "Project liked" });
    } catch (error) {
      res.status(500).json({ message: "Failed to like project" });
    }
  });

  // Get chat messages
  app.get("/api/chat/messages", async (req, res) => {
    try {
      const messages = await storage.getChatMessages(currentUserId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch chat messages" });
    }
  });

  // Send chat message
  app.post("/api/chat/messages", async (req, res) => {
    try {
      const validatedData = insertChatMessageSchema.parse(req.body);
      const userMessage = await storage.createChatMessage({
        ...validatedData,
        userId: currentUserId,
        isAi: false,
      });

      // Generate AI response (mock)
      setTimeout(async () => {
        const aiResponses = [
          "I'd be happy to help you with that! Can you provide more details?",
          "That's a great question! Let me analyze your request and provide some suggestions.",
          "Based on your creative goals, I recommend exploring color theory and composition techniques.",
          "Here are some AI-powered tools that might help with your project.",
        ];
        
        const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
        await storage.createChatMessage({
          message: randomResponse,
          userId: currentUserId,
          isAi: true,
        });
      }, 1000);

      res.status(201).json(userMessage);
    } catch (error) {
      res.status(400).json({ message: "Failed to send message" });
    }
  });

  // Get activities
  app.get("/api/activities", async (req, res) => {
    try {
      const activities = await storage.getActivities(currentUserId);
      res.json(activities);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch activities" });
    }
  });

  // Get trending topics
  app.get("/api/trending", async (req, res) => {
    try {
      const topics = await storage.getTrendingTopics();
      res.json(topics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch trending topics" });
    }
  });

  // Update trending topics (simulated real-time data)
  app.post("/api/trending/refresh", async (req, res) => {
    try {
      // Simulate fetching real-time data from multiple platforms
      const mockTrendingData = [
        { platform: "Instagram", topic: "#MinimalDesign", engagement: `+${Math.floor(Math.random() * 50 + 100)}%` },
        { platform: "Instagram", topic: "#AIArt", engagement: `+${Math.floor(Math.random() * 40 + 80)}%` },
        { platform: "Instagram", topic: "#CreativePortfolio", engagement: `+${Math.floor(Math.random() * 30 + 60)}%` },
        { platform: "Dribbble", topic: "3D UI Elements", engagement: `+${Math.floor(Math.random() * 60 + 120)}%` },
        { platform: "Dribbble", topic: "Dark Mode Design", engagement: `+${Math.floor(Math.random() * 50 + 90)}%` },
        { platform: "Dribbble", topic: "Micro-interactions", engagement: `+${Math.floor(Math.random() * 40 + 70)}%` },
        { platform: "Behance", topic: "Brand Identity 2024", engagement: `+${Math.floor(Math.random() * 70 + 130)}%` },
        { platform: "Behance", topic: "Sustainable Design", engagement: `+${Math.floor(Math.random() * 50 + 90)}%` },
        { platform: "Behance", topic: "Motion Graphics", engagement: `+${Math.floor(Math.random() * 40 + 75)}%` },
      ];

      await storage.updateTrendingTopics(mockTrendingData);
      const topics = await storage.getTrendingTopics();
      res.json(topics);
    } catch (error) {
      res.status(500).json({ message: "Failed to update trending topics" });
    }
  });

  // Get community updates
  app.get("/api/community/updates", async (req, res) => {
    try {
      const updates = await storage.getCommunityUpdates();
      res.json(updates);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch community updates" });
    }
  });

  // Get top creators
  app.get("/api/community/creators", async (req, res) => {
    try {
      const creators = await storage.getTopCreators();
      res.json(creators);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch top creators" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
