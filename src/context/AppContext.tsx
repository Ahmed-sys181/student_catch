'use client';
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { User, Project, Mission, Job, Skill, PortfolioItem } from '../types';
import { demoUser, demoProjects, demoMissions, demoJobs, demoSkills, demoPortfolioItems } from '../data/demo';

interface AppState {
  currentUser: User | null;
  isAuthenticated: boolean;
  projects: Project[];
  missions: Mission[];
  jobs: Job[];
  skills: Skill[];
  portfolioItems: PortfolioItem[];
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: { name: string; email: string; password: string; university: string; major: string; yearOfStudy: number }) => Promise<boolean>;
  logout: () => void;
  applyToProject: (id: string) => void;
  applyToMission: (id: string) => void;
  applyToJob: (id: string) => void;
  toggleSaveJob: (id: string) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [missions, setMissions] = useState<Mission[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);

  const loadDemoData = useCallback(() => {
    setProjects(demoProjects);
    setMissions(demoMissions);
    setJobs(demoJobs);
    setSkills(demoSkills);
    setPortfolioItems(demoPortfolioItems);
  }, []);

  const login = useCallback(async (_email: string, _password: string): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 800));
    setCurrentUser(demoUser);
    setIsAuthenticated(true);
    loadDemoData();
    return true;
  }, [loadDemoData]);

  const register = useCallback(async (data: { name: string; email: string; password: string; university: string; major: string; yearOfStudy: number }): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 800));
    setCurrentUser({
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      university: data.university,
      major: data.major,
      yearOfStudy: data.yearOfStudy,
      skills: [],
      xpPoints: 0,
      rank: 999,
      completedProjects: 0,
      completedMissions: 0,
      profileCompleteness: 0.3,
      joinedDate: new Date().toISOString(),
      badges: [],
    });
    setIsAuthenticated(true);
    loadDemoData();
    return true;
  }, [loadDemoData]);

  const logout = useCallback(() => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setProjects([]);
    setMissions([]);
    setJobs([]);
    setSkills([]);
    setPortfolioItems([]);
  }, []);

  const applyToProject = useCallback((_id: string) => {}, []);
  const applyToMission = useCallback((_id: string) => {}, []);
  const applyToJob = useCallback((_id: string) => {}, []);
  const toggleSaveJob = useCallback((id: string) => {
    setJobs(prev => prev.map(j => j.id === id ? { ...j, isSaved: !j.isSaved } : j));
  }, []);

  return (
    <AppContext.Provider value={{
      currentUser, isAuthenticated, projects, missions, jobs, skills, portfolioItems,
      login, register, logout, applyToProject, applyToMission, applyToJob, toggleSaveJob,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
