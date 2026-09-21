export interface PageSection {
  id: string;
  label: string;
}

export const PAGE_SECTIONS: PageSection[] = [
  { id: 'summary', label: 'Introduction' },
  { id: 'experience', label: 'Work Experience' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'portfolio', label: 'Portfolio' },
];
