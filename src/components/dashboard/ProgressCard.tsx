
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ProgressCardProps {
  progressItemsCount: number;
  overallProgress: number;
}

const ProgressCard: React.FC<ProgressCardProps> = ({ progressItemsCount, overallProgress }) => {
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle className="text-xl">Overall Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Completed</span>
              <span className="font-medium">{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
          </div>
          <div className="py-2">
            {progressItemsCount > 0 ? (
              <p className="text-sm text-gray-600">You've started {progressItemsCount} learning modules</p>
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
  );
};

export default ProgressCard;
