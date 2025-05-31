
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Plus, Edit, Trash } from "lucide-react";
import { Resume } from "@/types/resume";

interface SavedResumesListProps {
  savedResumes: Record<string, Resume>;
  onCreateNew: () => void;
  onLoadResume: (id: string) => void;
  onDeleteResume: (id: string) => void;
}

const SavedResumesList: React.FC<SavedResumesListProps> = ({
  savedResumes,
  onCreateNew,
  onLoadResume,
  onDeleteResume
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Saved Resumes</CardTitle>
          <Button size="sm" onClick={onCreateNew}>
            <Plus className="h-4 w-4 mr-1" />
            New
          </Button>
        </div>
        <CardDescription>
          Your resumes are saved locally in your browser
        </CardDescription>
      </CardHeader>
      <CardContent>
        {Object.keys(savedResumes).length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No saved resumes yet</p>
            <p className="text-sm mt-2">Create and save your first resume</p>
          </div>
        ) : (
          <div className="space-y-3">
            {Object.entries(savedResumes).map(([id, resume]) => (
              <div key={id} className="flex items-center justify-between bg-muted rounded-md p-3">
                <div className="truncate">
                  <p className="font-medium truncate">{resume.basics.name || "Unnamed Resume"}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {resume.basics.label || "No job title"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    onClick={() => onLoadResume(id)}
                    className="h-8 w-8"
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    onClick={() => onDeleteResume(id)}
                    className="h-8 w-8 text-destructive hover:text-destructive"
                  >
                    <Trash className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SavedResumesList;
