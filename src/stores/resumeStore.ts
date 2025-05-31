
import { create } from 'zustand';
import { Resume, emptyResume } from '@/types/resume';
import { saveResume, deleteResume, getStoredResumes } from '@/services/resumeStorage';

interface ResumeState {
  currentResume: Resume;
  currentResumeId: string;
  savedResumes: Record<string, Resume>;
  isAutoSaving: boolean;
  lastSaved: Date | null;
  
  // Actions
  updateResume: (resume: Resume) => void;
  setCurrentResumeId: (id: string) => void;
  loadSavedResumes: () => void;
  saveCurrentResume: (id?: string) => Promise<void>;
  deleteResumeById: (id: string) => void;
  loadResume: (id: string) => void;
  createNewResume: () => void;
  enableAutoSave: () => void;
  disableAutoSave: () => void;
}

export const useResumeStore = create<ResumeState>((set, get) => ({
  currentResume: { ...emptyResume },
  currentResumeId: '',
  savedResumes: {},
  isAutoSaving: false,
  lastSaved: null,

  updateResume: (resume: Resume) => {
    set({ currentResume: resume });
    
    // Auto-save after 2 seconds of inactivity
    const { isAutoSaving, currentResumeId } = get();
    if (isAutoSaving && currentResumeId) {
      setTimeout(() => {
        const currentState = get();
        if (currentState.currentResumeId === currentResumeId) {
          currentState.saveCurrentResume(currentResumeId);
        }
      }, 2000);
    }
  },

  setCurrentResumeId: (id: string) => {
    set({ currentResumeId: id });
  },

  loadSavedResumes: () => {
    const resumes = getStoredResumes();
    set({ savedResumes: resumes });
  },

  saveCurrentResume: async (id?: string) => {
    const { currentResume, currentResumeId } = get();
    const resumeId = id || currentResumeId;
    
    if (resumeId) {
      saveResume(resumeId, currentResume);
      set(state => ({
        savedResumes: { ...state.savedResumes, [resumeId]: currentResume },
        lastSaved: new Date()
      }));
    }
  },

  deleteResumeById: (id: string) => {
    deleteResume(id);
    set(state => {
      const updatedResumes = { ...state.savedResumes };
      delete updatedResumes[id];
      
      let newCurrentResume = state.currentResume;
      let newCurrentId = state.currentResumeId;
      
      if (id === state.currentResumeId) {
        const remainingIds = Object.keys(updatedResumes);
        if (remainingIds.length > 0) {
          const firstId = remainingIds[0];
          newCurrentId = firstId;
          newCurrentResume = updatedResumes[firstId];
        } else {
          newCurrentId = '';
          newCurrentResume = { ...emptyResume };
        }
      }
      
      return {
        savedResumes: updatedResumes,
        currentResume: newCurrentResume,
        currentResumeId: newCurrentId
      };
    });
  },

  loadResume: (id: string) => {
    const { savedResumes } = get();
    if (savedResumes[id]) {
      set({
        currentResume: savedResumes[id],
        currentResumeId: id
      });
    }
  },

  createNewResume: () => {
    set({
      currentResume: { ...emptyResume },
      currentResumeId: '',
      lastSaved: null
    });
  },

  enableAutoSave: () => {
    set({ isAutoSaving: true });
  },

  disableAutoSave: () => {
    set({ isAutoSaving: false });
  },
}));
