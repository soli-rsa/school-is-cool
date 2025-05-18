
import React from "react";
import { Resume } from "@/types/resume";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";

interface WorkExperienceFormProps {
  resume: Resume;
  updateResume: (updatedResume: Resume) => void;
}

const WorkExperienceForm: React.FC<WorkExperienceFormProps> = ({ resume, updateResume }) => {
  const addWorkExperience = () => {
    const updatedResume = {
      ...resume,
      work: [
        ...(resume.work || []),
        {
          company: "",
          position: "",
          website: "",
          startDate: "",
          endDate: "",
          summary: "",
          highlights: []
        }
      ]
    };
    updateResume(updatedResume);
  };

  const updateWorkExperience = (index: number, field: string, value: string) => {
    if (!resume.work) return;
    
    const updatedWork = [...resume.work];
    updatedWork[index] = {
      ...updatedWork[index],
      [field]: value
    };

    updateResume({
      ...resume,
      work: updatedWork
    });
  };

  const addHighlight = (workIndex: number) => {
    if (!resume.work) return;
    
    const updatedWork = [...resume.work];
    updatedWork[workIndex] = {
      ...updatedWork[workIndex],
      highlights: [...(updatedWork[workIndex].highlights || []), ""]
    };

    updateResume({
      ...resume,
      work: updatedWork
    });
  };

  const updateHighlight = (workIndex: number, highlightIndex: number, value: string) => {
    if (!resume.work || !resume.work[workIndex].highlights) return;
    
    const updatedWork = [...resume.work];
    const updatedHighlights = [...updatedWork[workIndex].highlights!];
    updatedHighlights[highlightIndex] = value;

    updatedWork[workIndex] = {
      ...updatedWork[workIndex],
      highlights: updatedHighlights
    };

    updateResume({
      ...resume,
      work: updatedWork
    });
  };

  const removeHighlight = (workIndex: number, highlightIndex: number) => {
    if (!resume.work || !resume.work[workIndex].highlights) return;
    
    const updatedWork = [...resume.work];
    const updatedHighlights = updatedWork[workIndex].highlights!.filter((_, i) => i !== highlightIndex);

    updatedWork[workIndex] = {
      ...updatedWork[workIndex],
      highlights: updatedHighlights
    };

    updateResume({
      ...resume,
      work: updatedWork
    });
  };

  const removeWorkExperience = (index: number) => {
    if (!resume.work) return;
    
    const updatedWork = resume.work.filter((_, i) => i !== index);
    
    updateResume({
      ...resume,
      work: updatedWork
    });
  };

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Work Experience</CardTitle>
        <Button onClick={addWorkExperience} size="sm" variant="outline">
          <Plus className="h-4 w-4 mr-1" /> Add Job
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {(!resume.work || resume.work.length === 0) && (
          <p className="text-center text-muted-foreground py-4">No work experience added. Click "Add Job" to add your work history.</p>
        )}

        {resume.work?.map((work, workIndex) => (
          <div key={workIndex} className="border rounded-md p-4 relative">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-2 top-2"
              onClick={() => removeWorkExperience(workIndex)}
            >
              <Trash className="h-4 w-4 text-destructive" />
              <span className="sr-only">Remove</span>
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor={`company-${workIndex}`}>Company</Label>
                <Input
                  id={`company-${workIndex}`}
                  value={work.company}
                  onChange={(e) => updateWorkExperience(workIndex, "company", e.target.value)}
                  placeholder="Company Name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`position-${workIndex}`}>Position</Label>
                <Input
                  id={`position-${workIndex}`}
                  value={work.position}
                  onChange={(e) => updateWorkExperience(workIndex, "position", e.target.value)}
                  placeholder="Job Title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`website-${workIndex}`}>Website</Label>
                <Input
                  id={`website-${workIndex}`}
                  value={work.website || ""}
                  onChange={(e) => updateWorkExperience(workIndex, "website", e.target.value)}
                  placeholder="https://company.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`startDate-${workIndex}`}>Start Date</Label>
                <Input
                  id={`startDate-${workIndex}`}
                  value={work.startDate}
                  onChange={(e) => updateWorkExperience(workIndex, "startDate", e.target.value)}
                  placeholder="2020-01"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`endDate-${workIndex}`}>End Date</Label>
                <Input
                  id={`endDate-${workIndex}`}
                  value={work.endDate || ""}
                  onChange={(e) => updateWorkExperience(workIndex, "endDate", e.target.value)}
                  placeholder="2023-01 (or 'Present')"
                />
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <Label htmlFor={`summary-${workIndex}`}>Summary</Label>
              <Textarea
                id={`summary-${workIndex}`}
                value={work.summary || ""}
                onChange={(e) => updateWorkExperience(workIndex, "summary", e.target.value)}
                placeholder="Brief description of your role and responsibilities"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Key Achievements/Responsibilities</Label>
                <Button 
                  onClick={() => addHighlight(workIndex)} 
                  size="sm" 
                  variant="outline"
                >
                  <Plus className="h-4 w-4 mr-1" /> Add
                </Button>
              </div>

              {work.highlights?.map((highlight, highlightIndex) => (
                <div key={highlightIndex} className="flex gap-2 items-start">
                  <Input
                    value={highlight}
                    onChange={(e) => updateHighlight(workIndex, highlightIndex, e.target.value)}
                    placeholder="Achieved X by doing Y which resulted in Z"
                  />
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => removeHighlight(workIndex, highlightIndex)}
                  >
                    <Trash className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </div>
              ))}

              {(!work.highlights || work.highlights.length === 0) && (
                <p className="text-sm text-muted-foreground">Add key achievements or responsibilities</p>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default WorkExperienceForm;
