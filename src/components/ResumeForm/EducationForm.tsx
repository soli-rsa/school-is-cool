
import React from "react";
import { Resume } from "@/types/resume";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";

interface EducationFormProps {
  resume: Resume;
  updateResume: (updatedResume: Resume) => void;
}

const EducationForm: React.FC<EducationFormProps> = ({ resume, updateResume }) => {
  const addEducation = () => {
    const updatedResume = {
      ...resume,
      education: [
        ...(resume.education || []),
        {
          institution: "",
          area: "",
          studyType: "",
          startDate: "",
          endDate: "",
          gpa: "",
          courses: []
        }
      ]
    };
    updateResume(updatedResume);
  };

  const updateEducation = (index: number, field: string, value: string) => {
    if (!resume.education) return;
    
    const updatedEducation = [...resume.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value
    };

    updateResume({
      ...resume,
      education: updatedEducation
    });
  };

  const addCourse = (educationIndex: number) => {
    if (!resume.education) return;
    
    const updatedEducation = [...resume.education];
    updatedEducation[educationIndex] = {
      ...updatedEducation[educationIndex],
      courses: [...(updatedEducation[educationIndex].courses || []), ""]
    };

    updateResume({
      ...resume,
      education: updatedEducation
    });
  };

  const updateCourse = (educationIndex: number, courseIndex: number, value: string) => {
    if (!resume.education || !resume.education[educationIndex].courses) return;
    
    const updatedEducation = [...resume.education];
    const updatedCourses = [...updatedEducation[educationIndex].courses!];
    updatedCourses[courseIndex] = value;

    updatedEducation[educationIndex] = {
      ...updatedEducation[educationIndex],
      courses: updatedCourses
    };

    updateResume({
      ...resume,
      education: updatedEducation
    });
  };

  const removeCourse = (educationIndex: number, courseIndex: number) => {
    if (!resume.education || !resume.education[educationIndex].courses) return;
    
    const updatedEducation = [...resume.education];
    const updatedCourses = updatedEducation[educationIndex].courses!.filter((_, i) => i !== courseIndex);

    updatedEducation[educationIndex] = {
      ...updatedEducation[educationIndex],
      courses: updatedCourses
    };

    updateResume({
      ...resume,
      education: updatedEducation
    });
  };

  const removeEducation = (index: number) => {
    if (!resume.education) return;
    
    const updatedEducation = resume.education.filter((_, i) => i !== index);
    
    updateResume({
      ...resume,
      education: updatedEducation
    });
  };

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Education</CardTitle>
        <Button onClick={addEducation} size="sm" variant="outline">
          <Plus className="h-4 w-4 mr-1" /> Add Education
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {(!resume.education || resume.education.length === 0) && (
          <p className="text-center text-muted-foreground py-4">No education added. Click "Add Education" to add your educational background.</p>
        )}

        {resume.education?.map((education, educationIndex) => (
          <div key={educationIndex} className="border rounded-md p-4 relative">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-2 top-2"
              onClick={() => removeEducation(educationIndex)}
            >
              <Trash className="h-4 w-4 text-destructive" />
              <span className="sr-only">Remove</span>
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor={`institution-${educationIndex}`}>Institution</Label>
                <Input
                  id={`institution-${educationIndex}`}
                  value={education.institution}
                  onChange={(e) => updateEducation(educationIndex, "institution", e.target.value)}
                  placeholder="University/School Name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`area-${educationIndex}`}>Area of Study</Label>
                <Input
                  id={`area-${educationIndex}`}
                  value={education.area}
                  onChange={(e) => updateEducation(educationIndex, "area", e.target.value)}
                  placeholder="Computer Science, Engineering, etc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`studyType-${educationIndex}`}>Degree/Certificate</Label>
                <Input
                  id={`studyType-${educationIndex}`}
                  value={education.studyType}
                  onChange={(e) => updateEducation(educationIndex, "studyType", e.target.value)}
                  placeholder="Bachelor's, Master's, Certificate, etc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`gpa-${educationIndex}`}>Grade/GPA</Label>
                <Input
                  id={`gpa-${educationIndex}`}
                  value={education.gpa || ""}
                  onChange={(e) => updateEducation(educationIndex, "gpa", e.target.value)}
                  placeholder="3.8 / 4.0, Distinction, etc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`startDate-${educationIndex}`}>Start Date</Label>
                <Input
                  id={`startDate-${educationIndex}`}
                  value={education.startDate}
                  onChange={(e) => updateEducation(educationIndex, "startDate", e.target.value)}
                  placeholder="2018-01"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`endDate-${educationIndex}`}>End Date</Label>
                <Input
                  id={`endDate-${educationIndex}`}
                  value={education.endDate || ""}
                  onChange={(e) => updateEducation(educationIndex, "endDate", e.target.value)}
                  placeholder="2022-01 (or 'Present')"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Notable Courses</Label>
                <Button 
                  onClick={() => addCourse(educationIndex)} 
                  size="sm" 
                  variant="outline"
                >
                  <Plus className="h-4 w-4 mr-1" /> Add Course
                </Button>
              </div>

              {education.courses?.map((course, courseIndex) => (
                <div key={courseIndex} className="flex gap-2 items-start">
                  <Input
                    value={course}
                    onChange={(e) => updateCourse(educationIndex, courseIndex, e.target.value)}
                    placeholder="Course name"
                  />
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => removeCourse(educationIndex, courseIndex)}
                  >
                    <Trash className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </div>
              ))}

              {(!education.courses || education.courses.length === 0) && (
                <p className="text-sm text-muted-foreground">Add notable courses you completed</p>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default EducationForm;
