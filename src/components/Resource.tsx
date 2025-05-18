
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { dbService } from "@/services/db";
import { useToast } from "@/hooks/use-toast";
import { Download, FileText, Check } from "lucide-react";

interface ResourceProps {
  id: string;
  title: string;
  description: string;
  content: string;
  type: string;
}

const Resource: React.FC<ResourceProps> = ({ id, title, description, content, type }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleDownload = async () => {
    setIsSaving(true);
    
    try {
      await dbService.saveResource({
        id,
        title,
        content,
        type,
      });
      
      setIsSaved(true);
      
      // Notify the service worker to cache this resource if possible
      if (navigator.serviceWorker && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: "CACHE_NEW_RESOURCE",
          url: window.location.href,
        });
      }
      
      toast({
        title: "Resource Saved",
        description: "This resource is now available offline",
      });
    } catch (error) {
      console.error("Failed to save resource:", error);
      toast({
        title: "Error Saving Resource",
        description: "We couldn't save this resource offline. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const getTypeIcon = () => {
    switch (type) {
      case "document":
        return <FileText className="h-10 w-10 text-primary" />;
      default:
        return <FileText className="h-10 w-10 text-primary" />;
    }
  };

  return (
    <Card className="w-full shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-start space-x-4">
          <div className="bg-primary/10 p-3 rounded-md">{getTypeIcon()}</div>
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="prose max-w-none">
          <p>{content.substring(0, 150)}...</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" asChild>
          <a href={`/resources/${id}`}>Read More</a>
        </Button>
        <Button 
          variant="outline" 
          onClick={handleDownload} 
          disabled={isSaved || isSaving}
          className="flex items-center space-x-2"
        >
          {isSaving ? (
            "Saving..."
          ) : isSaved ? (
            <>
              <Check className="h-4 w-4" />
              <span>Saved Offline</span>
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              <span>Save Offline</span>
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Resource;
