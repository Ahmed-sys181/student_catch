// ===== User =====
export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  university: string;
  major: string;
  yearOfStudy: number;
  skills: string[];
  xpPoints: number;
  rank: number;
  completedProjects: number;
  completedMissions: number;
  profileCompleteness: number;
  joinedDate: string;
  badges: Badge[];
}

// ===== Project =====
export type ProjectStatus = 'available' | 'inProgress' | 'completed' | 'verified';
export type ProjectDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: ProjectDifficulty;
  xpReward: number;
  skills: string[];
  estimatedHours: number;
  status: ProjectStatus;
  companyLogo?: string;
  companyName?: string;
  deadline: string;
  participantsCount: number;
  rating?: number;
  requirements: string[];
}

// ===== Mission =====
export type MissionStatus = 'open' | 'applied' | 'inProgress' | 'completed' | 'rejected';
export type MissionType = 'shortTerm' | 'project' | 'internship';

export interface Mission {
  id: string;
  title: string;
  description: string;
  companyName: string;
  companyLogo: string;
  location: string;
  isRemote: boolean;
  type: MissionType;
  status: MissionStatus;
  compensation: number;
  compensationType: string;
  durationDays: number;
  requiredSkills: string[];
  deadline: string;
  postedDate: string;
  applicantsCount: number;
  industry: string;
}

// ===== Job =====
export type JobType = 'fullTime' | 'partTime' | 'freelance' | 'contract' | 'internship';
export type ExperienceLevel = 'entry' | 'junior' | 'mid' | 'senior';

export interface Job {
  id: string;
  title: string;
  description: string;
  companyName: string;
  companyLogo: string;
  location: string;
  isRemote: boolean;
  type: JobType;
  experienceLevel: ExperienceLevel;
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency?: string;
  requiredSkills: string[];
  responsibilities: string[];
  benefits: string[];
  postedDate: string;
  deadline: string;
  applicantsCount: number;
  industry: string;
  isSaved: boolean;
}

// ===== Skill =====
export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  isVerified: boolean;
  projectsCompleted: number;
  xpEarned: number;
}

// ===== Portfolio =====
export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  type: 'project' | 'mission' | 'challenge';
  skills: string[];
  images: string[];
  githubUrl?: string;
  liveUrl?: string;
  completedDate: string;
  isVerified: boolean;
  rating?: number;
  companyName?: string;
  likesCount: number;
  viewsCount: number;
}

// ===== Helpers =====
export function getDifficultyLabel(d: ProjectDifficulty): string {
  return d === 'beginner' ? 'Beginner' : d === 'intermediate' ? 'Intermediate' : 'Advanced';
}

export function getMissionTypeLabel(t: MissionType): string {
  return t === 'shortTerm' ? 'Short-term' : t === 'project' ? 'Project' : 'Internship';
}

export function getJobTypeLabel(t: JobType): string {
  const map: Record<JobType, string> = { fullTime: 'Full-time', partTime: 'Part-time', freelance: 'Freelance', contract: 'Contract', internship: 'Internship' };
  return map[t];
}

export function getExperienceLevelLabel(l: ExperienceLevel): string {
  const map: Record<ExperienceLevel, string> = { entry: 'Entry Level', junior: 'Junior', mid: 'Mid-Level', senior: 'Senior' };
  return map[l];
}

export function getSkillLevelLabel(level: number): string {
  const map: Record<number, string> = { 1: 'Beginner', 2: 'Elementary', 3: 'Intermediate', 4: 'Advanced', 5: 'Expert' };
  return map[level] || 'Unknown';
}

export function getSalaryRange(job: Job): string {
  if (!job.salaryMin && !job.salaryMax) return 'Not specified';
  const c = job.salaryCurrency || 'TND';
  if (job.salaryMin && job.salaryMax) return `${c} ${job.salaryMin} - ${job.salaryMax}`;
  if (job.salaryMin) return `From ${c} ${job.salaryMin}`;
  return `Up to ${c} ${job.salaryMax}`;
}

export function getPortfolioTypeIcon(type: string): string {
  return type === 'project' ? '📁' : type === 'mission' ? '🎯' : type === 'challenge' ? '🏆' : '📄';
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

export function daysUntil(dateStr: string): number {
  return Math.max(0, Math.ceil((new Date(dateStr).getTime() - Date.now()) / 86400000));
}

export function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days > 0) return `${days}d ago`;
  const hours = Math.floor(diff / 3600000);
  if (hours > 0) return `${hours}h ago`;
  return 'Just now';
}
