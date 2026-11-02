export interface HealthResponse {
  status: string;
  message: string;
  version: string;
  timestamp: string;
  uptime_seconds: number;
}

export interface ValueItem {
  id: string;
  icon: string;
  title: string;
  title_th: string;
  description: string;
  description_th: string;
}

export interface Profile {
  name: string;
  name_th: string;
  title: string;
  title_th: string;
  hero_bio: string;
  hero_bio_th: string;
  full_story: string;
  full_story_th: string;
  vision: string;
  vision_th: string;
  mission: string;
  mission_th: string;
  founded_year: number;
  location: string;
  location_th: string;
  avatar_url: string;
  email: string;
  github_url: string;
  linkedin_url: string;
  facebook_url: string;
  core_values: ValueItem[];
}

export interface StatItem {
  id: string;
  label: string;
  label_th: string;
  value: string;
  number: number;
  suffix: string;
  icon: string;
  highlight: string;
  highlight_th: string;
}

export interface SkillItem {
  id: string;
  name: string;
  category: string; // "Backend", "Frontend", "DevOps", "Database", "SoftSkills"
  category_th: string;
  proficiency: number; // 0 - 100%
  icon: string;
  description: string;
  description_th: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  title_th: string;
  category: string; // "Fullstack", "Backend", "Frontend", "AI", "Mobile"
  category_th: string;
  description: string;
  description_th: string;
  image_url: string;
  tags: string[];
  github_url: string;
  demo_url: string;
  date: string;
  featured: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  title_th: string;
  description: string;
  description_th: string;
  icon: string;
  highlights: string[];
  highlights_th: string[];
  category: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  title_th: string;
  description: string;
  description_th: string;
  tag: string;
  tag_th: string;
  icon: string;
}

export interface TestimonialItem {
  id: string;
  client: string;
  company: string;
  avatar: string;
  quote: string;
  quote_th: string;
  rating: number;
  project: string;
  project_th: string;
}

export interface FAQItem {
  id: string;
  question: string;
  question_th: string;
  answer: string;
  answer_th: string;
  category: string;
  category_th: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  status: string;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    created_at: string;
  };
}

export interface UserAccount {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'member';
  created_at: string;
  last_login?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: UserAccount;
  token?: string;
}
