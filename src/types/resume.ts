export interface Contact {
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
}

export interface WorkExperience {
  title: string;
  company: string;
  period: string;
  description: string[];
}

export interface Education {
  degree: string;
  school: string;
  period: string;
  gpa: string;
}

export interface Skill {
  name: string;
  proficiency: number;
  category: string;
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
  professionalSummary: string;
  contact: Contact;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
} 