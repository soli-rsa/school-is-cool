
import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { dbService } from "@/services/db";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle } from "lucide-react";

interface ModuleProps {
  id: string;
  title: string;
  description: string;
  content: React.ReactNode;
  lessons: number;
}

const Module: React.FC<ModuleProps> = ({ id, title, description, content, lessons }) => {
  const [progress, setProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const savedProgress = await dbService.getProgress(id);
        setProgress(savedProgress);
      } catch (error) {
        console.error("Failed to load progress:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProgress();
  }, [id]);

  const handleCompleteLesson = async () => {
    if (progress >= 100) return;

    const newProgress = Math.min(progress + (100 / lessons), 100);
    
    try {
      await dbService.saveProgress(id, newProgress);
      setProgress(newProgress);
      
      if (newProgress >= 100) {
        toast({
          title: "Module Completed!",
          description: `You've completed the ${title} module. Well done!`,
        });
      } else {
        toast({
          title: "Progress Saved",
          description: `Your progress has been saved (${Math.floor(newProgress)}%)`,
        });
      }
    } catch (error) {
      console.error("Failed to save progress:", error);
      toast({
        title: "Error Saving Progress",
        description: "We couldn't save your progress. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          {progress >= 100 && (
            <div className="bg-primary/10 p-1.5 rounded-full">
              <CheckCircle className="h-5 w-5 text-primary" />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{Math.floor(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          <div className="pt-2">
            {content}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleCompleteLesson} 
          className="w-full" 
          disabled={progress >= 100}
        >
          {progress >= 100 ? "Completed" : "Complete Lesson"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Module;
