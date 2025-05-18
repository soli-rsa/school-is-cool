
import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { dbService } from "@/services/db";
import { Link } from "react-router-dom";
import { ArrowRight, Download, CheckCircle } from "lucide-react";

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

        {offlineStatus && (
          <div className="bg-muted border border-primary/30 rounded-lg p-4 mb-6 flex items-center">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4">
              <span className="text-lg">📶</span>
            </div>
            <div>
              <h3 className="font-medium">You're currently offline</h3>
              <p className="text-sm text-gray-700">You can still access your saved content and continue learning!</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card className="col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle className="text-xl">Overall Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Completed</span>
                    <span className="font-medium">{calculateOverallProgress()}%</span>
                  </div>
                  <Progress value={calculateOverallProgress()} className="h-2" />
                </div>
                <div className="py-2">
                  {progressItems.length > 0 ? (
                    <p className="text-sm text-gray-600">You've started {progressItems.length} learning modules</p>
                  ) : (
                    <p className="text-sm text-gray-600">You haven't started any modules yet</p>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link to="/">Continue Learning</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Offline Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-accent p-4 rounded-md flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mb-2">
                    <Download className={`h-6 w-6 ${offlineStatus ? "text-primary" : "text-gray-400"}`} />
                  </div>
                  <p className="font-medium">{offlineStatus ? "Offline Mode Active" : "Online Mode"}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {offlineStatus 
                      ? "You can access all saved content" 
                      : "Save content for offline use"}
                  </p>
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{savedResources.length}</span> resources available offline
                </div>
              </div>
            </CardContent>
          </Card>
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
                    <Card key={item.moduleId} className="overflow-hidden">
                      <div className="h-2 bg-gradient-to-r from-primary/80 to-primary" style={{ width: `${item.progress}%` }}></div>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{moduleInfo.title}</CardTitle>
                          {item.progress >= 100 && <CheckCircle className="h-5 w-5 text-primary" />}
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="space-y-2">
                          <p className="text-gray-600 text-sm">{moduleInfo.description}</p>
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span className="font-medium">{Math.floor(item.progress)}%</span>
                          </div>
                          <Progress value={item.progress} className="h-1.5" />
                          <p className="text-xs text-gray-500">Last updated: {formatRelativeTime(item.lastUpdated)}</p>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button variant="ghost" size="sm" asChild className="w-full">
                          <Link to={moduleInfo.link} className="flex items-center justify-center">
                            <span>Continue</span>
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center p-8 bg-muted rounded-lg">
                <h3 className="text-lg font-medium mb-2">No Progress Yet</h3>
                <p className="text-gray-600 mb-6">You haven't started any learning modules yet.</p>
                <Button asChild>
                  <Link to="/digital-literacy">Start Learning Now</Link>
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="resources" className="pt-6">
            {savedResources.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {savedResources.map((resource) => (
                  <Card key={resource.id} className="flex flex-col md:flex-row overflow-hidden">
                    <div className="w-full md:w-auto p-4 flex items-center justify-center bg-accent md:bg-transparent">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div className="flex-grow p-4 md:py-4 md:px-6 flex flex-col justify-center">
                      <h3 className="font-medium mb-1">{resource.title}</h3>
                      <p className="text-sm text-gray-600">Last accessed: {formatRelativeTime(resource.lastAccessed)}</p>
                    </div>
                    <div className="p-4 flex items-center">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/resources/${resource.id}`}>Open</Link>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center p-8 bg-muted rounded-lg">
                <h3 className="text-lg font-medium mb-2">No Saved Resources</h3>
                <p className="text-gray-600 mb-6">You haven't saved any resources for offline use yet.</p>
                <Button asChild>
                  <Link to="/math-resources">Browse Resources</Link>
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Dashboard;
