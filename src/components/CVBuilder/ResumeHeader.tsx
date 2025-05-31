
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save, Download } from "lucide-react";

interface ResumeHeaderProps {
  resumeName: string;
  currentResumeId: string;
  lastSaved: Date | null;
  onSave: () => void;
  onExport: () => void;
}

const ResumeHeader: React.FC<ResumeHeaderProps> = ({
  resumeName,
  currentResumeId,
  lastSaved,
  onSave,
  onExport
}) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardTitle>{resumeName}</CardTitle>
            <CardDescription>
              {currentResumeId ? "Edit and save your resume" : "Create and save your new resume"}
              {lastSaved && (
                <span className="block text-xs text-muted-foreground mt-1">
                  Last saved: {lastSaved.toLocaleTimeString()}
                </span>
              )}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onSave}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" onClick={onExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default ResumeHeader;
