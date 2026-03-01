import { User, Project, Mission, Job, Skill, PortfolioItem } from '../types';

function addDays(days: number): string {
  return new Date(Date.now() + days * 86400000).toISOString();
}
function subDays(days: number): string {
  return new Date(Date.now() - days * 86400000).toISOString();
}

export const demoUser: User = {
  id: '1',
  name: 'Ahmed Ben Salem',
  email: 'ahmed.bensalem@university.tn',
  university: 'INSAT',
  major: 'Software Engineering',
  yearOfStudy: 3,
  skills: ['Flutter', 'Python', 'Machine Learning', 'UI/UX Design', 'Firebase'],
  xpPoints: 2450,
  rank: 42,
  completedProjects: 8,
  completedMissions: 3,
  profileCompleteness: 0.85,
  joinedDate: '2025-09-01',
  badges: [
    { id: '1', name: 'Quick Starter', icon: '🚀', description: 'Completed first project within a week' },
    { id: '2', name: 'Team Player', icon: '🤝', description: 'Collaborated on 5 team projects' },
    { id: '3', name: 'Code Master', icon: '💻', description: 'Achieved 100% on a coding challenge' },
  ],
};

export const demoProjects: Project[] = [
  {
    id: '1', title: 'Build a Weather App UI',
    description: 'Design and implement a beautiful weather application UI using Flutter. Focus on clean design, smooth animations, and responsive layouts.',
    category: 'Mobile Development', difficulty: 'beginner', xpReward: 150,
    skills: ['Flutter', 'Dart', 'UI Design'], estimatedHours: 8,
    status: 'available', deadline: addDays(7), participantsCount: 45,
    requirements: ['Implement at least 3 screens', 'Use custom animations', 'Support dark/light mode'],
  },
  {
    id: '2', title: 'REST API with Node.js',
    description: 'Create a RESTful API for a task management system. Implement CRUD operations, authentication, and proper error handling.',
    category: 'Backend Development', difficulty: 'intermediate', xpReward: 250,
    skills: ['Node.js', 'Express', 'MongoDB', 'REST API'], estimatedHours: 15,
    status: 'available', deadline: addDays(14), participantsCount: 32,
    requirements: ['JWT Authentication', 'Input validation', 'API documentation', 'Unit tests'],
  },
  {
    id: '3', title: 'ML Image Classifier',
    description: 'Build a machine learning model that can classify images into different categories. Train, evaluate, and deploy the model.',
    category: 'Machine Learning', difficulty: 'advanced', xpReward: 400,
    skills: ['Python', 'TensorFlow', 'Machine Learning', 'Computer Vision'], estimatedHours: 20,
    status: 'available', deadline: addDays(21), participantsCount: 18,
    requirements: ['Accuracy > 85%', 'Data preprocessing pipeline', 'Model evaluation report', 'Deployment ready'],
  },
  {
    id: '4', title: 'E-commerce Dashboard',
    description: 'Create an admin dashboard for an e-commerce platform with analytics, order management, and inventory tracking.',
    category: 'Web Development', difficulty: 'intermediate', xpReward: 300,
    skills: ['React', 'TypeScript', 'Charts', 'CSS'], estimatedHours: 18,
    status: 'inProgress', deadline: addDays(10), participantsCount: 28,
    requirements: ['Responsive design', 'Interactive charts', 'Real-time updates', 'Export functionality'],
  },
];

export const demoMissions: Mission[] = [
  {
    id: '1', title: 'Mobile App Bug Fixing',
    description: 'We need a skilled Flutter developer to identify and fix performance issues in our existing mobile application. The app has some UI lag and memory leaks that need to be addressed.',
    companyName: 'TechStart Tunisia', companyLogo: '🏢', location: 'Tunis', isRemote: true,
    type: 'shortTerm', status: 'open', compensation: 500, compensationType: 'fixed',
    durationDays: 7, requiredSkills: ['Flutter', 'Dart', 'Debugging', 'Performance Optimization'],
    deadline: addDays(5), postedDate: subDays(2), applicantsCount: 12, industry: 'Technology',
  },
  {
    id: '2', title: 'Data Analysis Dashboard',
    description: 'Create a data visualization dashboard to analyze sales data and generate insights. The dashboard should be interactive and export-ready.',
    companyName: 'DataViz Solutions', companyLogo: '📊', location: 'Sfax', isRemote: true,
    type: 'project', status: 'open', compensation: 800, compensationType: 'fixed',
    durationDays: 14, requiredSkills: ['Python', 'Pandas', 'Data Visualization', 'SQL'],
    deadline: addDays(10), postedDate: subDays(1), applicantsCount: 8, industry: 'Analytics',
  },
  {
    id: '3', title: 'Social Media Marketing Intern',
    description: 'Join our marketing team to help manage social media accounts, create content, and analyze engagement metrics. Great opportunity to learn digital marketing.',
    companyName: 'GrowthHub', companyLogo: '📱', location: 'Sousse', isRemote: false,
    type: 'internship', status: 'open', compensation: 400, compensationType: 'monthly',
    durationDays: 90, requiredSkills: ['Social Media', 'Content Creation', 'Analytics', 'Communication'],
    deadline: addDays(15), postedDate: subDays(3), applicantsCount: 25, industry: 'Marketing',
  },
  {
    id: '4', title: 'API Integration Specialist',
    description: 'Integrate multiple third-party APIs into our existing platform. Must have experience with RESTful APIs and OAuth authentication.',
    companyName: 'FinTech Pro', companyLogo: '💰', location: 'Tunis', isRemote: true,
    type: 'shortTerm', status: 'open', compensation: 25, compensationType: 'hourly',
    durationDays: 10, requiredSkills: ['REST API', 'OAuth', 'Node.js', 'Documentation'],
    deadline: addDays(7), postedDate: new Date().toISOString(), applicantsCount: 6, industry: 'Finance',
  },
];

export const demoJobs: Job[] = [
  {
    id: '1', title: 'Junior Flutter Developer',
    description: 'We are looking for a passionate Flutter developer to join our growing team. You will work on exciting mobile projects for local and international clients.',
    companyName: 'MobileTech Tunisia', companyLogo: '📱', location: 'Tunis', isRemote: true,
    type: 'fullTime', experienceLevel: 'junior', salaryMin: 1500, salaryMax: 2500, salaryCurrency: 'TND',
    requiredSkills: ['Flutter', 'Dart', 'Firebase', 'Git', 'REST API'],
    responsibilities: ['Develop and maintain mobile applications', 'Collaborate with designers and backend developers', 'Write clean, maintainable code', 'Participate in code reviews'],
    benefits: ['Flexible working hours', 'Remote work options', 'Learning budget', 'Health insurance'],
    postedDate: subDays(3), deadline: addDays(30), applicantsCount: 45, industry: 'Technology', isSaved: false,
  },
  {
    id: '2', title: 'Data Science Intern',
    description: 'Join our data science team for a 6-month internship. Work on real machine learning projects and gain hands-on experience with cutting-edge technologies.',
    companyName: 'AI Solutions', companyLogo: '🤖', location: 'Sousse', isRemote: false,
    type: 'internship', experienceLevel: 'entry', salaryMin: 600, salaryMax: 800, salaryCurrency: 'TND',
    requiredSkills: ['Python', 'Machine Learning', 'SQL', 'Statistics'],
    responsibilities: ['Assist in data analysis projects', 'Build and train ML models', 'Create data visualizations', 'Document research findings'],
    benefits: ['Mentorship program', 'Certificate upon completion', 'Potential full-time offer', 'Lunch provided'],
    postedDate: subDays(5), deadline: addDays(20), applicantsCount: 78, industry: 'AI & Machine Learning', isSaved: false,
  },
  {
    id: '3', title: 'Full Stack Developer',
    description: 'Looking for a versatile developer who can work on both frontend and backend. Experience with modern frameworks is a plus.',
    companyName: 'WebCraft Digital', companyLogo: '🌐', location: 'Sfax', isRemote: true,
    type: 'fullTime', experienceLevel: 'mid', salaryMin: 2500, salaryMax: 4000, salaryCurrency: 'TND',
    requiredSkills: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'TypeScript'],
    responsibilities: ['Design and implement full stack solutions', 'Lead technical discussions', 'Mentor junior developers', 'Ensure code quality and performance'],
    benefits: ['Competitive salary', 'Stock options', 'Remote-first culture', 'Annual team retreats'],
    postedDate: subDays(1), deadline: addDays(45), applicantsCount: 23, industry: 'Technology', isSaved: false,
  },
  {
    id: '4', title: 'UI/UX Design Freelancer',
    description: 'We need a creative designer for multiple ongoing projects. Must have strong portfolio and experience with mobile app design.',
    companyName: 'CreativeStudio', companyLogo: '🎨', location: 'Remote', isRemote: true,
    type: 'freelance', experienceLevel: 'junior', salaryMin: 20, salaryMax: 40, salaryCurrency: 'USD/hr',
    requiredSkills: ['Figma', 'UI Design', 'UX Research', 'Prototyping', 'Design Systems'],
    responsibilities: ['Create user-centered designs', 'Develop wireframes and prototypes', 'Conduct user research', 'Collaborate with development teams'],
    benefits: ['Flexible schedule', 'Long-term projects available', 'Creative freedom', 'International exposure'],
    postedDate: subDays(2), deadline: addDays(60), applicantsCount: 34, industry: 'Design', isSaved: false,
  },
];

export const demoSkills: Skill[] = [
  { id: '1', name: 'Flutter', category: 'Mobile Development', level: 4, isVerified: true, projectsCompleted: 5, xpEarned: 850 },
  { id: '2', name: 'Python', category: 'Programming', level: 3, isVerified: true, projectsCompleted: 3, xpEarned: 450 },
  { id: '3', name: 'Machine Learning', category: 'AI/ML', level: 2, isVerified: false, projectsCompleted: 1, xpEarned: 200 },
  { id: '4', name: 'UI/UX Design', category: 'Design', level: 3, isVerified: true, projectsCompleted: 4, xpEarned: 550 },
  { id: '5', name: 'Firebase', category: 'Backend', level: 4, isVerified: true, projectsCompleted: 4, xpEarned: 600 },
];

export const demoPortfolioItems: PortfolioItem[] = [
  {
    id: '1', title: 'Weather App UI',
    description: 'A beautiful weather application with smooth animations, location-based forecasts, and a clean modern design. Implemented dark/light theme support.',
    type: 'project', skills: ['Flutter', 'Dart', 'UI Design', 'Animations'], images: [],
    githubUrl: 'https://github.com/user/weather-app',
    completedDate: subDays(30), isVerified: true, rating: 4.8, likesCount: 45, viewsCount: 230,
  },
  {
    id: '2', title: 'E-commerce API',
    description: 'Built a complete RESTful API for an e-commerce platform including authentication, product management, cart functionality, and order processing.',
    type: 'project', skills: ['Node.js', 'Express', 'MongoDB', 'JWT'], images: [],
    githubUrl: 'https://github.com/user/ecommerce-api',
    completedDate: subDays(45), isVerified: true, rating: 4.5, likesCount: 32, viewsCount: 180,
  },
  {
    id: '3', title: 'Mobile App Bug Fixes',
    description: 'Successfully identified and resolved performance issues in a production Flutter app for TechStart Tunisia. Improved app performance by 40%.',
    type: 'mission', skills: ['Flutter', 'Debugging', 'Performance'], images: [],
    completedDate: subDays(15), isVerified: true, rating: 5.0, companyName: 'TechStart Tunisia', likesCount: 28, viewsCount: 150,
  },
  {
    id: '4', title: 'Algorithm Challenge Winner',
    description: 'Won first place in the monthly coding challenge. Solved complex algorithmic problems with optimal time and space complexity.',
    type: 'challenge', skills: ['Algorithms', 'Data Structures', 'Problem Solving'], images: [],
    completedDate: subDays(60), isVerified: true, likesCount: 67, viewsCount: 420,
  },
];
