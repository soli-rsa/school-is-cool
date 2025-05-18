
// Based on JSON Resume schema: https://jsonresume.org/schema/

export interface Resume {
  basics: {
    name: string;
    label?: string;
    image?: string;
    email?: string;
    phone?: string;
    url?: string;
    summary?: string;
    location?: {
      address?: string;
      postalCode?: string;
      city?: string;
      countryCode?: string;
      region?: string;
    };
    profiles?: Array<{
      network: string;
      username: string;
      url?: string;
    }>;
  };
  work?: Array<{
    company: string;
    position: string;
    website?: string;
    startDate: string;
    endDate?: string;
    summary?: string;
    highlights?: string[];
  }>;
  education?: Array<{
    institution: string;
    area: string;
    studyType: string;
    startDate: string;
    endDate?: string;
    gpa?: string;
    courses?: string[];
  }>;
  skills?: Array<{
    name: string;
    level?: string;
    keywords?: string[];
  }>;
  languages?: Array<{
    language: string;
    fluency: string;
  }>;
  projects?: Array<{
    name: string;
    description?: string;
    highlights?: string[];
    keywords?: string[];
    startDate?: string;
    endDate?: string;
    url?: string;
    roles?: string[];
    entity?: string;
    type?: string;
  }>;
}

export const emptyResume: Resume = {
  basics: {
    name: "",
    label: "",
    email: "",
    phone: "",
    summary: "",
    location: {
      address: "",
      postalCode: "",
      city: "",
      region: "",
      countryCode: "",
    },
    profiles: []
  },
  work: [],
  education: [],
  skills: [],
  languages: [],
  projects: []
};
