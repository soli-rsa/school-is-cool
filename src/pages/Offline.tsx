
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Offline = () => {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
      <Card className="w-full max-w-md bg-white shadow-lg">
        <CardHeader className="bg-secondary/10 pb-8">
          <CardTitle className="text-2xl font-bold text-center">You're Offline</CardTitle>
          <CardDescription className="text-center text-base">
            Don't worry! School is Cool works offline.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 px-6">
          <div className="flex flex-col space-y-4">
            <p className="text-center mb-4">
              You can still access any previously viewed resources and continue your learning journey.
            </p>
            <div className="rounded-lg bg-muted p-4">
              <h3 className="font-medium mb-2">Available offline:</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Your progress is saved locally</li>
                <li>Previously viewed lessons</li>
                <li>Downloaded resources</li>
              </ul>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center pt-2 pb-6">
          <Button onClick={() => window.location.href = "/"} className="w-full max-w-xs">
            Go to Homepage
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Offline;
