
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AboutSection: React.FC = () => {
  return (
    <>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>About JSON Resume</CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <p className="mb-4">
            This CV Builder uses the <a href="https://jsonresume.org" target="_blank" rel="noopener noreferrer" className="text-primary underline">JSON Resume</a> schema, 
            an open source standard for resume data.
          </p>
          <p>
            Your resumes are stored locally in your browser and can be exported as JSON files 
            compatible with any tool that supports the JSON Resume format.
          </p>
        </CardContent>
      </Card>

      <div className="bg-muted p-6 rounded-lg mt-10">
        <h2 className="text-xl font-bold mb-4">Using the CV Builder</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Fill out each section of the form in the tabs above</li>
          <li>Click "Save" to store your resume in your browser's localStorage</li>
          <li>Use "Export" to download your resume as a JSON file</li>
          <li>Your resumes are saved automatically and will be available when you return</li>
          <li>Create multiple resumes for different job applications</li>
        </ul>
      </div>
    </>
  );
};

export default AboutSection;
