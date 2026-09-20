export interface Contact {
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
}

export interface Education {
  school: string;
  degree: string;
  gpa: string;
  period: string;
}

export interface WorkExperience {
  company: string;
  title: string;
  period: string;
  description: string[];
}

export interface Skill {
  name: string;
  proficiency: number;
  category?: string;
}

export interface Project {
  title: string;
  status: 'Active' | 'WIP' | 'Discontinued';
  description: string[];
  technologies: string[];
  link: string;
}

export interface Resume {
  name: string;
  headline: string;
  /** Site About / intro copy. Use {{careerTenure}} for a live years/months/days/h/m/s timer. */  introduction: string[];
  /** Concise summary for PDF/DOCX resume export only. */
  professionalSummary: string;
  website: string;
  contact: Contact;
  education: Education[];
  workExperience: WorkExperience[];
  skills: Skill[];
  projects: Project[];
} 