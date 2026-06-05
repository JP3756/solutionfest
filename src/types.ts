export interface Announcement {
  id: string;
  source: string;
  timeAgo: string;
  text: string;
  type: 'update' | 'advisory';
}

export interface Credential {
  id: string;
  title: string;
  issued: string;
  verified: boolean;
}

export interface Job {
  id: string;
  title: string;
  location: string;
  salary: string;
  description: string;
  tags: string[];
  matchesProfile?: boolean;
  closesSoon?: boolean;
  category: 'Tech' | 'Logistics' | 'Hospitality' | 'Retail';
}

export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string;
}

export interface EducationEntry {
  id: string;
  school: string;
  degree: string;
  gradYear: string;
}

export interface ResumeData {
  phone: string;
  email: string;
  location: string;
  summary: string;
  experiences: WorkExperience[];
  educationList: EducationEntry[];
  template: 'civic' | 'modern' | 'minimalist';
}
