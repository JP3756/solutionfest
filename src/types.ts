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
