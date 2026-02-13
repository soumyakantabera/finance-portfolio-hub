// Content types for the dynamic portfolio system

export interface Skill {
  name: string;
  category: string;
  icon: string;
  citationCount?: number; // Calculated based on usage in projects, experiences, etc.
  rank?: number; // Calculated rank based on citations
}

export interface Project {
  id: string;
  title: string;
  description: string;
  displayMode: 'journal-like' | 'iframe' | 'embedding-only';
  content?: string; // For journal-like display
  iframeUrl?: string; // For iframe display
  embeddingType?: 'image' | 'video' | 'code'; // For embedding-only display
  embeddingSrc?: string; // For embedding-only display
  skillsUsed: string[]; // Array of skill names
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string;
  skillsUsed: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
  description: string;
  skillsUsed: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
  description: string;
  skillsUsed: string[];
}

export interface AboutContent {
  title: string;
  content: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
}

export interface PortfolioContent {
  about: AboutContent;
  contact: ContactInfo;
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
  education: Education[];
  certifications: Certification[];
}

export interface SkillWithRanking extends Skill {
  citationCount: number;
  rank: number;
}

export interface SkillsByCategory {
  [category: string]: SkillWithRanking[];
}

// Helper function to calculate skill citations and rankings
export function calculateSkillRankings(content: PortfolioContent): SkillsByCategory {
  const skillCitations = new Map<string, number>();
  
  // Initialize all skills with 0 citations
  content.skills.forEach(skill => {
    skillCitations.set(skill.name, 0);
  });
  
  // Count citations from projects
  content.projects.forEach(project => {
    project.skillsUsed.forEach(skillName => {
      const count = skillCitations.get(skillName) || 0;
      skillCitations.set(skillName, count + 1);
    });
  });
  
  // Count citations from experiences
  content.experiences.forEach(exp => {
    exp.skillsUsed.forEach(skillName => {
      const count = skillCitations.get(skillName) || 0;
      skillCitations.set(skillName, count + 1);
    });
  });
  
  // Count citations from education
  content.education.forEach(edu => {
    edu.skillsUsed.forEach(skillName => {
      const count = skillCitations.get(skillName) || 0;
      skillCitations.set(skillName, count + 1);
    });
  });
  
  // Count citations from certifications
  content.certifications.forEach(cert => {
    cert.skillsUsed.forEach(skillName => {
      const count = skillCitations.get(skillName) || 0;
      skillCitations.set(skillName, count + 1);
    });
  });
  
  // Filter out skills with 0 citations and add ranking
  const usedSkills = content.skills
    .map(skill => ({
      ...skill,
      citationCount: skillCitations.get(skill.name) || 0,
      rank: 0, // Will be set below
    }))
    .filter(skill => skill.citationCount > 0)
    .sort((a, b) => b.citationCount - a.citationCount);
  
  // Assign ranks (1 = highest citations)
  usedSkills.forEach((skill, index) => {
    skill.rank = index + 1;
  });
  
  // Group by category
  const skillsByCategory: SkillsByCategory = {};
  usedSkills.forEach(skill => {
    if (!skillsByCategory[skill.category]) {
      skillsByCategory[skill.category] = [];
    }
    skillsByCategory[skill.category].push(skill);
  });
  
  // Sort skills within each category by rank
  Object.keys(skillsByCategory).forEach(category => {
    skillsByCategory[category].sort((a, b) => a.rank - b.rank);
  });
  
  return skillsByCategory;
}
