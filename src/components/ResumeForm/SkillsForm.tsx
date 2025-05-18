
import React from "react";
import { Resume } from "@/types/resume";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";

interface SkillsFormProps {
  resume: Resume;
  updateResume: (updatedResume: Resume) => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ resume, updateResume }) => {
  const addSkill = () => {
    const updatedResume = {
      ...resume,
      skills: [
        ...(resume.skills || []),
        {
          name: "",
          level: "",
          keywords: []
        }
      ]
    };
    updateResume(updatedResume);
  };

  const updateSkill = (index: number, field: string, value: string) => {
    if (!resume.skills) return;
    
    const updatedSkills = [...resume.skills];
    updatedSkills[index] = {
      ...updatedSkills[index],
      [field]: value
    };

    updateResume({
      ...resume,
      skills: updatedSkills
    });
  };

  const addKeyword = (skillIndex: number) => {
    if (!resume.skills) return;
    
    const updatedSkills = [...resume.skills];
    updatedSkills[skillIndex] = {
      ...updatedSkills[skillIndex],
      keywords: [...(updatedSkills[skillIndex].keywords || []), ""]
    };

    updateResume({
      ...resume,
      skills: updatedSkills
    });
  };

  const updateKeyword = (skillIndex: number, keywordIndex: number, value: string) => {
    if (!resume.skills || !resume.skills[skillIndex].keywords) return;
    
    const updatedSkills = [...resume.skills];
    const updatedKeywords = [...updatedSkills[skillIndex].keywords!];
    updatedKeywords[keywordIndex] = value;

    updatedSkills[skillIndex] = {
      ...updatedSkills[skillIndex],
      keywords: updatedKeywords
    };

    updateResume({
      ...resume,
      skills: updatedSkills
    });
  };

  const removeKeyword = (skillIndex: number, keywordIndex: number) => {
    if (!resume.skills || !resume.skills[skillIndex].keywords) return;
    
    const updatedSkills = [...resume.skills];
    const updatedKeywords = updatedSkills[skillIndex].keywords!.filter((_, i) => i !== keywordIndex);

    updatedSkills[skillIndex] = {
      ...updatedSkills[skillIndex],
      keywords: updatedKeywords
    };

    updateResume({
      ...resume,
      skills: updatedSkills
    });
  };

  const removeSkill = (index: number) => {
    if (!resume.skills) return;
    
    const updatedSkills = resume.skills.filter((_, i) => i !== index);
    
    updateResume({
      ...resume,
      skills: updatedSkills
    });
  };

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Skills</CardTitle>
        <Button onClick={addSkill} size="sm" variant="outline">
          <Plus className="h-4 w-4 mr-1" /> Add Skill
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {(!resume.skills || resume.skills.length === 0) && (
          <p className="text-center text-muted-foreground py-4">No skills added. Click "Add Skill" to add your professional skills.</p>
        )}

        {resume.skills?.map((skill, skillIndex) => (
          <div key={skillIndex} className="border rounded-md p-4 relative">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-2 top-2"
              onClick={() => removeSkill(skillIndex)}
            >
              <Trash className="h-4 w-4 text-destructive" />
              <span className="sr-only">Remove</span>
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor={`skill-${skillIndex}`}>Skill Name</Label>
                <Input
                  id={`skill-${skillIndex}`}
                  value={skill.name}
                  onChange={(e) => updateSkill(skillIndex, "name", e.target.value)}
                  placeholder="e.g. Web Development, Project Management"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`level-${skillIndex}`}>Proficiency Level</Label>
                <Input
                  id={`level-${skillIndex}`}
                  value={skill.level || ""}
                  onChange={(e) => updateSkill(skillIndex, "level", e.target.value)}
                  placeholder="e.g. Expert, Intermediate, Beginner"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Keywords</Label>
                <Button 
                  onClick={() => addKeyword(skillIndex)} 
                  size="sm" 
                  variant="outline"
                >
                  <Plus className="h-4 w-4 mr-1" /> Add Keyword
                </Button>
              </div>

              {skill.keywords?.map((keyword, keywordIndex) => (
                <div key={keywordIndex} className="flex gap-2 items-start">
                  <Input
                    value={keyword}
                    onChange={(e) => updateKeyword(skillIndex, keywordIndex, e.target.value)}
                    placeholder="e.g. React, Leadership, Analysis"
                  />
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => removeKeyword(skillIndex, keywordIndex)}
                  >
                    <Trash className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </div>
              ))}

              {(!skill.keywords || skill.keywords.length === 0) && (
                <p className="text-sm text-muted-foreground">Add keywords related to this skill</p>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SkillsForm;
