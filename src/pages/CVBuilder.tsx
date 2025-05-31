import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BasicInfoForm from "@/components/ResumeForm/BasicInfoForm";
import WorkExperienceForm from "@/components/ResumeForm/WorkExperienceForm";
import EducationForm from "@/components/ResumeForm/EducationForm";
import SkillsForm from "@/components/ResumeForm/SkillsForm";
import LanguagesForm from "@/components/ResumeForm/LanguagesForm";
import ResumePreview from "@/components/ResumePreview";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { generateResumeId, exportResumeAsJson } from "@/services/resumeStorage";
import { FileText, Save, Download, Trash, Plus, Edit } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useResumeStore } from "@/stores/resumeStore";

const CVBuilder = () => {
  const [activeTab, setActiveTab] = useState("basics");
  
  const {
    currentResume,
    currentResumeId,
    savedResumes,
    lastSaved,
    loadSavedResumes,
    saveCurrentResume,
    deleteResumeById,
    loadResume,
    createNewResume,
    setCurrentResumeId,
    enableAutoSave
  } = useResumeStore();
  
  // Load saved resumes on component mount
  useEffect(() => {
    loadSavedResumes();
    enableAutoSave();
    
    // If there are saved resumes, load the first one
    const resumeIds = Object.keys(savedResumes);
    if (resumeIds.length > 0 && !currentResumeId) {
      const firstId = resumeIds[0];
      loadResume(firstId);
    }
  }, []);
  
  const handleSaveResume = async () => {
    const id = currentResumeId || generateResumeId();
    
    await saveCurrentResume(id);
    
    if (!currentResumeId) {
      setCurrentResumeId(id);
    }
    
    toast({
      title: "Resume Saved",
      description: "Your resume has been saved successfully."
    });
  };
  
  const handleCreateNew = () => {
    createNewResume();
    setActiveTab("basics");
  };
  
  const handleLoadResume = (id: string) => {
    loadResume(id);
    setActiveTab("basics");
  };
  
  const handleDeleteResume = (id: string) => {
    deleteResumeById(id);
    
    toast({
      title: "Resume Deleted",
      description: "Your resume has been deleted."
    });
  };
  
  const handleExportJson = () => {
    const fileName = (currentResume.basics.name || 'resume').toLowerCase().replace(/\s+/g, '-');
    exportResumeAsJson(currentResume, fileName);
  };
  
  const resumeName = currentResume.basics.name || "My Resume";
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">CV Builder</h1>
          <p className="text-lg text-gray-700">
            Create, save and export your resume in JSON Resume format
          </p>
        </div>
        
        <div className="flex flex-col-reverse md:flex-row gap-6">
          <div className="md:w-8/12">
            <Card className="mb-6">
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <CardTitle>{resumeName}</CardTitle>
                    <CardDescription>
                      {currentResumeId ? "Edit and save your resume" : "Create and save your new resume"}
                      {lastSaved && (
                        <span className="block text-xs text-muted-foreground mt-1">
                          Last saved: {lastSaved.toLocaleTimeString()}
                        </span>
                      )}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={handleSaveResume}>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    <Button variant="outline" onClick={handleExportJson}>
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-10">
              <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-4">
                <TabsTrigger value="basics">Basics</TabsTrigger>
                <TabsTrigger value="work">Work</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="languages">Languages</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basics">
                <BasicInfoForm />
                <div className="flex justify-end gap-4">
                  <Button onClick={() => setActiveTab("work")}>Next: Work Experience</Button>
                </div>
              </TabsContent>
              
              <TabsContent value="work">
                <WorkExperienceForm />
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setActiveTab("basics")}>Previous: Basics</Button>
                  <Button onClick={() => setActiveTab("education")}>Next: Education</Button>
                </div>
              </TabsContent>
              
              <TabsContent value="education">
                <EducationForm />
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setActiveTab("work")}>Previous: Work</Button>
                  <Button onClick={() => setActiveTab("skills")}>Next: Skills</Button>
                </div>
              </TabsContent>
              
              <TabsContent value="skills">
                <SkillsForm />
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setActiveTab("education")}>Previous: Education</Button>
                  <Button onClick={() => setActiveTab("languages")}>Next: Languages</Button>
                </div>
              </TabsContent>
              
              <TabsContent value="languages">
                <LanguagesForm />
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setActiveTab("skills")}>Previous: Skills</Button>
                </div>
              </TabsContent>
            </Tabs>
            
            <ResumePreview resume={currentResume} />
          </div>
          
          <div className="md:w-4/12">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Saved Resumes</CardTitle>
                  <Button size="sm" onClick={handleCreateNew}>
                    <Plus className="h-4 w-4 mr-1" />
                    New
                  </Button>
                </div>
                <CardDescription>
                  Your resumes are saved locally in your browser
                </CardDescription>
              </CardHeader>
              <CardContent>
                {Object.keys(savedResumes).length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No saved resumes yet</p>
                    <p className="text-sm mt-2">Create and save your first resume</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {Object.entries(savedResumes).map(([id, resume]) => (
                      <div key={id} className="flex items-center justify-between bg-muted rounded-md p-3">
                        <div className="truncate">
                          <p className="font-medium truncate">{resume.basics.name || "Unnamed Resume"}</p>
                          <p className="text-xs text-muted-foreground truncate">
                            {resume.basics.label || "No job title"}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            onClick={() => handleLoadResume(id)}
                            className="h-8 w-8"
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            onClick={() => handleDeleteResume(id)}
                            className="h-8 w-8 text-destructive hover:text-destructive"
                          >
                            <Trash className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            
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
          </div>
        </div>
        
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
      </div>
    </Layout>
  );
};

export default CVBuilder;
