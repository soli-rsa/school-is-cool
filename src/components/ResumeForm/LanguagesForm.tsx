
import React from "react";
import { Resume } from "@/types/resume";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";

interface LanguagesFormProps {
  resume: Resume;
  updateResume: (updatedResume: Resume) => void;
}

const LanguagesForm: React.FC<LanguagesFormProps> = ({ resume, updateResume }) => {
  const addLanguage = () => {
    const updatedResume = {
      ...resume,
      languages: [
        ...(resume.languages || []),
        {
          language: "",
          fluency: ""
        }
      ]
    };
    updateResume(updatedResume);
  };

  const updateLanguage = (index: number, field: string, value: string) => {
    if (!resume.languages) return;
    
    const updatedLanguages = [...resume.languages];
    updatedLanguages[index] = {
      ...updatedLanguages[index],
      [field]: value
    };

    updateResume({
      ...resume,
      languages: updatedLanguages
    });
  };

  const removeLanguage = (index: number) => {
    if (!resume.languages) return;
    
    const updatedLanguages = resume.languages.filter((_, i) => i !== index);
    
    updateResume({
      ...resume,
      languages: updatedLanguages
    });
  };

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Languages</CardTitle>
        <Button onClick={addLanguage} size="sm" variant="outline">
          <Plus className="h-4 w-4 mr-1" /> Add Language
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {(!resume.languages || resume.languages.length === 0) && (
          <p className="text-center text-muted-foreground py-4">No languages added. Click "Add Language" to add languages you speak.</p>
        )}

        {resume.languages?.map((language, languageIndex) => (
          <div key={languageIndex} className="border rounded-md p-4 relative">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-2 top-2"
              onClick={() => removeLanguage(languageIndex)}
            >
              <Trash className="h-4 w-4 text-destructive" />
              <span className="sr-only">Remove</span>
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`language-${languageIndex}`}>Language</Label>
                <Input
                  id={`language-${languageIndex}`}
                  value={language.language}
                  onChange={(e) => updateLanguage(languageIndex, "language", e.target.value)}
                  placeholder="e.g. English, Zulu, Afrikaans"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`fluency-${languageIndex}`}>Fluency Level</Label>
                <Input
                  id={`fluency-${languageIndex}`}
                  value={language.fluency}
                  onChange={(e) => updateLanguage(languageIndex, "fluency", e.target.value)}
                  placeholder="e.g. Native, Fluent, Intermediate, Basic"
                />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default LanguagesForm;
