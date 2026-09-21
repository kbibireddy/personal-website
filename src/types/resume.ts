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
  /** One site-facing paragraph for recruiters; expanded details use `description`. */
  summary?: string;
  /** Compact skill chips under the role summary (names from `Resume.skills`). */
  skills?: string[];
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
  /** Site About / intro copy. Use {{careerTenure}} for years: "9+ years" or "9.5 years". */
  introduction: string[];
  /** Concise summary for PDF/DOCX resume export only. */
  professionalSummary: string;
  website: string;
  contact: Contact;
  education: Education[];
  workExperience: WorkExperience[];
  skills: Skill[];
  projects: Project[];
} 