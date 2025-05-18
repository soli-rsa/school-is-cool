
import { Resume, emptyResume } from "@/types/resume";

const STORAGE_KEY = "resumes";

// Get all stored resumes
export const getStoredResumes = (): Record<string, Resume> => {
  const storedData = localStorage.getItem(STORAGE_KEY);
  if (!storedData) return {};
  
  try {
    return JSON.parse(storedData);
  } catch (error) {
    console.error("Error parsing stored resumes:", error);
    return {};
  }
};

// Get a specific resume by ID
export const getResume = (id: string): Resume => {
  const resumes = getStoredResumes();
  return resumes[id] || { ...emptyResume };
};

// Save a resume with a specific ID
export const saveResume = (id: string, resume: Resume): void => {
  const resumes = getStoredResumes();
  
  resumes[id] = resume;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resumes));
  } catch (error) {
    console.error("Error saving resume:", error);
  }
};

// Delete a resume by ID
export const deleteResume = (id: string): void => {
  const resumes = getStoredResumes();
  
  if (resumes[id]) {
    delete resumes[id];
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resumes));
    } catch (error) {
      console.error("Error deleting resume:", error);
    }
  }
};

// Generate a new unique ID for a resume
export const generateResumeId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
};

// Export resume as JSON file
export const exportResumeAsJson = (resume: Resume, fileName: string): void => {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(resume, null, 2));
  const downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", fileName + ".json");
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};
