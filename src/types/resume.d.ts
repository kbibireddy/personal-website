interface Education {
  degree: string;
  school: string;
  period: string;
  gpa: string;
}

interface WorkExperience {
  title: string;
  company: string;
  period: string;
  description: string[];
}

interface Contact {
  github: string;
  linkedin: string;
  email: string;
}

interface Skill {
  name: string;
  proficiency: number;
}

interface ResumeData {
  name: string;
  headline: string;
  professionalSummary: string;
  contact: Contact;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
}

declare module '@/data/resume.json' {
  const content: ResumeData;
  export default content;
} 