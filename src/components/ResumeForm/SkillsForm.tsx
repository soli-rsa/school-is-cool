
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField } from "@/components/forms/FormField";
import { DynamicFieldArray } from "@/components/forms/DynamicFieldArray";
import { skillSchema } from "@/schemas/resumeSchema";
import { useResumeStore } from "@/stores/resumeStore";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";

type SkillsFormData = {
  skills: z.infer<typeof skillSchema>[];
};

const SkillsForm: React.FC = () => {
  const { currentResume, updateResume } = useResumeStore();
  
  const form = useForm<SkillsFormData>({
    resolver: zodResolver(z.object({ skills: z.array(skillSchema) })),
    defaultValues: { 
      skills: (currentResume.skills || []).map(skill => ({
        name: skill.name || "",
        level: skill.level || "",
        keywords: skill.keywords || []
      }))
    },
    mode: "onChange"
  });

  const { control, watch, reset } = form;
  const formData = watch();
  
  useEffect(() => {
    updateResume({
      ...currentResume,
      skills: formData.skills
    });
  }, [formData.skills, currentResume, updateResume]);

  useEffect(() => {
    const resetData = {
      skills: (currentResume.skills || []).map(skill => ({
        name: skill.name || "",
        level: skill.level || "",
        keywords: skill.keywords || []
      }))
    };
    reset(resetData);
  }, [currentResume.skills, reset]);

  const SkillFields = ({ field, index }: { field: any; index: number }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name={`skills.${index}.name`}
          label="Skill Name"
          placeholder="e.g. Web Development, Project Management"
          required
        />
        <FormField
          control={control}
          name={`skills.${index}.level`}
          label="Proficiency Level"
          placeholder="e.g. Expert, Intermediate, Beginner"
        />
      </div>
      
      <KeywordsField skillIndex={index} control={control} watch={watch} />
    </div>
  );

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Skills</CardTitle>
      </CardHeader>
      <CardContent>
        <DynamicFieldArray
          control={control}
          name="skills"
          addButtonText="Add Skill"
          emptyMessage="No skills added. Click 'Add Skill' to add your professional skills."
          defaultValue={{
            name: "",
            level: "",
            keywords: []
          }}
        >
          {(field, index) => <SkillFields field={field} index={index} />}
        </DynamicFieldArray>
      </CardContent>
    </Card>
  );
};

const KeywordsField = ({ skillIndex, control, watch }: { skillIndex: number; control: any; watch: any }) => {
  const keywords = watch(`skills.${skillIndex}.keywords`) || [];

  const addKeyword = () => {
    const currentKeywords = control._getWatch(`skills.${skillIndex}.keywords`) || [];
    control._updateFieldArray(`skills.${skillIndex}.keywords`, [...currentKeywords, ""]);
  };

  const removeKeyword = (keywordIndex: number) => {
    const currentKeywords = control._getWatch(`skills.${skillIndex}.keywords`) || [];
    const updated = currentKeywords.filter((_: any, i: number) => i !== keywordIndex);
    control._updateFieldArray(`skills.${skillIndex}.keywords`, updated);
  };

  const updateKeyword = (keywordIndex: number, value: string) => {
    const currentKeywords = control._getWatch(`skills.${skillIndex}.keywords`) || [];
    const updated = [...currentKeywords];
    updated[keywordIndex] = value;
    control._updateFieldArray(`skills.${skillIndex}.keywords`, updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label>Keywords</Label>
        <Button onClick={addKeyword} size="sm" variant="outline">
          <Plus className="h-4 w-4 mr-1" /> Add Keyword
        </Button>
      </div>

      {keywords.map((keyword: string, keywordIndex: number) => (
        <div key={keywordIndex} className="flex gap-2 items-start">
          <Input
            value={keyword}
            onChange={(e) => updateKeyword(keywordIndex, e.target.value)}
            placeholder="e.g. React, Leadership, Analysis"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeKeyword(keywordIndex)}
          >
            <Trash className="h-4 w-4" />
            <span className="sr-only">Remove</span>
          </Button>
        </div>
      ))}

      {keywords.length === 0 && (
        <p className="text-sm text-muted-foreground">Add keywords related to this skill</p>
      )}
    </div>
  );
};

export default SkillsForm;
