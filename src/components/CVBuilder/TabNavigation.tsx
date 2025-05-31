
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import BasicInfoForm from "@/components/ResumeForm/BasicInfoForm";
import WorkExperienceForm from "@/components/ResumeForm/WorkExperienceForm";
import EducationForm from "@/components/ResumeForm/EducationForm";
import SkillsForm from "@/components/ResumeForm/SkillsForm";
import LanguagesForm from "@/components/ResumeForm/LanguagesForm";

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange
}) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full mb-10">
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
          <Button onClick={() => onTabChange("work")}>Next: Work Experience</Button>
        </div>
      </TabsContent>
      
      <TabsContent value="work">
        <WorkExperienceForm />
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => onTabChange("basics")}>Previous: Basics</Button>
          <Button onClick={() => onTabChange("education")}>Next: Education</Button>
        </div>
      </TabsContent>
      
      <TabsContent value="education">
        <EducationForm />
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => onTabChange("work")}>Previous: Work</Button>
          <Button onClick={() => onTabChange("skills")}>Next: Skills</Button>
        </div>
      </TabsContent>
      
      <TabsContent value="skills">
        <SkillsForm />
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => onTabChange("education")}>Previous: Education</Button>
          <Button onClick={() => onTabChange("languages")}>Next: Languages</Button>
        </div>
      </TabsContent>
      
      <TabsContent value="languages">
        <LanguagesForm />
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => onTabChange("skills")}>Previous: Skills</Button>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default TabNavigation;
