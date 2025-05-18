
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

interface ModuleItemProps {
  moduleId: string;
  title: string;
  description: string;
  progress: number;
  lastUpdated: number;
  link: string;
  formatRelativeTime: (timestamp: number) => string;
}

const ModuleItem: React.FC<ModuleItemProps> = ({
  moduleId,
  title,
  description,
  progress,
  lastUpdated,
  link,
  formatRelativeTime,
}) => {
  return (
    <Card key={moduleId} className="overflow-hidden">
      <div className="h-2 bg-gradient-to-r from-primary/80 to-primary" style={{ width: `${progress}%` }}></div>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          {progress >= 100 && <CheckCircle className="h-5 w-5 text-primary" />}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2">
          <p className="text-gray-600 text-sm">{description}</p>
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span className="font-medium">{Math.floor(progress)}%</span>
          </div>
          <Progress value={progress} className="h-1.5" />
          <p className="text-xs text-gray-500">Last updated: {formatRelativeTime(lastUpdated)}</p>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button variant="ghost" size="sm" asChild className="w-full">
          <Link to={link} className="flex items-center justify-center">
            <span>Continue</span>
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ModuleItem;
