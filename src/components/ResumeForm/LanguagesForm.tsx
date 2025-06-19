import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField } from "@/components/forms/FormField";
import { DynamicFieldArray } from "@/components/forms/DynamicFieldArray";
import { languageSchema } from "@/schemas/resumeSchema";
import { useResumeStore } from "@/stores/resumeStore";
import { z } from "zod";

type LanguagesFormData = {
  languages: z.infer<typeof languageSchema>[];
};

const LanguagesForm: React.FC = () => {
  const { currentResume, updateResume } = useResumeStore();
  
  const form = useForm<LanguagesFormData>({
    resolver: zodResolver(z.object({ languages: z.array(languageSchema) })),
    defaultValues: { 
      languages: (currentResume.languages || []).map(language => ({
        language: language.language || "",
        fluency: language.fluency || ""
      }))
    },
    mode: "onChange"
  });

  const { control, watch, reset } = form;
  const formData = watch();
  
  useEffect(() => {
    updateResume({
      ...currentResume,
      languages: formData.languages.map(language => ({
        language: language.language || "",
        fluency: language.fluency || ""
      }))
    });
  }, [formData.languages, currentResume, updateResume]);

  useEffect(() => {
    const resetData = {
      languages: (currentResume.languages || []).map(language => ({
        language: language.language || "",
        fluency: language.fluency || ""
      }))
    };
    reset(resetData);
  }, [currentResume.languages, reset]);

  const LanguageFields = ({ field, index }: { field: any; index: number }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={control}
        name={`languages.${index}.language`}
        label="Language"
        placeholder="e.g. English, Zulu, Afrikaans"
        required
      />
      <FormField
        control={control}
        name={`languages.${index}.fluency`}
        label="Fluency Level"
        placeholder="e.g. Native, Fluent, Intermediate, Basic"
        required
      />
    </div>
  );

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Languages</CardTitle>
      </CardHeader>
      <CardContent>
        <DynamicFieldArray
          control={control}
          name="languages"
          addButtonText="Add Language"
          emptyMessage="No languages added. Click 'Add Language' to add languages you speak."
          defaultValue={{
            language: "",
            fluency: ""
          }}
        >
          {(field, index) => <LanguageFields field={field} index={index} />}
        </DynamicFieldArray>
      </CardContent>
    </Card>
  );
};

export default LanguagesForm;
