export type ScreenId = 'home' | 'work' | 'project' | 'about' | 'studio' | 'contact';

export interface Project {
  id: string;
  title: string;
  client: string;
  tagline: string;
  description: string;
  category: 'AI & SaaS' | 'Fintech' | 'Culture & DTC';
  image: string;
  images?: string[];
  tags: string[];
  year: string;
  scope: string[];
  metrics?: string;
  quote?: {
    text: string;
    author: string;
    role: string;
  };
  details: {
    overview: string;
    challenge: string;
    solution: string;
    deliverables: string[];
    accentColor: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
  rating: number;
}

export interface PartnerLogo {
  name: string;
  src: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  summary: string;
  deliverables: string[];
  duration: string;
}

export interface JournalArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  image: string;
  excerpt: string;
}
