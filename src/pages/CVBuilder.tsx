
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import ResumePreview from "@/components/ResumePreview";
import ResumeHeader from "@/components/CVBuilder/ResumeHeader";
import TabNavigation from "@/components/CVBuilder/TabNavigation";
import SavedResumesList from "@/components/CVBuilder/SavedResumesList";
import AboutSection from "@/components/CVBuilder/AboutSection";
import { generateResumeId, exportResumeAsJson } from "@/services/resumeStorage";
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
            <ResumeHeader
              resumeName={resumeName}
              currentResumeId={currentResumeId}
              lastSaved={lastSaved}
              onSave={handleSaveResume}
              onExport={handleExportJson}
            />
            
            <TabNavigation
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
            
            <ResumePreview resume={currentResume} />
          </div>
          
          <div className="md:w-4/12">
            <SavedResumesList
              savedResumes={savedResumes}
              onCreateNew={handleCreateNew}
              onLoadResume={handleLoadResume}
              onDeleteResume={handleDeleteResume}
            />
            
            <AboutSection />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CVBuilder;
