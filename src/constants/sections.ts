export interface PageSection {
  id: string;
  label: string;
}

export const PAGE_SECTIONS: PageSection[] = [
  { id: 'summary', label: 'About Me' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'portfolio', label: 'Projects' },
];
