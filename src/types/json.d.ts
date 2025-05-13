import { Resume } from './resume';

declare module '*.json' {
  const content: Resume;
  export default content;
} 