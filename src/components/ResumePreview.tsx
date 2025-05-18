
import React from "react";
import { Resume } from "@/types/resume";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ResumePreviewProps {
  resume: Resume;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ resume }) => {
  if (!resume.basics.name) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Resume Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            Start filling in your resume details to see a preview here.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Resume Preview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="border-b pb-4">
          <h1 className="text-2xl font-bold">{resume.basics.name}</h1>
          {resume.basics.label && <p className="text-lg text-muted-foreground">{resume.basics.label}</p>}
          
          <div className="mt-2 space-y-1 text-sm">
            {resume.basics.email && <p>{resume.basics.email}</p>}
            {resume.basics.phone && <p>{resume.basics.phone}</p>}
            {resume.basics.url && <p>{resume.basics.url}</p>}
            
            {resume.basics.location && (Object.values(resume.basics.location).some(val => val)) && (
              <p>
                {[
                  resume.basics.location.address,
                  resume.basics.location.city,
                  resume.basics.location.region,
                  resume.basics.location.postalCode,
                  resume.basics.location.countryCode
                ].filter(Boolean).join(", ")}
              </p>
            )}
          </div>
          
          {resume.basics.summary && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-2">Summary</h2>
              <p className="text-sm">{resume.basics.summary}</p>
            </div>
          )}
        </div>

        {resume.work && resume.work.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Work Experience</h2>
            {resume.work.map((work, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">{work.position}</h3>
                    <p className="text-sm">{work.company}</p>
                  </div>
                  <p className="text-sm text-muted-foreground whitespace-nowrap">
                    {work.startDate} - {work.endDate || "Present"}
                  </p>
                </div>
                {work.summary && <p className="text-sm">{work.summary}</p>}
                {work.highlights && work.highlights.length > 0 && (
                  <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                    {work.highlights.map((highlight, i) => (
                      <li key={i}>{highlight}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {resume.education && resume.education.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Education</h2>
            {resume.education.map((education, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">{education.studyType} in {education.area}</h3>
                    <p className="text-sm">{education.institution}</p>
                  </div>
                  <p className="text-sm text-muted-foreground whitespace-nowrap">
                    {education.startDate} - {education.endDate || "Present"}
                  </p>
                </div>
                {education.gpa && <p className="text-sm">Grade: {education.gpa}</p>}
                {education.courses && education.courses.length > 0 && (
                  <div className="text-sm">
                    <p className="font-medium">Key Courses:</p>
                    <p>{education.courses.join(", ")}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {resume.skills && resume.skills.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resume.skills.map((skill, index) => (
                <div key={index} className="space-y-1">
                  <h3 className="font-medium">{skill.name} {skill.level && `- ${skill.level}`}</h3>
                  {skill.keywords && skill.keywords.length > 0 && (
                    <p className="text-sm">{skill.keywords.join(", ")}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {resume.languages && resume.languages.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Languages</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resume.languages.map((language, index) => (
                <div key={index} className="text-sm">
                  <span className="font-medium">{language.language}:</span> {language.fluency}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResumePreview;
