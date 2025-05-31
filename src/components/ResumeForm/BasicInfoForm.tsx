
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField } from "@/components/forms/FormField";
import { basicsSchema } from "@/schemas/resumeSchema";
import { useResumeStore } from "@/stores/resumeStore";
import { z } from "zod";

type BasicsFormData = z.infer<typeof basicsSchema>;

const BasicInfoForm: React.FC = () => {
  const { currentResume, updateResume } = useResumeStore();
  
  const form = useForm<BasicsFormData>({
    resolver: zodResolver(basicsSchema),
    defaultValues: currentResume.basics,
    mode: "onChange"
  });

  const { control, watch, reset } = form;

  // Watch all form values and update store
  const formData = watch();
  
  useEffect(() => {
    updateResume({
      ...currentResume,
      basics: formData
    });
  }, [formData, currentResume, updateResume]);

  // Reset form when currentResume changes (e.g., when loading a different resume)
  useEffect(() => {
    reset(currentResume.basics);
  }, [currentResume.basics, reset]);

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="name"
            label="Full Name"
            placeholder="John Doe"
            required
          />
          <FormField
            control={control}
            name="label"
            label="Job Title"
            placeholder="Software Developer"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="email"
            label="Email"
            type="email"
            placeholder="john.doe@example.com"
          />
          <FormField
            control={control}
            name="phone"
            label="Phone"
            type="tel"
            placeholder="+27 12 345 6789"
          />
        </div>

        <FormField
          control={control}
          name="url"
          label="Website"
          type="url"
          placeholder="https://johndoe.com"
        />

        <FormField
          control={control}
          name="summary"
          label="Professional Summary"
          type="textarea"
          placeholder="A brief summary of your professional background and skills"
        />

        <div className="border-t pt-4 mt-4">
          <h4 className="text-md font-medium mb-4">Location</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={control}
              name="location.address"
              label="Address"
              placeholder="123 Main Street"
            />
            <FormField
              control={control}
              name="location.city"
              label="City"
              placeholder="Cape Town"
            />
            <FormField
              control={control}
              name="location.postalCode"
              label="Postal Code"
              placeholder="8000"
            />
            <FormField
              control={control}
              name="location.region"
              label="Province/State"
              placeholder="Western Cape"
            />
            <FormField
              control={control}
              name="location.countryCode"
              label="Country"
              placeholder="South Africa"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicInfoForm;
