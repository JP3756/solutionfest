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

export interface User {
  name: string;
  skills: string[];
  role?: 'seeker' | 'employer';
  companyName?: string;
  industry?: 'Tech' | 'Logistics' | 'Hospitality' | 'Retail' | string;
  email?: string;
  contactNo?: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  candidateName: string;
  candidateEmail: string;
  candidateSkills: string[];
  appliedAt: string;
  status: 'Pending' | 'Shortlisted' | 'Contacted' | 'Rejected';
}

