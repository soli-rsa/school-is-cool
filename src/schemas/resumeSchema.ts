
import { z } from "zod";

export const locationSchema = z.object({
  address: z.string().optional(),
  postalCode: z.string().optional(),
  city: z.string().optional(),
  countryCode: z.string().optional(),
  region: z.string().optional(),
});

export const profileSchema = z.object({
  network: z.string().min(1, "Network is required"),
  username: z.string().min(1, "Username is required"),
  url: z.string().url("Invalid URL").optional(),
});

export const basicsSchema = z.object({
  name: z.string().min(1, "Name is required"),
  label: z.string().optional(),
  image: z.string().optional(),
  email: z.string().email("Invalid email").optional(),
  phone: z.string().optional(),
  url: z.string().url("Invalid URL").optional(),
  summary: z.string().optional(),
  location: locationSchema.optional(),
  profiles: z.array(profileSchema).optional(),
});

export const workExperienceSchema = z.object({
  company: z.string().min(1, "Company is required"),
  position: z.string().min(1, "Position is required"),
  website: z.string().url("Invalid URL").optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  summary: z.string().optional(),
  highlights: z.array(z.string()).optional(),
});

export const educationSchema = z.object({
  institution: z.string().min(1, "Institution is required"),
  area: z.string().min(1, "Area of study is required"),
  studyType: z.string().min(1, "Study type is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  gpa: z.string().optional(),
  courses: z.array(z.string()).optional(),
});

export const skillSchema = z.object({
  name: z.string().min(1, "Skill name is required"),
  level: z.string().optional(),
  keywords: z.array(z.string()).optional(),
});

export const languageSchema = z.object({
  language: z.string().min(1, "Language is required"),
  fluency: z.string().min(1, "Fluency level is required"),
});

export const projectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().optional(),
  highlights: z.array(z.string()).optional(),
  keywords: z.array(z.string()).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  url: z.string().url("Invalid URL").optional(),
  roles: z.array(z.string()).optional(),
  entity: z.string().optional(),
  type: z.string().optional(),
});

export const resumeSchema = z.object({
  basics: basicsSchema,
  work: z.array(workExperienceSchema).optional(),
  education: z.array(educationSchema).optional(),
  skills: z.array(skillSchema).optional(),
  languages: z.array(languageSchema).optional(),
  projects: z.array(projectSchema).optional(),
});

export type ResumeFormData = z.infer<typeof resumeSchema>;
