import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { dbService } from "@/services/db";
import ProgressCard from "@/components/dashboard/ProgressCard";
import OfflineStatusCard from "@/components/dashboard/OfflineStatusCard";
import OfflineAlert from "@/components/dashboard/OfflineAlert";
import ModuleItem from "@/components/dashboard/ModuleItem";
import ResourceItem from "@/components/dashboard/ResourceItem";
import EmptyState from "@/components/dashboard/EmptyState";

interface ProgressItem {
  moduleId: string;
  progress: number;
  lastUpdated: number;
}

interface ModuleInfo {
  id: string;
  title: string;
  description: string;
  link: string;
}

const moduleInfoMap: Record<string, ModuleInfo> = {
  "digital-literacy-basics": {
    id: "digital-literacy-basics",
    title: "Computer Basics",
    description: "Learn the fundamentals of using a computer",
    link: "/digital-literacy"
  },
  "digital-literacy-internet": {
    id: "digital-literacy-internet",
    title: "Internet Basics",
    description: "Learn how to navigate and use the internet",
    link: "/digital-literacy"
  },
  "digital-literacy-email": {
    id: "digital-literacy-email",
    title: "Email Basics",
    description: "Learn how to use email for communication",
    link: "/digital-literacy"
  },
  "digital-literacy-mobile": {
    id: "digital-literacy-mobile",
    title: "Mobile Device Skills",
    description: "Learn how to use smartphones and tablets",
    link: "/digital-literacy"
  },
  "science-life": {
    id: "science-life",
    title: "Life Science Basics",
    description: "Introduction to living organisms and ecosystems",
    link: "/science"
  },
  "science-physical": {
    id: "science-physical",
    title: "Physical Science Fundamentals",
    description: "Understanding matter, energy and forces",
    link: "/science"
  },
  "science-earth": {
    id: "science-earth",
    title: "Earth and Space Sciences",
    description: "Exploring our planet and the universe",
    link: "/science"
  },
  "science-method": {
    id: "science-method",
    title: "Scientific Method and Experimentation",
    description: "Learn how to think and work like a scientist",
    link: "/science"
  }
};

const Dashboard = () => {
  const [progressItems, setProgressItems] = useState<ProgressItem[]>([]);
  const [savedResources, setSavedResources] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [offlineStatus, setOfflineStatus] = useState<boolean>(false);

  useEffect(() => {
    // Check online status
    const updateOnlineStatus = () => {
      setOfflineStatus(!navigator.onLine);
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    updateOnlineStatus();

    // Load data from IndexedDB
    const loadData = async () => {
      try {
        // Initialize the database
        const db = await dbService.initDB();
        
        // This is just a mock implementation since we don't have actual methods to get all progress items
        // In a real app, you'd implement these methods in the dbService
        const mockProgressItems: ProgressItem[] = [];
        
        // Simulate getting progress for each known module
        for (const moduleId of Object.keys(moduleInfoMap)) {
          try {
            const progress = await dbService.getProgress(moduleId);
            if (progress > 0) {
              mockProgressItems.push({
                moduleId,
                progress,
                lastUpdated: Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 7 // Random date within the last week
              });
            }
          } catch (e) {
            console.error(`Error getting progress for ${moduleId}:`, e);
          }
        }
        
        setProgressItems(mockProgressItems);
        
        // Mock saved resources (you'd implement actual retrieval in a real app)
        setSavedResources([
          {
            id: "math-basics",
            title: "Basic Mathematics",
            type: "document",
            lastAccessed: Date.now() - 1000 * 60 * 60 * 24 * 2 // 2 days ago
          },
          {
            id: "science-experiments",
            title: "Home Science Experiments",
            type: "document",
            lastAccessed: Date.now() - 1000 * 60 * 60 * 3 // 3 hours ago
          }
        ]);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  const getModuleInfo = (moduleId: string): ModuleInfo => {
    return moduleInfoMap[moduleId] || {
      id: moduleId,
      title: "Unknown Module",
      description: "Module details not available",
      link: "/"
    };
  };

  const calculateOverallProgress = (): number => {
    if (progressItems.length === 0) return 0;
    const total = progressItems.reduce((sum, item) => sum + item.progress, 0);
    return Math.round(total / progressItems.length);
  };

  // Format timestamp to relative time (e.g., "2 days ago")
  const formatRelativeTime = (timestamp: number): string => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    
    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) return interval + " years ago";
    
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return interval + " months ago";
    
    interval = Math.floor(seconds / 86400);
    if (interval > 1) return interval + " days ago";
    
    interval = Math.floor(seconds / 3600);
    if (interval > 1) return interval + " hours ago";
    
    interval = Math.floor(seconds / 60);
    if (interval > 1) return interval + " minutes ago";
    
    return Math.floor(seconds) + " seconds ago";
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
          <p className="text-lg text-gray-700">
            Track your learning progress and access saved resources.
          </p>
        </div>

        <OfflineAlert visible={offlineStatus} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <ProgressCard 
            progressItemsCount={progressItems.length} 
            overallProgress={calculateOverallProgress()} 
          />
          
          <OfflineStatusCard 
            offlineStatus={offlineStatus} 
            savedResourcesCount={savedResources.length} 
          />
        </div>

        <Tabs defaultValue="modules" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="modules">My Learning Modules</TabsTrigger>
            <TabsTrigger value="resources">Saved Resources</TabsTrigger>
          </TabsList>
          
          <TabsContent value="modules" className="pt-6">
            {progressItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {progressItems.map((item) => {
                  const moduleInfo = getModuleInfo(item.moduleId);
                  return (
                    <ModuleItem
                      key={item.moduleId}
                      moduleId={item.moduleId}
                      title={moduleInfo.title}
                      description={moduleInfo.description}
                      progress={item.progress}
                      lastUpdated={item.lastUpdated}
                      link={moduleInfo.link}
                      formatRelativeTime={formatRelativeTime}
                    />
                  );
                })}
              </div>
            ) : (
              <EmptyState
                title="No Progress Yet"
                description="You haven't started any learning modules yet."
                ctaText="Start Learning Now"
                ctaLink="/digital-literacy"
              />
            )}
          </TabsContent>
          
          <TabsContent value="resources" className="pt-6">
            {savedResources.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {savedResources.map((resource) => (
                  <ResourceItem
                    key={resource.id}
                    id={resource.id}
                    title={resource.title}
                    lastAccessed={resource.lastAccessed}
                    formatRelativeTime={formatRelativeTime}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No Saved Resources"
                description="You haven't saved any resources for offline use yet."
                ctaText="Browse Resources"
                ctaLink="/math-resources"
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Dashboard;
