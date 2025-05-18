
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";

interface OfflineStatusCardProps {
  offlineStatus: boolean;
  savedResourcesCount: number;
}

const OfflineStatusCard: React.FC<OfflineStatusCardProps> = ({ offlineStatus, savedResourcesCount }) => {
  return (
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
            <span className="font-medium">{savedResourcesCount}</span> resources available offline
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OfflineStatusCard;
