import { 
  users, 
  projects, 
  learningProgress, 
  chatMessages, 
  activities, 
  trendingTopics, 
  communityUpdates,
  type User, 
  type InsertUser, 
  type Project, 
  type InsertProject, 
  type ChatMessage, 
  type InsertChatMessage,
  type LearningProgress,
  type Activity,
  type TrendingTopic,
  type CommunityUpdate
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Project methods
  getProjects(userId?: number): Promise<Project[]>;
  createProject(project: InsertProject & { userId: number }): Promise<Project>;
  likeProject(projectId: number): Promise<void>;
  
  // Learning progress methods
  getLearningProgress(userId: number): Promise<LearningProgress[]>;
  updateProgress(userId: number, skillName: string, progress: number): Promise<void>;
  
  // Chat methods
  getChatMessages(userId: number): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage & { userId: number, isAi?: boolean }): Promise<ChatMessage>;
  
  // Activity methods
  getActivities(userId: number): Promise<Activity[]>;
  createActivity(userId: number, action: string, description?: string): Promise<Activity>;
  
  // Trending topics methods
  getTrendingTopics(): Promise<TrendingTopic[]>;
  updateTrendingTopics(topics: Array<{ platform: string, topic: string, engagement: string }>): Promise<void>;
  
  // Community methods
  getCommunityUpdates(): Promise<CommunityUpdate[]>;
  createCommunityUpdate(userId: number, message: string): Promise<CommunityUpdate>;
  getTopCreators(): Promise<User[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private learningProgress: Map<number, LearningProgress>;
  private chatMessages: Map<number, ChatMessage>;
  private activities: Map<number, Activity>;
  private trendingTopics: Map<number, TrendingTopic>;
  private communityUpdates: Map<number, CommunityUpdate>;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.learningProgress = new Map();
    this.chatMessages = new Map();
    this.activities = new Map();
    this.trendingTopics = new Map();
    this.communityUpdates = new Map();
    this.currentId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Create sample user
    const sampleUser: User = {
      id: 1,
      username: "john_creative",
      email: "john@example.com",
      password: "hashed_password",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40",
      specialty: "Digital Designer",
      bio: "Passionate about creating beautiful digital experiences",
      badgeLevel: "Expert",
      followers: 1250,
      createdAt: new Date(),
    };
    this.users.set(1, sampleUser);

    // Sample learning progress
    const progressData = [
      { id: 1, userId: 1, skillName: "Digital Illustration", progress: 78, updatedAt: new Date() },
      { id: 2, userId: 1, skillName: "Photography", progress: 65, updatedAt: new Date() },
      { id: 3, userId: 1, skillName: "UI/UX Design", progress: 92, updatedAt: new Date() },
    ];
    progressData.forEach(p => this.learningProgress.set(p.id, p));

    // Sample projects
    const projectData = [
      {
        id: 1,
        userId: 1,
        title: "Abstract Composition #3",
        description: "AI-enhanced geometric patterns with custom color palette",
        imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&h=300",
        category: "Digital Art",
        likes: 24,
        comments: 5,
        createdAt: new Date(),
      },
      {
        id: 2,
        userId: 1,
        title: "Portfolio Website Redesign",
        description: "AI-optimized UX flow with personalized content strategy",
        imageUrl: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=400&h=300",
        category: "Web Design",
        likes: 56,
        comments: 12,
        createdAt: new Date(),
      },
    ];
    projectData.forEach(p => this.projects.set(p.id, p));

    // Sample activities
    const activityData = [
      { id: 1, userId: 1, action: "Color palette generated", description: "Created new palette for project", createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) },
      { id: 2, userId: 1, action: "Project uploaded", description: "New digital art piece", createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000) },
      { id: 3, userId: 1, action: "Feedback received", description: "Community feedback on latest work", createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    ];
    activityData.forEach(a => this.activities.set(a.id, a));

    // Sample trending topics
    const trendingData = [
      { id: 1, platform: "Instagram", topic: "#MinimalDesign", engagement: "+127%", updatedAt: new Date() },
      { id: 2, platform: "Instagram", topic: "#AIArt", engagement: "+89%", updatedAt: new Date() },
      { id: 3, platform: "Dribbble", topic: "3D UI Elements", engagement: "+156%", updatedAt: new Date() },
      { id: 4, platform: "Behance", topic: "Brand Identity 2024", engagement: "+134%", updatedAt: new Date() },
    ];
    trendingData.forEach(t => this.trendingTopics.set(t.id, t));

    this.currentId = 100;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { 
      ...insertUser, 
      id, 
      avatar: insertUser.avatar || null,
      specialty: insertUser.specialty || null,
      bio: insertUser.bio || null,
      followers: 0, 
      badgeLevel: "Rising", 
      createdAt: new Date() 
    };
    this.users.set(id, user);
    return user;
  }

  async getProjects(userId?: number): Promise<Project[]> {
    const allProjects = Array.from(this.projects.values());
    return userId ? allProjects.filter(p => p.userId === userId) : allProjects;
  }

  async createProject(project: InsertProject & { userId: number }): Promise<Project> {
    const id = this.currentId++;
    const newProject: Project = { 
      ...project, 
      id, 
      description: project.description || null,
      imageUrl: project.imageUrl || null,
      category: project.category || null,
      likes: 0, 
      comments: 0, 
      createdAt: new Date() 
    };
    this.projects.set(id, newProject);
    return newProject;
  }

  async likeProject(projectId: number): Promise<void> {
    const project = this.projects.get(projectId);
    if (project) {
      project.likes = (project.likes || 0) + 1;
      this.projects.set(projectId, project);
    }
  }

  async getLearningProgress(userId: number): Promise<LearningProgress[]> {
    return Array.from(this.learningProgress.values()).filter(p => p.userId === userId);
  }

  async updateProgress(userId: number, skillName: string, progress: number): Promise<void> {
    const existing = Array.from(this.learningProgress.values()).find(
      p => p.userId === userId && p.skillName === skillName
    );
    
    if (existing) {
      existing.progress = progress;
      existing.updatedAt = new Date();
      this.learningProgress.set(existing.id, existing);
    } else {
      const id = this.currentId++;
      const newProgress: LearningProgress = {
        id,
        userId,
        skillName,
        progress,
        updatedAt: new Date(),
      };
      this.learningProgress.set(id, newProgress);
    }
  }

  async getChatMessages(userId: number): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values())
      .filter(m => m.userId === userId)
      .sort((a, b) => (a.createdAt?.getTime() || 0) - (b.createdAt?.getTime() || 0));
  }

  async createChatMessage(message: InsertChatMessage & { userId: number, isAi?: boolean }): Promise<ChatMessage> {
    const id = this.currentId++;
    const newMessage: ChatMessage = { 
      ...message, 
      id, 
      isAi: message.isAi || false,
      createdAt: new Date() 
    };
    this.chatMessages.set(id, newMessage);
    return newMessage;
  }

  async getActivities(userId: number): Promise<Activity[]> {
    return Array.from(this.activities.values())
      .filter(a => a.userId === userId)
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0))
      .slice(0, 10);
  }

  async createActivity(userId: number, action: string, description?: string): Promise<Activity> {
    const id = this.currentId++;
    const activity: Activity = {
      id,
      userId,
      action,
      description: description || null,
      createdAt: new Date(),
    };
    this.activities.set(id, activity);
    return activity;
  }

  async getTrendingTopics(): Promise<TrendingTopic[]> {
    return Array.from(this.trendingTopics.values())
      .sort((a, b) => (b.updatedAt?.getTime() || 0) - (a.updatedAt?.getTime() || 0));
  }

  async updateTrendingTopics(topics: Array<{ platform: string, topic: string, engagement: string }>): Promise<void> {
    // Clear existing topics
    this.trendingTopics.clear();
    
    // Add new topics
    topics.forEach((topic, index) => {
      const id = this.currentId++;
      const trendingTopic: TrendingTopic = {
        id,
        platform: topic.platform,
        topic: topic.topic,
        engagement: topic.engagement,
        updatedAt: new Date(),
      };
      this.trendingTopics.set(id, trendingTopic);
    });
  }

  async getCommunityUpdates(): Promise<CommunityUpdate[]> {
    return Array.from(this.communityUpdates.values())
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0))
      .slice(0, 20);
  }

  async createCommunityUpdate(userId: number, message: string): Promise<CommunityUpdate> {
    const id = this.currentId++;
    const update: CommunityUpdate = {
      id,
      userId,
      message,
      createdAt: new Date(),
    };
    this.communityUpdates.set(id, update);
    return update;
  }

  async getTopCreators(): Promise<User[]> {
    return Array.from(this.users.values())
      .sort((a, b) => (b.followers || 0) - (a.followers || 0))
      .slice(0, 10);
  }
}

export const storage = new MemStorage();
