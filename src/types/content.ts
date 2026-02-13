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

// Master skills database - load from masterSkills.json
let masterSkillsCache: Skill[] | null = null;

export async function loadMasterSkills(): Promise<Skill[]> {
  if (masterSkillsCache) {
    return masterSkillsCache;
  }
  
  try {
    // In production, the base path is /finance-portfolio-hub/
    const basePath = import.meta.env.PROD ? '/finance-portfolio-hub' : '';
    const response = await fetch(`${basePath}/data/masterSkills.json`);
    const data = await response.json();
    masterSkillsCache = data.skills;
    return masterSkillsCache;
  } catch (error) {
    console.error('Error loading master skills:', error);
    return [];
  }
}

// Find skill in master database by name (case-insensitive)
export function findSkillInMaster(skillName: string, masterSkills: Skill[]): Skill | undefined {
  const normalizedName = skillName.trim().toLowerCase();
  return masterSkills.find(skill => skill.name.toLowerCase() === normalizedName);
}

// Helper function to calculate skill citations and rankings with automatic skill detection
export function calculateSkillRankings(content: PortfolioContent, masterSkills: Skill[] = []): SkillsByCategory {
  const skillCitations = new Map<string, number>();
  const skillDetails = new Map<string, Skill>();
  
  // Initialize all defined skills with 0 citations
  content.skills.forEach(skill => {
    skillCitations.set(skill.name, 0);
    skillDetails.set(skill.name, skill);
  });
  
  // Helper to process and add a skill
  const processSkill = (skillName: string) => {
    const trimmedName = skillName.trim();
    if (!trimmedName) return;
    
    // Update citation count
    const count = skillCitations.get(trimmedName) || 0;
    skillCitations.set(trimmedName, count + 1);
    
    // If skill not already defined, try to find it in master skills
    if (!skillDetails.has(trimmedName) && masterSkills.length > 0) {
      const masterSkill = findSkillInMaster(trimmedName, masterSkills);
      if (masterSkill) {
        skillDetails.set(trimmedName, masterSkill);
      } else {
        // Create a default skill entry for unknown skills
        skillDetails.set(trimmedName, {
          name: trimmedName,
          category: 'Other',
          icon: 'default_icon.svg'
        });
      }
    }
  };
  
  // Count citations from projects
  content.projects.forEach(project => {
    project.skillsUsed.forEach(processSkill);
  });
  
  // Count citations from experiences
  content.experiences.forEach(exp => {
    exp.skillsUsed.forEach(processSkill);
  });
  
  // Count citations from education
  content.education.forEach(edu => {
    edu.skillsUsed.forEach(processSkill);
  });
  
  // Count citations from certifications
  content.certifications.forEach(cert => {
    cert.skillsUsed.forEach(processSkill);
  });
  
  // Build array of skills with citations, filtering out unused skills
  const usedSkills: SkillWithRanking[] = [];
  skillCitations.forEach((count, skillName) => {
    if (count > 0) {
      const skill = skillDetails.get(skillName);
      if (skill) {
        usedSkills.push({
          ...skill,
          citationCount: count,
          rank: 0, // Will be set below
        });
      }
    }
  });
  
  // Sort by citation count and assign ranks
  usedSkills.sort((a, b) => b.citationCount - a.citationCount);
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
