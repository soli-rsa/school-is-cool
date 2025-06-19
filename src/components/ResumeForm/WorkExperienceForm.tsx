
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField } from "@/components/forms/FormField";
import { DynamicFieldArray } from "@/components/forms/DynamicFieldArray";
import { workExperienceSchema } from "@/schemas/resumeSchema";
import { useResumeStore } from "@/stores/resumeStore";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { Label } from "@/components/ui/label";

type WorkFormData = {
  work: z.infer<typeof workExperienceSchema>[];
};

const WorkExperienceForm: React.FC = () => {
  const { currentResume, updateResume } = useResumeStore();
  
  const form = useForm<WorkFormData>({
    resolver: zodResolver(z.object({ work: z.array(workExperienceSchema) })),
    defaultValues: { 
      work: (currentResume.work || []).map(item => ({
        company: item.company || "",
        position: item.position || "",
        website: item.website || "",
        startDate: item.startDate || "",
        endDate: item.endDate || "",
        summary: item.summary || "",
        highlights: item.highlights || []
      }))
    },
    mode: "onChange"
  });

  const { control, watch, reset } = form;
  const formData = watch();
  
  useEffect(() => {
    updateResume({
      ...currentResume,
      work: formData.work.map(item => ({
        ...item,
        company: item.company || "",
        position: item.position || "",
        startDate: item.startDate || ""
      }))
    });
  }, [formData.work, currentResume, updateResume]);

  useEffect(() => {
    const resetData = {
      work: (currentResume.work || []).map(item => ({
        company: item.company || "",
        position: item.position || "",
        website: item.website || "",
        startDate: item.startDate || "",
        endDate: item.endDate || "",
        summary: item.summary || "",
        highlights: item.highlights || []
      }))
    };
    reset(resetData);
  }, [currentResume.work, reset]);

  const WorkExperienceFields = ({ field, index }: { field: any; index: number }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name={`work.${index}.company`}
          label="Company"
          placeholder="Company Name"
          required
        />
        <FormField
          control={control}
          name={`work.${index}.position`}
          label="Position"
          placeholder="Job Title"
          required
        />
        <FormField
          control={control}
          name={`work.${index}.website`}
          label="Website"
          type="url"
          placeholder="https://company.com"
        />
        <FormField
          control={control}
          name={`work.${index}.startDate`}
          label="Start Date"
          placeholder="2020-01"
          required
        />
        <FormField
          control={control}
          name={`work.${index}.endDate`}
          label="End Date"
          placeholder="2023-01 (or 'Present')"
        />
      </div>

      <FormField
        control={control}
        name={`work.${index}.summary`}
        label="Summary"
        type="textarea"
        placeholder="Brief description of your role and responsibilities"
      />

      <HighlightsField workIndex={index} control={control} watch={watch} />
    </div>
  );

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Work Experience</CardTitle>
      </CardHeader>
      <CardContent>
        <DynamicFieldArray
          control={control}
          name="work"
          addButtonText="Add Job"
          emptyMessage="No work experience added. Click 'Add Job' to add your work history."
          defaultValue={{
            company: "",
            position: "",
            website: "",
            startDate: "",
            endDate: "",
            summary: "",
            highlights: []
          }}
        >
          {(field, index) => <WorkExperienceFields field={field} index={index} />}
        </DynamicFieldArray>
      </CardContent>
    </Card>
  );
};

const HighlightsField = ({ workIndex, control, watch }: { workIndex: number; control: any; watch: any }) => {
  const highlights = watch(`work.${workIndex}.highlights`) || [];

  const addHighlight = () => {
    const currentHighlights = control._getWatch(`work.${workIndex}.highlights`) || [];
    control._updateFieldArray(`work.${workIndex}.highlights`, [...currentHighlights, ""]);
  };

  const removeHighlight = (highlightIndex: number) => {
    const currentHighlights = control._getWatch(`work.${workIndex}.highlights`) || [];
    const updated = currentHighlights.filter((_: any, i: number) => i !== highlightIndex);
    control._updateFieldArray(`work.${workIndex}.highlights`, updated);
  };

  const updateHighlight = (highlightIndex: number, value: string) => {
    const currentHighlights = control._getWatch(`work.${workIndex}.highlights`) || [];
    const updated = [...currentHighlights];
    updated[highlightIndex] = value;
    control._updateFieldArray(`work.${workIndex}.highlights`, updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label>Key Achievements/Responsibilities</Label>
        <Button onClick={addHighlight} size="sm" variant="outline">
          <Plus className="h-4 w-4 mr-1" /> Add
        </Button>
      </div>

      {highlights.map((highlight: string, highlightIndex: number) => (
        <div key={highlightIndex} className="flex gap-2 items-start">
          <Input
            value={highlight}
            onChange={(e) => updateHighlight(highlightIndex, e.target.value)}
            placeholder="Achieved X by doing Y which resulted in Z"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeHighlight(highlightIndex)}
          >
            <Trash className="h-4 w-4" />
            <span className="sr-only">Remove</span>
          </Button>
        </div>
      ))}

      {highlights.length === 0 && (
        <p className="text-sm text-muted-foreground">Add key achievements or responsibilities</p>
      )}
    </div>
  );
};

export default WorkExperienceForm;
