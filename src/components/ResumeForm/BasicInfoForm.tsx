
import React from "react";
import { Resume } from "@/types/resume";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface BasicInfoFormProps {
  resume: Resume;
  updateResume: (updatedResume: Resume) => void;
}

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({ resume, updateResume }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      updateResume({
        ...resume,
        [parent]: {
          ...resume[parent as keyof Resume],
          [child]: value
        }
      });
    } else {
      updateResume({
        ...resume,
        basics: {
          ...resume.basics,
          [name]: value
        }
      });
    }
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateResume({
      ...resume,
      basics: {
        ...resume.basics,
        location: {
          ...resume.basics.location,
          [name]: value
        }
      }
    });
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              name="name" 
              value={resume.basics.name} 
              onChange={handleChange} 
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="label">Job Title</Label>
            <Input 
              id="label" 
              name="label" 
              value={resume.basics.label || ""} 
              onChange={handleChange} 
              placeholder="Software Developer"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              value={resume.basics.email || ""} 
              onChange={handleChange} 
              placeholder="john.doe@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input 
              id="phone" 
              name="phone" 
              value={resume.basics.phone || ""} 
              onChange={handleChange} 
              placeholder="+27 12 345 6789"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="url">Website</Label>
          <Input 
            id="url" 
            name="url" 
            value={resume.basics.url || ""} 
            onChange={handleChange} 
            placeholder="https://johndoe.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="summary">Professional Summary</Label>
          <Textarea 
            id="summary" 
            name="summary" 
            value={resume.basics.summary || ""} 
            onChange={handleChange} 
            placeholder="A brief summary of your professional background and skills"
            rows={4}
          />
        </div>

        <div className="border-t pt-4 mt-4">
          <h4 className="text-md font-medium mb-4">Location</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input 
                id="address" 
                name="address" 
                value={resume.basics.location?.address || ""} 
                onChange={handleLocationChange} 
                placeholder="123 Main Street"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input 
                id="city" 
                name="city" 
                value={resume.basics.location?.city || ""} 
                onChange={handleLocationChange} 
                placeholder="Cape Town"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input 
                id="postalCode" 
                name="postalCode" 
                value={resume.basics.location?.postalCode || ""} 
                onChange={handleLocationChange} 
                placeholder="8000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="region">Province/State</Label>
              <Input 
                id="region" 
                name="region" 
                value={resume.basics.location?.region || ""} 
                onChange={handleLocationChange} 
                placeholder="Western Cape"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="countryCode">Country</Label>
              <Input 
                id="countryCode" 
                name="countryCode" 
                value={resume.basics.location?.countryCode || ""} 
                onChange={handleLocationChange} 
                placeholder="South Africa"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicInfoForm;
