
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DashboardSkeleton: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Skeleton className="h-10 w-64 mb-2" />
        <Skeleton className="h-6 w-96" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Progress Card Skeleton */}
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <Skeleton className="h-7 w-40" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-8" />
                </div>
                <Skeleton className="h-2 w-full" />
              </div>
              <div className="py-2">
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>

        {/* Offline Status Card Skeleton */}
        <Card>
          <CardHeader>
            <Skeleton className="h-7 w-40" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-accent p-4 rounded-md flex flex-col items-center justify-center text-center">
                <Skeleton className="h-12 w-12 rounded-full mb-2" />
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-48 mt-1" />
              </div>
              <Skeleton className="h-4 w-56" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Skeleton */}
      <div>
        <Tabs defaultValue="modules">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="modules">My Learning Modules</TabsTrigger>
            <TabsTrigger value="resources">Saved Resources</TabsTrigger>
          </TabsList>
          
          <TabsContent value="modules" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="h-2 bg-muted"></div>
                  <CardHeader className="pb-2">
                    <Skeleton className="h-6 w-40" />
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <div className="flex justify-between">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-8" />
                      </div>
                      <Skeleton className="h-1.5 w-full" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Skeleton className="h-9 w-full" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
