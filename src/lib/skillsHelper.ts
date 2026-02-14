import masterSkillsData from '@/data/masterSkills.json';

export interface MasterSkill {
  name: string;
  category: string;
  icon: string;
}

export const getMasterSkills = (): MasterSkill[] => {
  return masterSkillsData.skills;
};

export const getSkillIcon = (skillName: string): string | null => {
  const skill = masterSkillsData.skills.find(
    (s) => s.name.toLowerCase() === skillName.toLowerCase()
  );
  return skill?.icon || null;
};

export const getSkillsByNames = (skillNames: string[]): MasterSkill[] => {
  return skillNames
    .map((name) => {
      const skill = masterSkillsData.skills.find(
        (s) => s.name.toLowerCase() === name.toLowerCase()
      );
      return skill || { name, category: 'Other', icon: '' };
    })
    .filter((s) => s !== null) as MasterSkill[];
};
