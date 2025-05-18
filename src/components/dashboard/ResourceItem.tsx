
import React from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

interface ResourceItemProps {
  id: string;
  title: string;
  lastAccessed: number;
  formatRelativeTime: (timestamp: number) => string;
}

const ResourceItem: React.FC<ResourceItemProps> = ({
  id,
  title,
  lastAccessed,
  formatRelativeTime,
}) => {
  return (
    <Card className="flex flex-col md:flex-row overflow-hidden">
      <div className="w-full md:w-auto p-4 flex items-center justify-center bg-accent md:bg-transparent">
        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
          <FileText className="h-5 w-5 text-primary" />
        </div>
      </div>
      <div className="flex-grow p-4 md:py-4 md:px-6 flex flex-col justify-center">
        <h3 className="font-medium mb-1">{title}</h3>
        <p className="text-sm text-gray-600">Last accessed: {formatRelativeTime(lastAccessed)}</p>
      </div>
      <div className="p-4 flex items-center">
        <Button variant="outline" size="sm" asChild>
          <Link to={`/resources/${id}`}>Open</Link>
        </Button>
      </div>
    </Card>
  );
};

export default ResourceItem;
